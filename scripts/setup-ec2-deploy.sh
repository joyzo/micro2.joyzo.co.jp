#!/bin/bash

# EC2サーバー初期設定スクリプト
# このスクリプトはEC2サーバー上で実行してください

set -e

echo "🚀 EC2サーバー初期設定を開始します..."

# 設定値
DEPLOY_PATH="/usr/share/nginx/vhosts/www"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
SITE_NAME="joyzo-site"

# 現在のディレクトリを確認
if [ ! -d "$DEPLOY_PATH" ]; then
    echo "❌ エラー: デプロイパス $DEPLOY_PATH が見つかりません"
    echo "正しいディレクトリで実行してください"
    exit 1
fi

echo "📁 リリースディレクトリ構造を作成中..."

# releasesディレクトリを作成
mkdir -p "$DEPLOY_PATH/releases"

# sharedディレクトリを作成（ログ、アップロードファイルなど用）
mkdir -p "$DEPLOY_PATH/shared/logs"
mkdir -p "$DEPLOY_PATH/shared/uploads"

# 権限設定
echo "🔐 権限を設定中..."
chown -R www-data:www-data "$DEPLOY_PATH"
chmod -R 755 "$DEPLOY_PATH"

# nginx設定ファイルを作成
echo "⚙️  nginx設定ファイルを作成中..."

cat > "$DEPLOY_PATH/nginx-site.conf" << 'EOF'
server {
    listen 80;
    server_name _;
    
    # ドキュメントルートをシンボリックリンクに設定
    root /usr/share/nginx/vhosts/www/current;
    index index.html index.htm;
    
    # ログ設定
    access_log /usr/share/nginx/vhosts/www/shared/logs/access.log;
    error_log /usr/share/nginx/vhosts/www/shared/logs/error.log;
    
    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # 静的ファイルのキャッシュ設定
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
    
    # HTMLファイルのキャッシュ設定
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public";
        try_files $uri =404;
    }
    
    # メインのlocation
    location / {
        try_files $uri $uri/ =404;
    }
    
    # セキュリティ: 隠しファイルへのアクセスを拒否
    location ~ /\. {
        deny all;
    }
    
    # セキュリティ: バックアップファイルへのアクセスを拒否
    location ~ ~$ {
        deny all;
    }
}
EOF

echo "✅ nginx設定ファイルを作成しました: $DEPLOY_PATH/nginx-site.conf"

# nginx設定を有効化
echo "🔗 nginx設定を有効化中..."

# 既存の設定を無効化（存在する場合）
if [ -L "$NGINX_SITES_ENABLED/$SITE_NAME" ]; then
    echo "既存の設定を無効化中..."
    rm "$NGINX_SITES_ENABLED/$SITE_NAME"
fi

# 新しい設定をコピー
cp "$DEPLOY_PATH/nginx-site.conf" "$NGINX_SITES_AVAILABLE/$SITE_NAME"

# 設定を有効化
ln -sf "$NGINX_SITES_AVAILABLE/$SITE_NAME" "$NGINX_SITES_ENABLED/"

echo "✅ nginx設定を有効化しました"

# nginx設定のテスト
echo "🧪 nginx設定をテスト中..."
if nginx -t; then
    echo "✅ nginx設定テスト成功"
else
    echo "❌ nginx設定テスト失敗"
    exit 1
fi

# 初期のcurrentシンボリックリンクを作成（存在しない場合）
if [ ! -L "$DEPLOY_PATH/current" ]; then
    echo "🔗 初期のcurrentシンボリックリンクを作成中..."
    
    # 既存のファイルがある場合は、最初のリリースとして移動
    if [ -d "$DEPLOY_PATH" ] && [ "$(ls -A "$DEPLOY_PATH" | grep -v releases | grep -v shared | grep -v nginx-site.conf)" ]; then
        INITIAL_RELEASE="releases/$(date +%Y%m%d%H%M%S)"
        mkdir -p "$DEPLOY_PATH/$INITIAL_RELEASE"
        
        # 既存ファイルを移動（.htaccess, nginx-site.conf, releases, shared, currentを除く）
        find "$DEPLOY_PATH" -maxdepth 1 -type f -not -name "nginx-site.conf" -exec mv {} "$DEPLOY_PATH/$INITIAL_RELEASE/" \;
        find "$DEPLOY_PATH" -maxdepth 1 -type d -not -name "releases" -not -name "shared" -not -name "." -exec mv {} "$DEPLOY_PATH/$INITIAL_RELEASE/" \;
        
        ln -sf "$INITIAL_RELEASE" "$DEPLOY_PATH/current"
        echo "✅ 既存ファイルを初期リリースとして移動しました: $INITIAL_RELEASE"
    else
        # 空のディレクトリを作成
        INITIAL_RELEASE="releases/$(date +%Y%m%d%H%M%S)"
        mkdir -p "$DEPLOY_PATH/$INITIAL_RELEASE"
        echo '<h1>Welcome to Joyzo.co.jp</h1><p>Deployment system is ready!</p>' > "$DEPLOY_PATH/$INITIAL_RELEASE/index.html"
        ln -sf "$INITIAL_RELEASE" "$DEPLOY_PATH/current"
        echo "✅ 初期リリースを作成しました: $INITIAL_RELEASE"
    fi
else
    echo "✅ currentシンボリックリンクは既に存在します"
fi

# nginxを再読み込み
echo "🔄 nginxを再読み込み中..."
systemctl reload nginx

echo ""
echo "🎉 EC2サーバー初期設定が完了しました！"
echo ""
echo "📋 設定内容:"
echo "  - デプロイパス: $DEPLOY_PATH"
echo "  - リリースディレクトリ: $DEPLOY_PATH/releases"
echo "  - 共有ディレクトリ: $DEPLOY_PATH/shared"
echo "  - nginx設定: $NGINX_SITES_AVAILABLE/$SITE_NAME"
echo "  - 現在のシンボリックリンク: $DEPLOY_PATH/current"
echo ""
echo "🔧 次のステップ:"
echo "  1. GitHub SecretsにEC2接続情報を設定"
echo "  2. GitHub Actionsでデプロイをテスト"
echo "  3. ローカルからデプロイコマンドをテスト"
echo ""
echo "🌐 サイトURL: http://$(curl -s ifconfig.me)"
echo ""
echo "⚠️  注意: このスクリプトは一度だけ実行してください"
