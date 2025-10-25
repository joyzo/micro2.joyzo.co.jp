# GitHub Actions デプロイ自動化 - 対応内容記録

## 概要

2025年1月に実施したGitHub Actionsデプロイ自動化の対応内容を記録します。

## 実装した機能

### 1. GitHub Actionsワークフロー

#### `.github/workflows/deploy-production.yml`
- **トリガー**: `main`ブランチへのpush
- **処理内容**:
  - Node.js環境セットアップ (v18)
  - 依存関係インストール
  - Astroビルド実行
  - リリースディレクトリ作成 (`/usr/share/nginx/vhosts/www/releases/YYYYMMDDHHMMSS`)
  - SSH経由でファイル転送 (rsync使用)
  - シンボリックリンク更新 (`current` → 新リリース)
  - 古いリリースのクリーンアップ (最新5つのみ保持)

#### `.github/workflows/deploy-development.yml`
- **トリガー**: `develop`ブランチへのpush
- **処理内容**:
  - Node.js環境セットアップ
  - 依存関係インストール
  - Astroビルド実行
  - Vercel CLIでデプロイ

### 2. ローカルデプロイスクリプト

#### `scripts/deploy.js` (統合デプロイCLI)
- **主な機能**:
  - 環境選択: `--env production|development`
  - リリースディレクトリ方式の実装
  - rsyncによる高速ファイル転送
  - デプロイ前の確認プロンプト
  - デプロイ後のヘルスチェック
  - ドライランモード対応

#### `scripts/rollback.js` (ロールバックスクリプト)
- **主な機能**:
  - 利用可能なリリース一覧表示
  - 指定バージョンへのロールバック
  - シンボリックリンクの切り替え
  - ロールバック後の確認

### 3. EC2サーバー初期設定スクリプト

#### `scripts/setup-ec2-deploy.sh`
- **処理内容**:
  - リリースディレクトリ構造の作成
  - nginx設定の更新 (シンボリックリンク対応)
  - 権限設定
  - 初期のcurrentシンボリックリンク作成

## 設定変更の履歴

### package.json
```json
{
  "scripts": {
    "deploy": "node scripts/deploy.js",
    "rollback": "node scripts/rollback.js",
    "deploy:production": "npm run deploy -- --env production",
    "deploy:development": "npm run deploy -- --env development",
    "rollback:production": "npm run rollback -- --env production",
    "deploy:production:legacy": "npm run build && node scripts/deploy-production.js"
  }
}
```

### 環境変数テンプレート
- `env.local.example` を作成
- GitHub Actions用の設定項目を追加
- ローカル/CI両対応の環境変数テンプレート

## GitHub Secrets設定項目一覧

### EC2本番環境用
- `EC2_HOST`: EC2サーバーのIPアドレス
- `EC2_PORT`: SSHポート (デフォルト: 22)
- `EC2_USER`: SSHユーザー名
- `EC2_SSH_KEY`: SSH秘密鍵
- `EC2_DEPLOY_PATH`: デプロイ先パス (デフォルト: `/usr/share/nginx/vhosts/www`)

### Vercel開発環境用
- `VERCEL_TOKEN`: Vercel認証トークン
- `VERCEL_ORG_ID`: VercelオーガニゼーションID
- `VERCEL_PROJECT_ID`: VercelプロジェクトID

## マイグレーション手順

### 1. 作業ブランチ作成
```bash
git checkout -b feature/github-actions-deploy
```

### 2. 実装完了
- GitHub Actionsワークフロー作成
- ローカルデプロイスクリプト作成
- EC2サーバー初期設定スクリプト作成
- ドキュメント更新

### 3. 次のステップ
1. `develop`ブランチにマージ
2. GitHub Secretsの設定
3. EC2サーバー初期設定実行
4. 開発環境での動作確認 (`develop`ブランチ)
5. 本番環境での動作確認 (`main`ブランチへマージ)
6. 既存のVercel GitHub連携を無効化

## ディレクトリ構造 (デプロイ後)

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

## トラブルシューティング

### GitHub Actionsデプロイでよくある問題

#### SSH接続エラー
- EC2サーバーのIPアドレス確認
- セキュリティグループでSSH(22番ポート)許可確認
- GitHub Secretsの`EC2_HOST`設定確認

#### SSH認証エラー
- GitHub Secretsの`EC2_SSH_KEY`設定確認
- SSH秘密鍵の形式確認（OpenSSH形式）
- EC2サーバーのユーザー名確認

#### 権限エラー
- EC2サーバーで初期設定スクリプト実行確認
- デプロイ先ディレクトリの権限確認
- nginx設定更新確認

### ローカルデプロイでよくある問題

#### 環境変数エラー
- `.env.local`ファイル存在確認
- 必要な環境変数設定確認
- `env.local.example`を参考に設定確認

#### distフォルダが見つからない
- `npm run build`実行確認
- ビルドエラー確認

## 変更前後の比較

### 変更前
- **開発環境**: Vercel GitHub連携（自動）
- **本番環境**: SFTP手動デプロイ
- **ロールバック**: 困難（前バージョンの再ビルド&再デプロイ必要）

### 変更後
- **開発環境**: GitHub Actions + Vercel CLI（自動）
- **本番環境**: GitHub Actions + EC2（自動）
- **ローカルデプロイ**: 統合CLI（緊急時対応）
- **ロールバック**: 瞬時（シンボリックリンク切り替えのみ）

## セキュリティ対策

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

既存のデプロイコマンドは下位互換のため引き続き使用可能：

```bash
# 旧デプロイコマンド（引き続き使用可能）
npm run deploy:production:legacy
npm run deploy:images
npm run deploy:no-images
npm run deploy:specific
```

## 将来の拡張性

### EC2テストサーバー対応
- 環境変数で切り替え可能な設計
- `DEPLOY_TARGET`: `vercel` | `ec2` (開発環境の切り替え)
- 環境ごとの設定を`.github/workflows/deploy-*.yml`に分離

### 切り替え時の作業
1. GitHub Secretsにテストサーバー情報追加
2. `deploy-development.yml`の`DEPLOY_TARGET`変更
3. 設定ファイルの環境変数更新のみ

## 実装完了日

2025年1月24日

## 実装者

AI Assistant (Claude)

---

このドキュメントは、将来の参照用としてプロジェクト内に永続的に保持されます。
