// kintoneニュース記事の型定義
export type KintoneNewsImage = {
  url: string; // S3のURL
  name?: string;
  size?: number;
};

export type KintoneNews = {
  id: string; // 投稿ID（自動採番プラグインで生成）
  microcms_id?: string; // microCMSのID（移行時の互換性のため）
  title: string; // タイトル
  content: string; // 本文（HTML形式）
  overview?: string; // 概要
  publishedAt?: string; // 公開日
  release_date: string; // リリース日
  thumbnail?: KintoneNewsImage; // サムネイル画像（S3のURL）
  eyecatch?: KintoneNewsImage; // アイキャッチ画像（S3のURL）
  image?: KintoneNewsImage; // 画像（S3のURL）
  tags?: string[]; // タグ
  tag?: any; // タグ（セレクトフィールド）
  publish: string[]; // 公開環境（配列：["開発", "本番"]）
  createdAt: string;
  updatedAt: string;
};

