import type { MicroCMSImage } from "microcms-js-sdk";

export type Page = {
  title: string;
  slug: string;
  content: string;
  thumbnail?: MicroCMSImage;
  metaDescription?: string;
  publishedAt?: string;
};
