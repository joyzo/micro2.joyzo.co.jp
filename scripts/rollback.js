#!/usr/bin/env node

import { config } from 'dotenv';
import { execSync } from 'child_process';

// .env.localファイルを読み込み
config({ path: '.env.local' });

// コマンドライン引数の解析
const args = process.argv.slice(2);
const envArg = args.find(arg => arg.startsWith('--env='))?.split('=')[1] || 
               args[args.indexOf('--env') + 1] || 
               'production';

const versionArg = args.find(arg => arg.startsWith('--version='))?.split('=')[1] || 
                   args[args.indexOf('--version') + 1];

const listOnly = args.includes('--list') || args.includes('-l');
const skipConfirm = args.includes('--yes') || args.includes('-y');

// 環境設定
const environments = {
  production: {
    name: '本番環境 (EC2)',
    host: process.env.EC2_HOST,
    port: process.env.EC2_PORT || '22',
    user: process.env.EC2_USER,
    password: process.env.EC2_PASSWORD,
    privateKeyPath: process.env.EC2_PRIVATE_KEY_PATH,
    deployPath: process.env.EC2_DEPLOY_PATH || '/usr/share/nginx/vhosts/www'
  }
};

const env = environments[envArg];
if (!env) {
  console.error(`❌ エラー: 無効な環境 "${envArg}"`);
  console.error('利用可能な環境: production');
  process.exit(1);
}

// 必須環境変数のチェック
function validateEnvironment(env) {
  const missing = [];
  
  if (!env.host) missing.push('EC2_HOST');
  if (!env.user) missing.push('EC2_USER');
  if (!env.password && !env.privateKeyPath) missing.push('EC2_PASSWORD または EC2_PRIVATE_KEY_PATH');
  
  if (missing.length > 0) {
    console.error('❌ エラー: 以下の環境変数が設定されていません:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\n.env.localファイルを確認してください。');
    process.exit(1);
  }
}

// 利用可能なリリース一覧を取得
async function getAvailableReleases() {
  try {
    const cmd = `ssh -o StrictHostKeyChecking=no ${env.user}@${env.host} -p ${env.port} "ls -1 ${env.deployPath}/releases 2>/dev/null | sort -r"`;
    const output = execSync(cmd, { encoding: 'utf8' });
    return output.trim().split('\n').filter(release => release.length > 0);
  } catch (error) {
    console.error('❌ リリース一覧の取得に失敗しました:', error.message);
    return [];
  }
}

// 現在のリリースを取得
async function getCurrentRelease() {
  try {
    const cmd = `ssh -o StrictHostKeyChecking=no ${env.user}@${env.host} -p ${env.port} "readlink ${env.deployPath}/current"`;
    const output = execSync(cmd, { encoding: 'utf8' });
    return output.trim().replace('releases/', '');
  } catch (error) {
    console.error('❌ 現在のリリースの取得に失敗しました:', error.message);
    return null;
  }
}

// リリース一覧を表示
async function listReleases() {
  console.log('📋 利用可能なリリース:');
  console.log('');
  
  const releases = await getAvailableReleases();
  const current = await getCurrentRelease();
  
  if (releases.length === 0) {
    console.log('  リリースが見つかりません');
    return;
  }
  
  releases.forEach((release, index) => {
    const marker = release === current ? '👉' : '  ';
    const status = release === current ? '(現在)' : '';
    console.log(`${marker} ${release} ${status}`);
  });
  
  console.log('');
  console.log(`現在のリリース: ${current || '不明'}`);
}

// ロールバック実行
async function rollbackToVersion(targetVersion) {
  console.log(`🔄 ${env.name}のロールバックを開始します...`);
  console.log(`📡 接続先: ${env.user}@${env.host}:${env.port}`);
  
  try {
    // リリースの存在確認
    const releases = await getAvailableReleases();
    if (!releases.includes(targetVersion)) {
      console.error(`❌ エラー: リリース "${targetVersion}" が見つかりません`);
      console.log('利用可能なリリース:');
      releases.forEach(release => console.log(`  - ${release}`));
      process.exit(1);
    }
    
    // 現在のリリース確認
    const current = await getCurrentRelease();
    if (current === targetVersion) {
      console.log(`✅ 既にリリース "${targetVersion}" が稼働中です`);
      return;
    }
    
    // 確認プロンプト
    if (!skipConfirm) {
      console.log('');
      console.log('⚠️  ⚠️  ⚠️  重要警告  ⚠️  ⚠️  ⚠️');
      console.log(`${env.name}のロールバックを実行しようとしています。`);
      console.log(`現在: ${current || '不明'}`);
      console.log(`ロールバック先: ${targetVersion}`);
      console.log('⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️  ⚠️');
      console.log('');
      
      // 実際の確認プロンプトは実装時に追加
    }
    
    // シンボリックリンク更新
    console.log(`🔗 シンボリックリンクを更新中... (${targetVersion})`);
    const symlinkCmd = `ssh -o StrictHostKeyChecking=no ${env.user}@${env.host} -p ${env.port} "cd ${env.deployPath} && ln -sfn releases/${targetVersion} current"`;
    execSync(symlinkCmd);
    
    console.log('');
    console.log('✅ ロールバック完了！');
    console.log(`📅 現在のリリース: ${targetVersion}`);
    console.log(`🌐 サイトURL: http://${env.host}`);
    
  } catch (error) {
    console.error('❌ ロールバックエラー:', error.message);
    process.exit(1);
  }
}

// 直前のバージョンにロールバック
async function rollbackToPrevious() {
  const releases = await getAvailableReleases();
  const current = await getCurrentRelease();
  
  if (releases.length < 2) {
    console.error('❌ エラー: ロールバック可能なリリースがありません');
    return;
  }
  
  // 現在のリリースの次のリリース（古い方）を取得
  const currentIndex = releases.indexOf(current);
  if (currentIndex === -1 || currentIndex >= releases.length - 1) {
    console.error('❌ エラー: ロールバック先のリリースが見つかりません');
    return;
  }
  
  const previousVersion = releases[currentIndex + 1];
  await rollbackToVersion(previousVersion);
}

// メイン処理
async function main() {
  console.log('🔄 ロールバックツール');
  console.log('');
  
  // 環境変数チェック
  validateEnvironment(env);
  
  if (listOnly) {
    await listReleases();
    return;
  }
  
  if (versionArg) {
    await rollbackToVersion(versionArg);
  } else {
    await rollbackToPrevious();
  }
}

// 使用方法の表示
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
使用方法:
  npm run rollback -- --env <environment> [options]

環境:
  production    本番環境 (EC2) のロールバック

オプション:
  --version <version>  指定したバージョンにロールバック
  --list, -l          利用可能なリリース一覧を表示
  --yes, -y           確認プロンプトをスキップ
  --help, -h          このヘルプを表示

例:
  npm run rollback -- --env production                    # 直前のバージョンに戻す
  npm run rollback -- --env production --version 20251024120000  # 指定バージョンに戻す
  npm run rollback -- --env production --list            # リリース一覧表示
  npm run rollback -- --env production --yes              # 確認なしでロールバック
`);
  process.exit(0);
}

// スクリプト実行
main().catch(error => {
  console.error('❌ 予期しないエラー:', error);
  process.exit(1);
});
