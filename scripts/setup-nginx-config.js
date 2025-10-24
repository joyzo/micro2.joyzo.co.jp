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

// nginx設定ファイルを生成
function generateNginxConfig(remotePath) {
  return `server {
    listen 80;
    server_name _;
    root ${remotePath};
    index index.html index.htm;

    # Content-Typeヘッダーの明示的設定
    location ~* \\.html$ {
        add_header Content-Type "text/html; charset=utf-8" always;
        expires 1h;
        add_header Cache-Control "public";
    }

    # メインのlocation
    location / {
        add_header Content-Type "text/html; charset=utf-8" always;
        try_files $uri $uri/ /index.html;
    }

    # 静的ファイルのキャッシュ設定
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 404エラーページ
    error_page 404 /404.html;
}`;
}

// メイン処理
async function setupNginxConfig() {
  try {
    console.log('⚙️  nginx設定のセットアップを開始します...');
    console.log(`📡 接続先: ${SFTP_USER}@${SFTP_HOST}:${SFTP_PORT}`);
    console.log(`📂 設定先: ${SFTP_REMOTE_PATH}`);
    console.log('');

    // SFTP接続
    console.log('🔌 SFTP接続中...');
    await sftp.connect(connectConfig);
    console.log('✅ SFTP接続成功');

    // nginx設定ファイルを生成
    console.log('⚙️  nginx設定ファイルを生成中...');
    const nginxConfig = generateNginxConfig(SFTP_REMOTE_PATH);
    const nginxConfigPath = `${SFTP_REMOTE_PATH}/nginx-site.conf`;
    console.log(`📄 nginx設定ファイルをアップロード: ${nginxConfigPath}`);
    await sftp.put(Buffer.from(nginxConfig), nginxConfigPath);

    console.log('');
    console.log('✅ nginx設定ファイルのアップロード完了！');
    console.log('');
    console.log('📋 次のステップ:');
    console.log('1. サーバーにSSH接続してください');
    console.log('2. nginx設定を適用してください:');
    console.log(`   sudo cp ${nginxConfigPath} /etc/nginx/sites-available/joyzo-site`);
    console.log('   sudo ln -sf /etc/nginx/sites-available/joyzo-site /etc/nginx/sites-enabled/');
    console.log('   sudo nginx -t');
    console.log('   sudo systemctl reload nginx');
    console.log('');
    console.log('🔧 Content-Typeヘッダーが設定されました。');
    console.log('   HTMLファイルがテキストとしてダウンロードされる問題が解決されるはずです。');
    
  } catch (error) {
    console.error('❌ nginx設定セットアップエラー:', error.message);
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
setupNginxConfig();
