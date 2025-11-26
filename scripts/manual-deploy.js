#!/usr/bin/env node

import { execSync } from 'child_process';

// コマンドライン引数の解析
const args = process.argv.slice(2);
const isProd = args.includes('--prod');

console.log('🚀 手動デプロイを開始します...');

try {
  // Vercel CLIコマンドの構築
  // npx vercel [args]
  // --prod: 本番デプロイ
  let cmd = 'npx vercel';
  
  if (isProd) {
    cmd += ' --prod';
    console.log('Environment: Production 🔴');
  } else {
    console.log('Environment: Preview 🟢');
  }

  // デプロイ実行
  // stdio: 'inherit' で対話的な入力を可能にする（初回リンク時など）
  execSync(cmd, { stdio: 'inherit' });

  console.log('\n✅ デプロイコマンドの実行が完了しました。');

} catch (error) {
  console.error('\n❌ デプロイに失敗しました。');
  console.error(error.message);
  process.exit(1);
}
