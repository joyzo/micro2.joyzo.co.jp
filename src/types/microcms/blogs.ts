import type { MicroCMSImage } from "microcms-js-sdk";

export type Blog = {
  id: string;
  title: string; // タイトル（CMS）
  content: string; // 内容（CMS）- HTMLタグが含まれる
  publishedAt: string; // 公開日（CMS）
  release_date: string; // リリース日（CMS）
  thumbnail?: MicroCMSImage; // アイキャッチ（CMS）
  eyecatch?: MicroCMSImage; // アイキャッチ（CMS）- 別名
  image?: MicroCMSImage; // アイキャッチ（CMS）- 別名
  articleUrl?: string; // 記事URL（CMS）
  url?: string; // 記事URL（CMS）- 別名
  link?: string; // 記事URL（CMS）- 別名
  createdAt: string;
  updatedAt: string;
};
