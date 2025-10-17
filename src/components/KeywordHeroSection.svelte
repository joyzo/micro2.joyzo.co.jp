<script lang="ts">
  import { onMount } from "svelte";

  // 左側のキーワード（ENJOYから始まって?が×に変わる）
  const leftKeywords = ["ENJOY", "?", "×"];

  // 右側のキーワード（IT以外から始まる）
  const rightKeywords = ["CREATIVE", "IT", "DESIGN", "TECH", "INNOVATION"];

  let showContent = false;

  // 左側と右側のキーワード制御
  let leftKeyword = "";
  let rightKeyword = "";
  let leftIndex = 0;
  let rightIndex = 0;
  let leftVisible = false;
  let rightVisible = false;
  let isRotating = false; // ?から×への回転アニメーション用

  onMount(() => {
    // 初期表示
    leftKeyword = leftKeywords[0] || "";
    rightKeyword = rightKeywords[0] || "";
    leftVisible = true;
    rightVisible = true;

    // コンテンツ表示の遅延
    setTimeout(() => {
      showContent = true;
    }, 500);

    // 左側のアニメーション（ENJOY -> ? -> ×）
    setTimeout(() => {
      leftIndex = 1;
      leftVisible = false;
      setTimeout(() => {
        leftKeyword = leftKeywords[leftIndex] || "";
        leftVisible = true;
      }, 300);
    }, 2000);

    // ?から×への変化（回転アニメーション付き）
    setTimeout(() => {
      leftIndex = 2;
      isRotating = true;
      leftVisible = false;
      setTimeout(() => {
        leftKeyword = leftKeywords[leftIndex] || "";
        leftVisible = true;
        // 回転アニメーション終了
        setTimeout(() => {
          isRotating = false;
        }, 500);
      }, 300);
    }, 4000);

    // 右側のアニメーション（2秒ごとに切り替え）
    const rightInterval = setInterval(() => {
      rightIndex = (rightIndex + 1) % rightKeywords.length;
      rightVisible = false;

      setTimeout(() => {
        rightKeyword = rightKeywords[rightIndex] || "";
        rightVisible = true;
      }, 300);
    }, 2000);

    return () => clearInterval(rightInterval);
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
        style="letter-spacing: -0.05em;"
      >
        <div class="flex items-center justify-center gap-8">
          <!-- 左側のキーワード -->
          <span
            class="transition-all duration-500"
            class:opacity-100={leftVisible}
            class:opacity-0={!leftVisible}
            class:translate-y-0={leftVisible}
            class:translate-y-8={!leftVisible}
            class:rotate-180={isRotating}
          >
            {leftKeyword}
          </span>

          <!-- 右側のキーワード -->
          <span
            class="transition-all duration-500"
            class:opacity-100={rightVisible}
            class:opacity-0={!rightVisible}
            class:translate-y-0={rightVisible}
            class:translate-y-8={!rightVisible}
          >
            {rightKeyword}
          </span>
        </div>
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
        class="rounded-none border-2 border-black bg-white px-12 py-5 text-lg font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white"
      >
        会社概要を見る
      </a>
      <a
        href="https://service.joyzo.co.jp"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-none bg-gray-800 px-12 py-5 text-lg font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
      >
        サービスを見る
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

  /* 回転アニメーション用のスタイル */
  .rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.5s ease-in-out;
  }
</style>
