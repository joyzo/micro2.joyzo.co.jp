#!/usr/bin/env node

import { config } from 'dotenv';
import SftpClient from 'ssh2-sftp-client';
import { readdir, stat } from 'fs/promises';
import { readFileSync } from 'fs';
import { join, relative } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';

// .env.localファイルを読み込み
config({ path: '.env.local' });

const sftp = new SftpClient();

// コマンドライン引数の解析
const args = process.argv.slice(2);
const skipImages = args.includes('--no-image') || args.includes('no-image');

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
  // SSH鍵認証
  const keyPath = SFTP_PRIVATE_KEY_PATH.replace('~', homedir());
  connectConfig.privateKey = readFileSync(keyPath);
} else if (SFTP_PASSWORD) {
  // パスワード認証
  connectConfig.password = SFTP_PASSWORD;
} else {
  console.error('❌ エラー: 認証情報が設定されていません。');
  console.error('SFTP_PASSWORD または SFTP_PRIVATE_KEY_PATH を設定してください。');
  process.exit(1);
}

// ファイルを再帰的にアップロードする関数
async function uploadDirectory(localPath, remotePath) {
  const items = await readdir(localPath);
  
  for (const item of items) {
    const localItemPath = join(localPath, item);
    const remoteItemPath = `${remotePath}/${item}`;
    const stats = await stat(localItemPath);
    
    // 画像スキップオプションが有効な場合、imagesフォルダをスキップ
    if (skipImages && item === 'images' && stats.isDirectory()) {
      console.log(`⏭️  画像フォルダをスキップ: ${item}`);
      continue;
    }
    
    if (stats.isDirectory()) {
      console.log(`📁 ディレクトリ作成: ${remoteItemPath}`);
      try {
        await sftp.mkdir(remoteItemPath, true);
      } catch (error) {
        if (error.code !== 4) { // ディレクトリが既に存在する場合以外のエラー
          throw error;
        }
      }
      await uploadDirectory(localItemPath, remoteItemPath);
    } else {
      console.log(`📄 アップロード: ${item}`);
      await sftp.put(localItemPath, remoteItemPath);
    }
  }
}

// メイン処理
async function deploy() {
  try {
    console.log('🚀 本番環境へのデプロイを開始します...');
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
    if (skipImages) {
      console.log('🖼️  画像スキップモード: imagesフォルダをアップロードしません');
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
    await uploadDirectory(distPath, SFTP_REMOTE_PATH);
    
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
    // SFTP接続を閉じる
    if (sftp.sftp) {
      await sftp.end();
      console.log('🔌 SFTP接続を閉じました');
    }
  }
}

// スクリプト実行
deploy();
