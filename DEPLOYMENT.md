# デプロイメントガイド

このドキュメントでは、Joyzo.co.jp ウェブサイトの新しいデプロイシステムについて説明します。

## デプロイシステム概要

### 新しいデプロイフロー

- **開発環境 (Vercel)**: `develop`ブランチへのpush → Vercel自動デプロイ
- **本番環境 (EC2)**: `main`ブランチへのpush/merge → GitHub Actionsで自動デプロイ
- **ローカルデプロイ**: コマンドラインから任意の環境にデプロイ可能

### デプロイ方式

- **EC2デプロイ**: リリースディレクトリ方式 + シンボリックリンク切り替え
- **ロールバック**: 前バージョンへの即座の切り戻し機能
- **将来対応**: EC2テストサーバーへの切り替えを想定した設計

## 初期設定

### 1. GitHub Secretsの設定

GitHub リポジトリの **Settings > Secrets and variables > Actions** で以下のSecretsを設定してください：

#### EC2本番環境用
- `EC2_HOST`: EC2サーバーのIPアドレス
- `EC2_PORT`: SSHポート (デフォルト: 22)
- `EC2_USER`: SSHユーザー名
- `EC2_SSH_KEY`: SSH秘密鍵（パスワード認証の場合は不要）
- `EC2_DEPLOY_PATH`: デプロイ先パス (デフォルト: `/usr/share/nginx/vhosts/www`)

#### Vercel開発環境用
- `VERCEL_TOKEN`: Vercel認証トークン
- `VERCEL_ORG_ID`: VercelオーガニゼーションID
- `VERCEL_PROJECT_ID`: VercelプロジェクトID

### 2. EC2サーバーの初期設定

EC2サーバーにSSH接続して、以下のコマンドを実行してください：

```bash
# デプロイスクリプトをサーバーにアップロード
scp scripts/setup-ec2-deploy.sh user@your-server:/tmp/

# サーバーに接続
ssh user@your-server

# 初期設定スクリプトを実行
sudo bash /tmp/setup-ec2-deploy.sh
```

このスクリプトは以下の処理を実行します：
- リリースディレクトリ構造の作成
- nginx設定の更新（シンボリックリンク対応）
- 権限設定
- 初期のcurrentシンボリックリンク作成

### 3. ローカル環境の設定

```bash
# 環境変数ファイルを作成
cp env.local.example .env.local

# .env.localを編集して実際の値を設定
nano .env.local
```

## デプロイ方法

### 自動デプロイ（推奨）

#### 開発環境へのデプロイ
```bash
git checkout develop
git add .
git commit -m "Update: 変更内容の説明"
git push origin develop
```

`develop`ブランチにpushすると、GitHub Actionsが自動的にVercelにデプロイします。

#### 本番環境へのデプロイ
```bash
git checkout main
git merge develop  # または直接mainにpush
git push origin main
```

`main`ブランチにpushすると、GitHub Actionsが自動的にEC2にデプロイします。

### ローカルからのデプロイ

#### 本番環境へのデプロイ
```bash
# ビルド + デプロイ
npm run build
npm run deploy:production

# または一括実行
npm run deploy -- --env production
```

#### 開発環境へのデプロイ
```bash
# ビルド + デプロイ
npm run build
npm run deploy:development

# または一括実行
npm run deploy -- --env development
```

#### デプロイオプション
```bash
# 確認プロンプトをスキップ
npm run deploy -- --env production --yes

# ドライランモード（実際のデプロイは実行しない）
npm run deploy -- --env production --dry-run

# ヘルプを表示
npm run deploy -- --help
```

## ロールバック

### 利用可能なリリース一覧表示
```bash
npm run rollback -- --env production --list
```

### 直前のバージョンにロールバック
```bash
npm run rollback -- --env production
```

### 指定バージョンにロールバック
```bash
npm run rollback -- --env production --version 20251024120000
```

### 確認なしでロールバック
```bash
npm run rollback -- --env production --yes
```

## ディレクトリ構造

