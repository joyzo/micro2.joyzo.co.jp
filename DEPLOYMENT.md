# デプロイメントガイド

このドキュメントでは、Joyzo.co.jp ウェブサイトのデプロイ手順について説明します。

## デプロイ環境

### 本番環境
- **サーバー**: EC2 (AWS)
- **デプロイ方法**: ローカルからSFTP経由で手動デプロイ
- **アクセス**: VPN経由でのみアクセス可能
- **デプロイ先パス**: `/usr/share/nginx/vhosts/www`

### 開発/テスト環境
- **サーバー**: Vercel
- **デプロイ方法**: GitHub push時の自動デプロイ
- **ブランチ**: `main` ブランチ

## Basic認証の設定

本番環境にBasic認証を設定して、サイトへのアクセスを制限できます。

### Basic認証の設定手順

#### 1. 環境変数の設定
`.env.local`ファイルにBasic認証の設定を追加：

```bash
# Basic認証設定
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=your_secure_password_here
```

#### 2. Basic認証の設定実行
```bash
npm run setup:basic-auth
```

このコマンドは以下の処理を実行します：
- `.htpasswd`ファイルの生成とアップロード
- nginx設定ファイルの生成とアップロード
- サーバー設定の手順を表示

#### 3. サーバーでのnginx設定
SSH接続後、以下のコマンドを実行：

```bash
# nginx設定ファイルをコピー
sudo cp /usr/share/nginx/vhosts/www/nginx-site.conf /etc/nginx/sites-available/joyzo-site

# サイトを有効化
sudo ln -sf /etc/nginx/sites-available/joyzo-site /etc/nginx/sites-enabled/

# 設定のテスト
sudo nginx -t

# nginxの再読み込み
sudo systemctl reload nginx
```

#### 4. Basic認証の確認
ブラウザでサイトにアクセスすると、認証ダイアログが表示されます：
- ユーザー名: 設定した`BASIC_AUTH_USERNAME`
- パスワード: 設定した`BASIC_AUTH_PASSWORD`

## 本番環境へのデプロイ手順

⚠️ **重要: 本番環境へのデプロイについて**  
本番環境へのデプロイは、**必ず承諾を得てから実行しなければなりません**。  
デプロイ前に以下を確認してください：
- プロジェクト責任者からの承諾
- デプロイ内容の確認
- 影響範囲の把握
- ロールバック計画の準備

### 1. 事前準備

#### 1.1 依存関係のインストール
```bash
npm install
```

#### 1.2 環境変数の設定
`.env.local.example` を `.env.local` にコピーして、実際の値を設定してください：

```bash
cp .env.local.example .env.local
```

`.env.local` ファイルを編集：
```bash
# EC2 SFTP接続情報
SFTP_HOST=xxx.xxx.xxx.xxx
SFTP_PORT=22
SFTP_USER=username
SFTP_PASSWORD=password_or_leave_empty_for_key
SFTP_PRIVATE_KEY_PATH=~/.ssh/id_rsa
SFTP_REMOTE_PATH=/usr/share/nginx/vhosts/www

# Basic認証設定（オプション）
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=your_secure_password_here
```

#### 1.3 VPN接続
EC2サーバーにアクセスするため、VPNに接続してください。

### 2. Basic認証の設定（オプション）

Basic認証を有効にしたい場合：

```bash
npm run setup:basic-auth
```

### 3. デプロイ実行

```bash
npm run deploy:production
```

このコマンドは以下の処理を自動実行します：
1. `npm run build` - Astroプロジェクトのビルド
2. SFTP接続とファイルアップロード
3. 既存ファイルのバックアップ作成
4. 新しいファイルの配置

### 4. デプロイ確認

デプロイ完了後、以下のURLでサイトが正常に表示されることを確認してください：
- `http://[EC2サーバーのIPアドレス]`

## 開発環境へのデプロイ手順

### 自動デプロイ（推奨）
```bash
git add .
git commit -m "Update: 変更内容の説明"
git push origin main
```

`main` ブランチにpushすると、Vercelが自動的にデプロイを実行します。

### 手動デプロイ
Vercelダッシュボードから手動でデプロイを実行することも可能です。

## トラブルシューティング

### 本番デプロイでよくある問題

#### 1. SFTP接続エラー
```
❌ エラー: connect ECONNREFUSED xxx.xxx.xxx.xxx:22
```

**解決方法:**
- VPN接続を確認してください
- EC2サーバーのIPアドレスが正しいか確認してください
- セキュリティグループでSSH(22番ポート)が許可されているか確認してください

#### 2. 認証エラー
```
❌ エラー: All configured authentication methods failed
```

**解決方法:**
- `.env.local` の認証情報を確認してください
- SSH鍵認証の場合、秘密鍵ファイルのパスが正しいか確認してください
- パスワード認証の場合、パスワードが正しいか確認してください

#### 3. 権限エラー
```
❌ エラー: Permission denied
```

**解決方法:**
- SFTPユーザーがリモートディレクトリに書き込み権限を持っているか確認してください
- 必要に応じて、サーバー管理者に権限設定を依頼してください

#### 4. distフォルダが見つからない
```
❌ エラー: distフォルダが見つかりません
```

**解決方法:**
- 先に `npm run build` を実行してください
- ビルドエラーがないか確認してください

### 開発環境デプロイでよくある問題

#### 1. Vercelデプロイエラー
- Vercelダッシュボードでエラーログを確認してください
- ビルドログでエラーの詳細を確認してください
- 環境変数が正しく設定されているか確認してください

#### 2. 依存関係エラー
```bash
npm install
```
を実行して依存関係を再インストールしてください。

## セキュリティ注意事項

### 本番環境
- `.env.local` ファイルは絶対にGitにコミットしないでください
- VPN接続は常に最新の状態に保ってください
- 定期的にサーバーのセキュリティアップデートを確認してください

### 開発環境
- 機密情報は環境変数として管理してください
- Vercelの環境変数設定で機密情報を管理してください

## バックアップ

本番デプロイ時は、既存ファイルの自動バックアップが作成されます：
- バックアップパス: `/usr/share/nginx/vhosts/www_backup_[タイムスタンプ]`
- 必要に応じて手動でバックアップを削除してください

## サポート

デプロイに関する問題が発生した場合：
1. このドキュメントのトラブルシューティングを確認
2. エラーメッセージを詳細に記録
3. 開発チームに連絡

---

最終更新: 2024年
