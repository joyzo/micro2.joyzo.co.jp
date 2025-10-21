import type { MicroCMSImage } from "microcms-js-sdk";

export type Page = {
  title: string;
  slug: string;
  content: string;
  thumbnail?: MicroCMSImage;
  metaDescription?: string;
  publishedAt?: string;
};

export type CompanyPage = {
  title: string;
  subtitle: string;
  content1: string;
  content2: string;
  publishedAt?: string;
  updatedAt?: string;
};
