<script lang="ts">
  import { onMount } from "svelte";
  import AnimatedText from "./AnimatedText.svelte";
  import Button from "./Button.svelte";

  // マニフェストのコピー（ランダム表示用）
  const manifestCopies = [
    "ハローワールド｜楽しむから、変わる",
    "メタメセン｜高く見て深く読む",
    "フッカラー｜試して、変えて、前に行け",
    "モクテキーパー｜問い続けろ、行動の理由を",
    "リスペリレー｜信頼はひとりでは作れない",
    "ギブレルヤツ｜見返りなんて、いらない",
    "ジブンジク｜選んだ道が自分をつくる",
    "カラダシホン｜メンテしてこそ動ける",
    "アイテメガネ｜尊重し合うから、新しい可能性がみつかる",
  ];

  let currentCopy = "";
  let copyIndex = 0;
  let isVisible = false;
  let showContent = false;

  onMount(() => {
    // 初期表示
    currentCopy = manifestCopies[0] || "";
    isVisible = true;

    // コンテンツ表示の遅延
    setTimeout(() => {
      showContent = true;
    }, 500);

    // 3秒ごとにコピーを切り替え
    const interval = setInterval(() => {
      copyIndex = (copyIndex + 1) % manifestCopies.length;
      isVisible = false;

      setTimeout(() => {
        currentCopy = manifestCopies[copyIndex] || "";
        isVisible = true;
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  });
</script>

<section
  class="hero-section relative flex min-h-screen items-center justify-center bg-white"
>
  <!-- メインコンテンツ -->
  <div class="relative z-10 mx-auto max-w-6xl px-6 md:px-4 text-center text-black">
    <!-- メインコピー -->
    <div class="mb-16">
      <AnimatedText
        text={currentCopy}
        className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tighter font-heading"
        delay={0.03}
        duration={1.2}
      />
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
      <Button
        href="/company"
        variant="outline"
        size="lg"
        className="border-2 border-black text-black hover:bg-black hover:text-white px-12 py-5 rounded-none font-semibold text-lg"
      >
        会社概要を見る
      </Button>
      <Button
        href="https://service.joyzo.co.jp"
        target="_blank"
        variant="primary"
        size="lg"
        className="bg-gray-800 text-white hover:bg-gray-700 px-12 py-5 rounded-none font-semibold text-lg"
      >
        サービスを見る
      </Button>
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
