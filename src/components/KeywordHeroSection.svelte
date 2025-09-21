<script lang="ts">
  import { onMount } from "svelte";

  // キーワードの配列
  const keywords = [
    "ハローワールド",
    "メタメセン",
    "フッカラー",
    "モクテキーパー",
    "リスペリレー",
    "ギブレルヤツ",
    "ジブンジク",
    "カラダシホン",
    "アイテメガネ",
    "ENJOY YOUR WORLD",
  ];

  let currentKeyword = "";
  let keywordIndex = 0;
  let isVisible = false;
  let showContent = false;

  onMount(() => {
    // 初期表示
    currentKeyword = keywords[0] || "";
    isVisible = true;

    // コンテンツ表示の遅延
    setTimeout(() => {
      showContent = true;
    }, 500);

    // 2秒ごとにキーワードを切り替え
    const interval = setInterval(() => {
      keywordIndex = (keywordIndex + 1) % keywords.length;
      isVisible = false;

      setTimeout(() => {
        currentKeyword = keywords[keywordIndex] || "";
        isVisible = true;
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  });
</script>

<section
  class="hero-section relative flex min-h-screen items-center justify-center bg-white"
>
  <!-- メインコンテンツ -->
  <div class="relative z-10 mx-auto max-w-6xl px-4 text-center text-black">
    <!-- メインコピー -->
    <div class="mb-16">
      <h1
        class="md:text-8xl lg:text-9xl tracking-tighter font-heading text-6xl font-black leading-tight"
      >
        <span
          class="transition-all duration-500"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          {currentKeyword}
        </span>
      </h1>
    </div>

    <!-- サブコピー -->
    <div
      class="mb-20 opacity-0 transition-opacity duration-1000"
      class:opacity-100={showContent}
    >
      <p
        class="mx-auto max-w-4xl text-2xl font-light leading-relaxed text-gray-600 md:text-3xl"
      >
        kintoneをはじめとするサービスで、お客様の世界をもっと快適に、もっと創造的にしていきます
      </p>
    </div>

    <!-- CTAボタン -->
    <div
      class="mb-20 flex flex-col items-center justify-center gap-6 opacity-0 transition-all delay-500 duration-1000 sm:flex-row"
      class:opacity-100={showContent}
      class:translate-y-0={showContent}
      class:translate-y-8={!showContent}
    >
      <a
        href="/company"
        class="rounded-none border-2 border-black px-12 py-5 text-lg font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white"
      >
        会社概要を見る
      </a>
      <a
        href="https://joyzo.co.jp"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-none bg-gray-800 px-12 py-5 text-lg font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
      >
        サービスを見る
      </a>
    </div>

    <!-- マニフェストリンク -->
    <div
      class="opacity-0 transition-all delay-700 duration-1000"
      class:opacity-100={showContent}
      class:translate-y-0={showContent}
      class:translate-y-8={!showContent}
    >
      <a
        href="/aboutus"
        class="inline-block text-xl font-medium text-gray-500 transition-colors duration-300 hover:text-black"
      >
        JOYZO Manifesto をもっと見る →
      </a>
    </div>
  </div>

  <!-- スクロールインジケータ -->
  <div
    class="absolute bottom-12 left-1/2 -translate-x-1/2 transform animate-bounce"
  >
    <svg
      class="h-8 w-8 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </div>
</section>

<style>
  .hero-section {
    background: #ffffff;
  }
</style>
