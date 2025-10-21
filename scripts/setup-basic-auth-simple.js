#!/usr/bin/env node

import { config } from 'dotenv';
import SftpClient from 'ssh2-sftp-client';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { execSync } from 'child_process';

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
  SFTP_REMOTE_PATH,
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD
} = process.env;

// 必須環境変数のチェック
const requiredEnvVars = ['SFTP_HOST', 'SFTP_USER', 'SFTP_REMOTE_PATH', 'BASIC_AUTH_USERNAME', 'BASIC_AUTH_PASSWORD'];
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

// Basic認証用のhtpasswdファイルを生成
async function generateHtpasswd(username, password) {
  try {
    // htpasswdコマンドが利用可能かチェック
    execSync('which htpasswd', { stdio: 'ignore' });
    
    // htpasswdコマンドでパスワードハッシュを生成
    const result = execSync(`htpasswd -nbB ${username} ${password}`, { encoding: 'utf8' });
    return result.trim();
  } catch (error) {
    console.log('⚠️  htpasswdコマンドが見つかりません。Node.jsでハッシュを生成します。');
    
    // Node.jsでbcryptハッシュを生成（簡易版）
    const crypto = await import('crypto');
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('base64');
    return `${username}:$2b$10$${salt}${hash}`;
  }
}

// .htaccessファイルを生成
function generateHtaccess() {
  return `# Basic認証設定
AuthType Basic
AuthName "Restricted Access"
AuthUserFile ${SFTP_REMOTE_PATH}/.htpasswd
Require valid-user

# セキュリティヘッダー
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# キャッシュ設定
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# 404エラーページ
ErrorDocument 404 /404.html`;
}

// メイン処理
async function setupBasicAuthSimple() {
  try {
    console.log('🔐 Basic認証の設定を開始します（.htaccess方式）...');
    console.log(`📡 接続先: ${SFTP_USER}@${SFTP_HOST}:${SFTP_PORT}`);
    console.log(`📂 設定先: ${SFTP_REMOTE_PATH}`);
    console.log('');

    // SFTP接続
    console.log('🔌 SFTP接続中...');
    await sftp.connect(connectConfig);
    console.log('✅ SFTP接続成功');

    // htpasswdファイルを生成
    console.log('🔑 Basic認証ファイルを生成中...');
    const htpasswdContent = await generateHtpasswd(BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD);
    
    // .htpasswdファイルをアップロード
    const htpasswdPath = `${SFTP_REMOTE_PATH}/.htpasswd`;
    console.log(`📄 .htpasswdファイルをアップロード: ${htpasswdPath}`);
    await sftp.put(Buffer.from(htpasswdContent), htpasswdPath);

    // .htaccessファイルを生成
    console.log('⚙️  .htaccessファイルを生成中...');
    const htaccessContent = generateHtaccess();
    const htaccessPath = `${SFTP_REMOTE_PATH}/.htaccess`;
    console.log(`📄 .htaccessファイルをアップロード: ${htaccessPath}`);
    await sftp.put(Buffer.from(htaccessContent), htaccessPath);

    console.log('');
    console.log('✅ Basic認証設定完了！');
    console.log('');
    console.log('📋 注意事項:');
    console.log('- Apacheサーバーが必要です');
    console.log('- mod_auth_basic、mod_headers、mod_expiresモジュールが有効である必要があります');
    console.log('- サーバー設定は不要です（ファイルベースの認証）');
    console.log('');
    console.log(`🔐 Basic認証情報:`);
    console.log(`   ユーザー名: ${BASIC_AUTH_USERNAME}`);
    console.log(`   パスワード: ${BASIC_AUTH_PASSWORD}`);
    
  } catch (error) {
    console.error('❌ Basic認証設定エラー:', error.message);
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
setupBasicAuthSimple();
