import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import prefetch from "@astrojs/prefetch";
import svelte from "@astrojs/svelte";
// import image from "@astrojs/image"; // 非推奨のためコメントアウト
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL,
  env: {
    PUBLIC_SERVICE_SITE_URL: import.meta.env.PUBLIC_SERVICE_SITE_URL || "https://service.joyzo.co.jp",
  },
  integrations: [
    preact(),
    tailwind(),
    sitemap(),
    robotsTxt(),
    prefetch({
      // プリフェッチの設定を調整
      hover: false, // ホバー時のプリフェッチを無効
      throttle: 1000, // プリフェッチの間隔を1秒に設定
      // 開発環境ではプリフェッチを無効にする
      ...(import.meta.env.DEV && { enabled: false }),
    }),
    svelte({}),
    // image(), // 非推奨のためコメントアウト
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
