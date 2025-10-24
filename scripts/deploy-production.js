#!/usr/bin/env node

import { config } from 'dotenv';
import SftpClient from 'ssh2-sftp-client';
import { readdir, stat } from 'fs/promises';
import { readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';
import { createHash } from 'crypto';

// .env.localファイルを読み込み
config({ path: '.env.local' });

const sftp = new SftpClient();

// コマンドライン引数の解析
const args = process.argv.slice(2);
const deployMode = args[0] || 'all'; // all, images-only, no-images, specific
const specificFiles = args.slice(1); // 特定ファイル指定時

// 除外設定を読み込む関数
function loadIgnorePatterns() {
  const ignoreFile = '.deployignore';
  if (!existsSync(ignoreFile)) {
    return [];
  }
  
  const content = readFileSync(ignoreFile, 'utf-8');
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

// ファイルが除外対象かチェックする関数
function shouldIgnore(filePath, ignorePatterns) {
  const relativePath = relative('./dist', filePath);
  
  for (const pattern of ignorePatterns) {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      if (regex.test(relativePath)) {
        return true;
      }
    } else {
      if (relativePath === pattern || relativePath.startsWith(pattern + '/')) {
        return true;
      }
    }
  }
  return false;
}

// 画像ファイルかどうかチェック
function isImageFile(filePath) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic', '.bmp', '.tiff'];
  const ext = filePath.toLowerCase().substring(filePath.lastIndexOf('.'));
  return imageExtensions.includes(ext);
}

// ファイルハッシュを計算する関数
function calculateFileHash(filePath) {
  const content = readFileSync(filePath);
  return createHash('md5').update(content).digest('hex');
}

// ハッシュファイルのパスを生成する関数
function getHashFilePath(filePath) {
  return filePath + '.hash';
}

// 環境変数の取得
const {
  SFTP_HOST,
  SFTP_PORT = '22',
  SFTP_USER,
  SFTP_PASSWORD,
  SFTP_PRIVATE_KEY_PATH,
  SFTP_REMOTE_PATH
} = process.env;

// 必須環境変数のチェック
const requiredEnvVars = ['SFTP_HOST', 'SFTP_USER', 'SFTP_REMOTE_PATH'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ エラー: 以下の環境変数が設定されていません:');
  missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
  console.error('\n.env.localファイルを確認してください。');
  process.exit(1);
}

// distフォルダの存在チェック
const distPath = './dist';
if (!existsSync(distPath)) {
  console.error('❌ エラー: distフォルダが見つかりません。');
  console.error('先に "npm run build" を実行してください。');
  process.exit(1);
}

// 接続設定
const connectConfig = {
  host: SFTP_HOST,
  port: parseInt(SFTP_PORT),
  username: SFTP_USER,
  readyTimeout: 20000,
  retries: 3,
  retry_factor: 2,
  retry_minTimeout: 2000
};

// 認証方法の設定
if (SFTP_PRIVATE_KEY_PATH && !SFTP_PASSWORD) {
  const keyPath = SFTP_PRIVATE_KEY_PATH.replace('~', homedir());
  connectConfig.privateKey = readFileSync(keyPath);
} else if (SFTP_PASSWORD) {
  connectConfig.password = SFTP_PASSWORD;
} else {
  console.error('❌ エラー: 認証情報が設定されていません。');
  console.error('SFTP_PASSWORD または SFTP_PRIVATE_KEY_PATH を設定してください。');
  process.exit(1);
}

// ファイルを再帰的にアップロードする関数（差分アップロード対応）
async function uploadDirectory(localPath, remotePath, ignorePatterns) {
  const items = await readdir(localPath);
  
  for (const item of items) {
    const localItemPath = join(localPath, item);
    const remoteItemPath = `${remotePath}/${item}`;
    const stats = await stat(localItemPath);
    
    // 除外チェック
    if (shouldIgnore(localItemPath, ignorePatterns)) {
      console.log(`⏭️  スキップ: ${item} (除外設定)`);
      continue;
    }
    
    // デプロイモード別のフィルタリング
    if (deployMode === 'images-only' && !isImageFile(localItemPath)) {
      console.log(`⏭️  スキップ: ${item} (画像以外)`);
      continue;
    }
    
    if (deployMode === 'no-images' && isImageFile(localItemPath)) {
      console.log(`⏭️  スキップ: ${item} (画像ファイル)`);
      continue;
    }
    
    if (deployMode === 'specific') {
      const relativePath = relative('./dist', localItemPath);
      const isTargetFile = specificFiles.some(target => 
        relativePath.includes(target) || item.includes(target)
      );
      if (!isTargetFile) {
        console.log(`⏭️  スキップ: ${item} (指定ファイル以外)`);
        continue;
      }
    }
    
    if (stats.isDirectory()) {
      console.log(`📁 ディレクトリ作成: ${remoteItemPath}`);
      try {
        await sftp.mkdir(remoteItemPath, true);
      } catch (error) {
        if (error.code !== 4) {
          throw error;
        }
      }
      await uploadDirectory(localItemPath, remoteItemPath, ignorePatterns);
    } else {
      // 差分アップロードチェック
      const shouldUpload = await shouldUploadFile(localItemPath, remoteItemPath);
      
      if (shouldUpload) {
        console.log(`📄 アップロード: ${item}`);
        await sftp.put(localItemPath, remoteItemPath);
        
        // ハッシュファイルをアップロード
        const hashFilePath = getHashFilePath(localItemPath);
        const localHash = calculateFileHash(localItemPath);
        writeFileSync(hashFilePath, localHash);
        await sftp.put(hashFilePath, `${remoteItemPath}.hash`);
        
        // ローカルのハッシュファイルを削除
        await import('fs').then(fs => fs.promises.unlink(hashFilePath));
      } else {
        console.log(`✅ スキップ: ${item} (変更なし)`);
      }
    }
  }
}

