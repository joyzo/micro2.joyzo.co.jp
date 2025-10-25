#!/usr/bin/env node

import { config } from 'dotenv';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { execSync } from 'child_process';
import { createHash } from 'crypto';
import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';

// .env.localファイルを読み込み
config({ path: '.env.local' });

// コマンドライン引数の解析
const args = process.argv.slice(2);
const envArg = args.find(arg => arg.startsWith('--env='))?.split('=')[1] || 
               args[args.indexOf('--env') + 1] || 
               'production';

const skipConfirm = args.includes('--yes') || args.includes('-y');
const dryRun = args.includes('--dry-run');

// 環境設定
const environments = {
  production: {
    name: '本番環境 (EC2)',
    host: process.env.EC2_HOST,
    port: process.env.EC2_PORT || '22',
    user: process.env.EC2_USER,
    password: process.env.EC2_PASSWORD,
    privateKeyPath: process.env.EC2_PRIVATE_KEY_PATH,
    deployPath: process.env.EC2_DEPLOY_PATH || '/usr/share/nginx/vhosts/www',
    useReleaseDir: true
  },
  development: {
    name: '開発環境 (Vercel)',
    vercelToken: process.env.VERCEL_TOKEN,
    vercelOrgId: process.env.VERCEL_ORG_ID,
    vercelProjectId: process.env.VERCEL_PROJECT_ID,
    useReleaseDir: false
  }
};

const env = environments[envArg];
if (!env) {
  console.error(`❌ エラー: 無効な環境 "${envArg}"`);
  console.error('利用可能な環境: production, development');
  process.exit(1);
}

// 必須環境変数のチェック
function validateEnvironment(env) {
  const missing = [];
  
  if (envArg === 'production') {
    if (!env.host) missing.push('EC2_HOST');
    if (!env.user) missing.push('EC2_USER');
    if (!env.password && !env.privateKeyPath) missing.push('EC2_PASSWORD または EC2_PRIVATE_KEY_PATH');
  } else if (envArg === 'development') {
    if (!env.vercelToken) missing.push('VERCEL_TOKEN');
    if (!env.vercelOrgId) missing.push('VERCEL_ORG_ID');
    if (!env.vercelProjectId) missing.push('VERCEL_PROJECT_ID');
  }
  
  if (missing.length > 0) {
    console.error('❌ エラー: 以下の環境変数が設定されていません:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\n.env.localファイルを確認してください。');
    process.exit(1);
  }
}

// ファイルハッシュを計算する関数
function calculateFileHash(filePath) {
  const content = readFileSync(filePath);
  return createHash('md5').update(content).digest('hex');
}

// リリースディレクトリ名を生成
function generateReleaseDir() {
  return `releases/${new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '')}`;
}

// デプロイ前の確認
async function confirmDeployment() {
  if (skipConfirm) return true;
  
  console.log('⚠️  ⚠️  ⚠️  重要警告  ⚠️  ⚠️  ⚠️');
  console.log(`${env.name}へのデプロイを実行しようとしています。`);
  console.log('デプロイ前に以下を確認してください：');
  console.log('- プロジェクト責任者からの承諾');
  console.log('- デプロイ内容の確認');
  console.log('- 影響範囲の把握');
  console.log('- ロールバック計画の準備');
  console.log('⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️');
  console.log('');
  
  // 実際の確認プロンプトは実装時に追加
  return true;
}