### EC2サーバー上の構造
```
/usr/share/nginx/vhosts/www/
├── releases/
│   ├── 20251024100000/    # 旧バージョン
│   ├── 20251024120000/    # 旧バージョン
│   └── 20251024140000/    # 最新バージョン
├── current -> releases/20251024140000/  # シンボリックリンク
└── shared/                # 共有ファイル
    ├── logs/              # ログファイル
    └── uploads/           # アップロードファイル
```

### ローカルプロジェクトの構造
```
micro2.joyzo.co.jp/
├── .github/workflows/     # GitHub Actionsワークフロー
│   ├── deploy-production.yml
│   └── deploy-development.yml
├── scripts/               # デプロイスクリプト
│   ├── deploy.js          # 統合デプロイCLI
│   ├── rollback.js        # ロールバックスクリプト
│   ├── setup-ec2-deploy.sh # EC2初期設定
│   └── deploy-production.js # 旧デプロイスクリプト（下位互換）
└── env.local.example      # 環境変数テンプレート
```

## トラブルシューティング

### GitHub Actionsデプロイでよくある問題

#### 1. SSH接続エラー
```
❌ エラー: connect ECONNREFUSED xxx.xxx.xxx.xxx:22
```

**解決方法:**
- EC2サーバーのIPアドレスが正しいか確認
- セキュリティグループでSSH(22番ポート)が許可されているか確認
- GitHub Secretsの`EC2_HOST`が正しく設定されているか確認

#### 2. SSH認証エラー
```
❌ エラー: All configured authentication methods failed
```

**解決方法:**
- GitHub Secretsの`EC2_SSH_KEY`が正しく設定されているか確認
- SSH秘密鍵の形式が正しいか確認（OpenSSH形式）
- EC2サーバーのユーザー名が正しいか確認

#### 3. 権限エラー
```
❌ エラー: Permission denied
```

**解決方法:**
- EC2サーバーで初期設定スクリプトが実行されているか確認
- デプロイ先ディレクトリの権限が正しく設定されているか確認
- nginx設定が正しく更新されているか確認

### ローカルデプロイでよくある問題

#### 1. 環境変数エラー
```
❌ エラー: 以下の環境変数が設定されていません: EC2_HOST
```

**解決方法:**
- `.env.local`ファイルが存在するか確認
- 必要な環境変数がすべて設定されているか確認
- `env.local.example`を参考に設定を確認

#### 2. distフォルダが見つからない
```
❌ エラー: distフォルダが見つかりません
```

**解決方法:**
- 先に `npm run build` を実行
- ビルドエラーがないか確認

### Vercelデプロイでよくある問題

#### 1. Vercel認証エラー
```
❌ エラー: Vercel authentication failed
```

**解決方法:**
- GitHub Secretsの`VERCEL_TOKEN`が正しく設定されているか確認
- Vercelトークンが有効か確認
- `VERCEL_ORG_ID`と`VERCEL_PROJECT_ID`が正しく設定されているか確認

## セキュリティ注意事項

### GitHub Secrets
- Secretsは絶対にコードにハードコードしない
- 定期的にSecretsをローテーション
- 不要なSecretsは削除

### EC2サーバー
- SSH秘密鍵は安全に管理
- 定期的にサーバーのセキュリティアップデートを確認
- デプロイ先ディレクトリの権限を適切に設定

### ローカル環境
- `.env.local`ファイルは絶対にGitにコミットしない
- 環境変数ファイルの権限を適切に設定

## 下位互換性

既存のデプロイコマンドは下位互換のため引き続き使用可能です：

```bash
# 旧デプロイコマンド（引き続き使用可能）
npm run deploy:production:legacy
npm run deploy:images
npm run deploy:no-images
npm run deploy:specific
```

## サポート

デプロイに関する問題が発生した場合：
1. このドキュメントのトラブルシューティングを確認
2. GitHub Actionsのログを確認
3. エラーメッセージを詳細に記録
4. 開発チームに連絡

---

最終更新: 2025年1月