// ファイルをアップロードすべきかチェックする関数
async function shouldUploadFile(localPath, remotePath) {
  try {
    const remoteStats = await sftp.stat(remotePath);
    if (!remoteStats) {
      return true;
    }
    
    const remoteHashPath = `${remotePath}.hash`;
    try {
      const remoteHash = await sftp.get(remoteHashPath);
      const localHash = calculateFileHash(localPath);
      
      return remoteHash.toString() !== localHash;
    } catch (error) {
      return true;
    }
  } catch (error) {
    return true;
  }
}

// メイン処理
async function deploy() {
  try {
    console.log('🚀 本番環境へのデプロイを開始します...');
    console.log('');
    
    // デプロイモードの表示
    switch (deployMode) {
      case 'images-only':
        console.log('🖼️  デプロイモード: 画像ファイルのみ');
        break;
      case 'no-images':
        console.log('📄 デプロイモード: 画像ファイル以外');
        break;
      case 'specific':
        console.log(`🎯 デプロイモード: 特定ファイル (${specificFiles.join(', ')})`);
        break;
      default:
        console.log('📦 デプロイモード: 全ファイル');
    }
    
    console.log('');
    console.log('⚠️  ⚠️  ⚠️  重要警告  ⚠️  ⚠️  ⚠️');
    console.log('本番環境へのデプロイは、必ず承諾を得てから実行してください。');
    console.log('デプロイ前に以下を確認してください：');
    console.log('- プロジェクト責任者からの承諾');
    console.log('- デプロイ内容の確認');
    console.log('- 影響範囲の把握');
    console.log('- ロールバック計画の準備');
    console.log('⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️');
    console.log('');
    console.log(`📡 接続先: ${SFTP_USER}@${SFTP_HOST}:${SFTP_PORT}`);
    console.log(`📂 アップロード先: ${SFTP_REMOTE_PATH}`);
    
    // 除外設定を読み込み
    const ignorePatterns = loadIgnorePatterns();
    if (ignorePatterns.length > 0) {
      console.log(`🚫 除外設定: ${ignorePatterns.length}個のパターン`);
      ignorePatterns.forEach(pattern => console.log(`   - ${pattern}`));
    } else {
      console.log('🚫 除外設定: なし');
    }
    console.log('');

    // SFTP接続
    console.log('🔌 SFTP接続中...');
    await sftp.connect(connectConfig);
    console.log('✅ SFTP接続成功');

    // リモートディレクトリの存在確認・作成
    console.log(`📁 リモートディレクトリ確認: ${SFTP_REMOTE_PATH}`);
    try {
      await sftp.mkdir(SFTP_REMOTE_PATH, true);
    } catch (error) {
      if (error.code !== 4) {
        throw error;
      }
    }

    // 既存ファイルのバックアップ（オプション）
    const backupPath = `${SFTP_REMOTE_PATH}_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`;
    console.log(`💾 バックアップ作成: ${backupPath}`);
    try {
      await sftp.rename(SFTP_REMOTE_PATH, backupPath);
      await sftp.mkdir(SFTP_REMOTE_PATH, true);
    } catch (error) {
      console.log('⚠️  バックアップ作成をスキップしました（既存ファイルがない可能性があります）');
    }

    // ファイルアップロード
    console.log('📤 ファイルアップロード開始...');
    await uploadDirectory(distPath, SFTP_REMOTE_PATH, ignorePatterns);
    
    console.log('');
    console.log('✅ デプロイ完了！');
    console.log(`🌐 サイトURL: http://${SFTP_HOST}`);
    
  } catch (error) {
    console.error('❌ デプロイエラー:', error.message);
    if (error.code) {
      console.error(`   エラーコード: ${error.code}`);
    }
    process.exit(1);
  } finally {
    if (sftp.sftp) {
      await sftp.end();
      console.log('🔌 SFTP接続を閉じました');
    }
  }
}

// 使用方法の表示
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
使用方法:
  npm run deploy:production [モード] [オプション]

モード:
  all         全ファイルをアップロード (デフォルト)
  images-only 画像ファイルのみアップロード
  no-images   画像ファイル以外をアップロード
  specific    特定ファイルをアップロード

例:
  npm run deploy:production                    # 全ファイル
  npm run deploy:production images-only        # 画像のみ
  npm run deploy:production no-images          # 画像以外
  npm run deploy:production specific logo.png  # 特定ファイル
  npm run deploy:production specific images/  # 特定ディレクトリ
`);
  process.exit(0);
}

// スクリプト実行
deploy();