// EC2へのデプロイ
async function deployToEC2() {
  const releaseDir = generateReleaseDir();
  const fullReleasePath = `${env.deployPath}/${releaseDir}`;
  
  console.log(`🚀 ${env.name}へのデプロイを開始します...`);
  console.log(`📡 接続先: ${env.user}@${env.host}:${env.port}`);
  console.log(`📂 リリース先: ${fullReleasePath}`);
  
  if (dryRun) {
    console.log('🔍 ドライランモード: 実際のデプロイは実行されません');
    return;
  }
  
  try {
    // SSH接続テスト
    console.log('🔌 SSH接続テスト...');
    const sshCmd = `ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no ${env.user}@${env.host} -p ${env.port} "echo 'SSH connection successful'"`;
    execSync(sshCmd, { stdio: 'pipe' });
    console.log('✅ SSH接続成功');
    
    // リリースディレクトリ作成
    console.log(`📁 リリースディレクトリ作成: ${releaseDir}`);
    const mkdirCmd = `ssh -o StrictHostKeyChecking=no ${env.user}@${env.host} -p ${env.port} "mkdir -p ${fullReleasePath}"`;
    execSync(mkdirCmd);
    
    // rsyncでファイル転送
    console.log('📤 ファイル転送中...');
    const rsyncCmd = `rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no -p ${env.port}" dist/ ${env.user}@${env.host}:${fullReleasePath}/`;
    execSync(rsyncCmd);
    
    // シンボリックリンク更新
    console.log('🔗 シンボリックリンク更新中...');
    const symlinkCmd = `ssh -o StrictHostKeyChecking=no ${env.user}@${env.host} -p ${env.port} "cd ${env.deployPath} && ln -sfn ${releaseDir} current"`;
    execSync(symlinkCmd);
    
    // 古いリリースのクリーンアップ
    console.log('🧹 古いリリースのクリーンアップ...');
    const cleanupCmd = `ssh -o StrictHostKeyChecking=no ${env.user}@${env.host} -p ${env.port} "cd ${env.deployPath}/releases && ls -t | tail -n +6 | xargs -r rm -rf"`;
    execSync(cleanupCmd);
    
    console.log('');
    console.log('✅ デプロイ完了！');
    console.log(`📅 リリース: ${releaseDir}`);
    console.log(`🌐 サイトURL: http://${env.host}`);
    
  } catch (error) {
    console.error('❌ デプロイエラー:', error.message);
    process.exit(1);
  }
}

// Vercelへのデプロイ
async function deployToVercel() {
  console.log(`🚀 ${env.name}へのデプロイを開始します...`);
  
  if (dryRun) {
    console.log('🔍 ドライランモード: 実際のデプロイは実行されません');
    return;
  }
  
  try {
    // Vercel CLIでデプロイ
    console.log('📤 Vercelにデプロイ中...');
    const vercelCmd = `vercel --token ${env.vercelToken} --scope ${env.vercelOrgId} --prod=false --yes`;
    process.env.VERCEL_PROJECT_ID = env.vercelProjectId;
    
    execSync(vercelCmd, { stdio: 'inherit' });
    
    console.log('');
    console.log('✅ デプロイ完了！');
    console.log('🌐 VercelダッシュボードでデプロイURLを確認してください');
    
  } catch (error) {
    console.error('❌ デプロイエラー:', error.message);
    process.exit(1);
  }
}

// メイン処理
async function main() {
  console.log('🎯 統合デプロイツール');
  console.log('');
  
  // 環境変数チェック
  validateEnvironment(env);
  
  // distフォルダの存在チェック
  if (!existsSync('./dist')) {
    console.error('❌ エラー: distフォルダが見つかりません。');
    console.error('先に "npm run build" を実行してください。');
    process.exit(1);
  }
  
  // デプロイ確認
  const confirmed = await confirmDeployment();
  if (!confirmed) {
    console.log('❌ デプロイがキャンセルされました');
    process.exit(0);
  }
  
  // 環境に応じてデプロイ実行
  if (envArg === 'production') {
    await deployToEC2();
  } else if (envArg === 'development') {
    await deployToVercel();
  }
}

// 使用方法の表示
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
使用方法:
  npm run deploy -- --env <environment> [options]

環境:
  production    本番環境 (EC2) にデプロイ
  development   開発環境 (Vercel) にデプロイ

オプション:
  --yes, -y     確認プロンプトをスキップ
  --dry-run     実際のデプロイを実行せずにテスト
  --help, -h    このヘルプを表示

例:
  npm run deploy -- --env production
  npm run deploy -- --env development --yes
  npm run deploy -- --env production --dry-run
`);
  process.exit(0);
}

// スクリプト実行
main().catch(error => {
  console.error('❌ 予期しないエラー:', error);
  process.exit(1);
});
