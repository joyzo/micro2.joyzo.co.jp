# JOYZO コーポレートサイト

![](_docimages/cover.png)

株式会社ジョイゾーのコーポレートサイトです。  
フレームワークには Astro + Svelte を使用し、モダンで軽量な Web サイトになっています。

## サイト構成

```
トップページ（index）
├ ジョイゾーとは（aboutus）
├ 会社概要 (company)
├ 採用情報 (recruit)
├ プライバシーポリシー(privacy)
├ ニュース (news)
└ お問い合わせ (contact)
```

## 動作環境

- Node.js 18 以上
- Astro 5.x
- Svelte 5.x

## 環境変数の設定

ルート直下に`.env`ファイルを作成し、下記の情報を入力してください。

```
PUBLIC_MICROCMS_API_KEY=xxxxxxxxxx
PUBLIC_MICROCMS_SERVICE_DOMAIN=xxxxxxxxxx
PUBLIC_SITE_URL=xxxxxxxxxx
PUBLIC_FORM_URL=xxxxxxxxxx
PUBLIC_GOOGLE_ANALYTICS_ID=xxxxxxxxxx
```

### 環境変数の詳細

`PUBLIC_MICROCMS_API_KEY`  
microCMS 管理画面の「サービス設定 > API キー」から確認できます。  
API キーの権限は GET のみに設定してください。

`PUBLIC_MICROCMS_SERVICE_DOMAIN`  
microCMS 管理画面の URL（https://xxxxxxxx.microcms.io）の xxxxxxxx の部分です。

`PUBLIC_SITE_URL`  
デプロイ先の URL です。プロトコルから記載してください。  
例） https://xxxxxxxx.vercel.app/ など

`PUBLIC_FORM_URL`  
お問い合わせの送信先です。form タグの action に指定されます。

`PUBLIC_GOOGLE_ANALYTICS_ID`  
GA4 を使った GoogleAnalytics の測定 ID です。

## 開発の仕方

### 1. パッケージのインストール

```bash
npm install
```

### 2. 開発環境の起動

```bash
npm run dev
```

### 3. 開発環境へのアクセス

[http://localhost:3000](http://localhost:3000) にアクセス

### 4. ビルドテスト

```bash
npm run build
```

## 技術スタック

- **フレームワーク**: Astro 5.x
- **UI フレームワーク**: Svelte 5.x
- **スタイリング**: Tailwind CSS
- **CMS**: microCMS
- **デプロイ**: Vercel

## 主要コンポーネント

- `HeroAnimation.svelte` - トップページのヒーローアニメーション
- `ScrollStorySection.svelte` - スクロールストーリーセクション
- `CoreCopySection.svelte` - コアコピーセクション
- `AboutSection.svelte` - ジョイゾーとはセクション
- `CompanySection.svelte` - 会社概要セクション
- `CareersSection.svelte` - 採用情報セクション
- `ContactSection.svelte` - お問い合わせセクション

## Vercel へのデプロイ

[Vercel Platform](https://vercel.com/new)から簡単にデプロイが可能です。

リポジトリを紐付け、環境変数を `Environment Variables` に登録しましょう。

### webhook の設定

microCMS のコンテンツ更新があったタイミングで Vercel のデプロイをフックしましょう。
https://document.microcms.io/manual/webhook-setting#h065a574f0d

通知タイミングの設定は以下を参考にしてください。
![](_docimages/webhook-settings.png)

「お知らせ」の API で同様に設定します。

## 画面プレビューの設定

このテンプレートでは「お知らせ」の microCMS API が使用されています。  
画面プレビューが利用可能です。  
microCMS の管理画面から URL の設定をする必要があります。  
https://document.microcms.io/manual/screen-preview

以下に画面プレビューの設定例を示しますのでドメイン部分を実際にデプロイする先に合わせて変更ください。

- お知らせ
  https://ドメイン/news/preview?contentId={CONTENT_ID}&draftKey={DRAFT_KEY}

## ライセンス

このプロジェクトは株式会社ジョイゾーの所有物です。
