#!/usr/bin/env node

import { config } from 'dotenv';
import SftpClient from 'ssh2-sftp-client';
import { readFileSync } from 'fs';
import { homedir } from 'os';

// .env.localファイルを読み込み
config({ path: '.env.local' });

const sftp = new SftpClient();

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

// メイン処理
async function removeNginxConfig() {
  try {
    console.log('🗑️  nginx設定の削除を開始します...');
    console.log(`📡 接続先: ${SFTP_USER}@${SFTP_HOST}:${SFTP_PORT}`);
    console.log(`📂 作業先: ${SFTP_REMOTE_PATH}`);
    console.log('');

    // SFTP接続
    console.log('🔌 SFTP接続中...');
    await sftp.connect(connectConfig);
    console.log('✅ SFTP接続成功');

    // 削除するファイルのリスト
    const filesToRemove = [
      'nginx-site.conf'
    ];

    // ファイルを削除
    for (const filename of filesToRemove) {
      const filePath = `${SFTP_REMOTE_PATH}/${filename}`;
      try {
        console.log(`🗑️  ファイル削除: ${filename}`);
        await sftp.delete(filePath);
        console.log(`✅ 削除完了: ${filename}`);
      } catch (error) {
        if (error.code === 2) {
          console.log(`⚠️  ファイルが存在しません: ${filename}`);
        } else {
          console.error(`❌ 削除エラー (${filename}):`, error.message);
        }
      }
    }

    console.log('');
    console.log('✅ nginx設定ファイルの削除完了！');
    console.log('');
    console.log('📋 次のステップ:');
    console.log('1. サーバーにSSH接続してください');
    console.log('2. nginx設定を無効化してください:');
    console.log('   sudo rm /etc/nginx/sites-enabled/joyzo-site');
    console.log('   sudo nginx -t');
    console.log('   sudo systemctl reload nginx');
    console.log('');
    console.log('🔧 nginx設定が削除されました。');
    console.log('   Content-Typeヘッダーの設定が無効になります。');
    
  } catch (error) {
    console.error('❌ nginx設定削除エラー:', error.message);
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
removeNginxConfig();
