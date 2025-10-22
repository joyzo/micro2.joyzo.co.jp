import type { MicroCMSImage } from "microcms-js-sdk";

export type Blog = {
  id: string;
  title: string; // タイトル（CMS）
  content: string; // 内容（CMS）- HTMLタグが含まれる
  overview?: string; // 概要（CMS）
  publishedAt: string; // 公開日（CMS）
  release_date: string; // リリース日（CMS）
  thumbnail?: MicroCMSImage; // アイキャッチ（CMS）
  eyecatch?: MicroCMSImage; // アイキャッチ（CMS）- 別名
  image?: MicroCMSImage; // アイキャッチ（CMS）- 別名
  tags?: string[]; // タグ（CMS）
  tag?: any; // タグ（CMS）- セレクトフィールド
  createdAt: string;
  updatedAt: string;
};
