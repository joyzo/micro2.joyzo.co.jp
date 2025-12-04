import type { KintoneNews } from "../types/kintone/news";
import type { KintonePage } from "../types/kintone/pages";
import { readFileSync } from "fs";
import { join } from "path";

// JSONファイルを読み込む（ビルド時に実行される）
const loadNewsData = (): KintoneNews[] => {
  try {
    if (import.meta.env.SSR) {
      // サーバーサイド（ビルド時）
      const filePath = join(process.cwd(), "src/data/kintone/news.json");
      const data = readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } else {
      // クライアントサイド（通常は発生しない）
      return [];
    }
  } catch (error) {
    console.warn("Failed to load news.json, using empty array");
    return [];
  }
};

const loadPagesData = (): Record<string, KintonePage> => {
  try {
    if (import.meta.env.SSR) {
      // サーバーサイド（ビルド時）
      const filePath = join(process.cwd(), "src/data/kintone/pages.json");
      const data = readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } else {
      // クライアントサイド（通常は発生しない）
      return {};
    }
  } catch (error) {
    console.warn("Failed to load pages.json, using empty object");
    return {};
  }
};

const newsData = loadNewsData();
const pagesData = loadPagesData();

// 環境変数から環境を取得（development/production）
const getEnvironment = (): string => {
  return import.meta.env.KINTONE_ENV || "development";
};

// 公開フィールドでフィルタリング
const filterByPublish = <T extends { publish: string[] }>(
  items: T[],
  environment: string
): T[] => {
  const envMap: Record<string, string> = {
    development: "開発",
    production: "本番",
  };
  const publishValue = envMap[environment] || "開発";
  return items.filter((item) => item.publish.includes(publishValue));
};

// 最新のニュース記事を取得（最新3件）
export const getLatestNews = async (): Promise<KintoneNews[]> => {
  try {
    const environment = getEnvironment();
    const filteredNews = filterByPublish(newsData, environment);
    // リリース日の降順でソート
    const sortedNews = filteredNews.sort((a, b) => {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      return dateB - dateA;
    });
    return sortedNews.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch latest news:", error);
    throw error;
  }
};

// ニュース一覧を取得
export const getNewsList = async (
  page: number = 1,
  limit: number = 10
): Promise<{ contents: KintoneNews[]; totalCount: number }> => {
  try {
    const environment = getEnvironment();
    const filteredNews = filterByPublish(newsData, environment);
    // リリース日の降順でソート
    const sortedNews = filteredNews.sort((a, b) => {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      return dateB - dateA;
    });
    const offset = (page - 1) * limit;
    return {
      contents: sortedNews.slice(offset, offset + limit),
      totalCount: sortedNews.length,
    };
  } catch (error) {
    console.error("Failed to fetch news list:", error);
    throw error;
  }
};

// ニュース詳細を取得
export const getNewsDetail = async (id: string): Promise<KintoneNews> => {
  try {
    const environment = getEnvironment();
    const filteredNews = filterByPublish(newsData, environment);
    const news = filteredNews.find((item) => item.id === id);
    if (!news) {
      throw new Error(`News with id ${id} not found`);
    }
    return news;
  } catch (error) {
    console.error("Failed to fetch news detail:", error);
    throw error;
  }
};

// 固定ページを取得
export const getPage = async (pageId: string): Promise<KintonePage> => {
  try {
    const environment = getEnvironment();
    const pages = pagesData;
    const page = pages[pageId];
    if (!page) {
      throw new Error(`Page with page_id ${pageId} not found`);
    }
    // 公開フィールドでフィルタリング
    const envMap: Record<string, string> = {
      development: "開発",
      production: "本番",
    };
    const publishValue = envMap[environment] || "開発";
    if (!page.publish.includes(publishValue)) {
      throw new Error(`Page ${pageId} is not published in ${environment} environment`);
    }
    return page;
  } catch (error) {
    console.error("Failed to fetch page:", error);
    throw error;
  }
};

// 会社概要ページのデータを取得（互換性のため）
export const getCompanyPage = async (): Promise<KintonePage> => {
  return getPage("company");
};

