import { createClient } from "microcms-js-sdk";
import type { CompanyPage } from "../types/microcms/pages";
import type { Blog } from "../types/microcms/blogs";

if (
  import.meta.env["PUBLIC_MICROCMS_SERVICE_DOMAIN"] === undefined ||
  import.meta.env["PUBLIC_MICROCMS_API_KEY"] === undefined
) {
  throw new Error(
    "Please set environment variables: MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY"
  );
}

export const client = createClient({
  serviceDomain: import.meta.env["PUBLIC_MICROCMS_SERVICE_DOMAIN"],
  apiKey: import.meta.env["PUBLIC_MICROCMS_API_KEY"],
});

// 会社概要ページのデータを取得
export const getCompanyPage = async (): Promise<CompanyPage> => {
  try {
    const response = await client.get({
      endpoint: "pages",
      contentId: "company",
    });
    return response as CompanyPage;
  } catch (error) {
    console.error("Failed to fetch company page data:", error);
    throw error;
  }
};

// 最新のニュース記事を取得（最新3件）
export const getLatestNews = async (): Promise<Blog[]> => {
  try {
    const response = await client.getList({
      endpoint: "news",
      queries: {
        limit: 3,
        orders: "-release_date", // リリース日の降順（最新順）
      },
    });
    return response.contents as Blog[];
  } catch (error) {
    console.error("Failed to fetch latest news:", error);
    throw error;
  }
};

// ニュース一覧を取得
export const getNewsList = async (page: number = 1, limit: number = 10): Promise<{ contents: Blog[], totalCount: number }> => {
  try {
    const response = await client.getList({
      endpoint: "news",
      queries: {
        limit,
        offset: (page - 1) * limit,
        orders: "-release_date", // リリース日の降順（最新順）
      },
    });
    return {
      contents: response.contents as Blog[],
      totalCount: response.totalCount
    };
  } catch (error) {
    console.error("Failed to fetch news list:", error);
    throw error;
  }
};

// ニュース詳細を取得
export const getNewsDetail = async (id: string): Promise<Blog> => {
  try {
    const response = await client.get({
      endpoint: "news",
      contentId: id,
    });
    return response as Blog;
  } catch (error) {
    console.error("Failed to fetch news detail:", error);
    throw error;
  }
};
