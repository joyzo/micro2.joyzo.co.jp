<script>
  import { onMount, onDestroy } from "svelte";

  let sectionElement;
  let coreCopyElement;

  onMount(async () => {
    // クライアントサイドでのみGSAPを読み込み
    if (typeof window === "undefined") return;

    const { default: gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger.js");

    // GSAP ScrollTrigger プラグイン登録
    gsap.registerPlugin(ScrollTrigger);

    // グローバルなLenisインスタンスを使用（重複初期化を避ける）
    // Lenisの初期化はLayout.astroで行われる

    // 初期状態設定
    gsap.set(coreCopyElement, {
      opacity: 0,
      scale: 0.9,
      y: 30,
    });

    // スクロールトリガー作成
    const tl = ScrollTrigger.create({
      trigger: sectionElement,
      start: "top center",
      end: "bottom center",
      scrub: 0.5, // 1.0から0.5に変更して、より軽量に
      onUpdate: ({ progress }) => {
        // スクロール進行度に応じてフェードイン
        gsap.to(coreCopyElement, {
          opacity: Math.min(1, progress * 2),
          scale: 0.9 + progress * 0.1,
          y: 30 - progress * 30,
          duration: 0.05, // 0.1から0.05に短縮
        });
      },
      onEnter: () => {
        // 完全表示
        gsap.to(coreCopyElement, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
        });
      },
      onLeave: () => {
        // フェードアウト
        gsap.to(coreCopyElement, {
          opacity: 0.3,
          scale: 0.95,
          y: -10,
          duration: 0.8,
          ease: "power2.inOut",
        });
      },
    });

    // prefers-reduced-motion対応
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(coreCopyElement, {
        opacity: 1,
        scale: 1,
        y: 0,
      });
      tl.disable();
    }

    return () => {
      tl.kill();
    };
  });

  onDestroy(() => {
    // Lenisの破棄はLayout.astroで行われる
  });
</script>

<section
  bind:this={sectionElement}
  id="core"
  class="relative flex min-h-screen items-center justify-center bg-blue-900"
  aria-labelledby="core-copy-heading"
>
  <!-- 背景装飾 -->
  <div class="absolute inset-0 -z-10 opacity-10">
    <div
      class="absolute left-1/4 top-1/4 h-96 w-96 rounded-full border border-white"
    />
    <div
      class="absolute bottom-1/4 right-1/4 h-64 w-64 rotate-45 transform border border-white"
    />
    <div
      class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-white opacity-30"
    />
  </div>

  <!-- コアコピー -->
  <div
    bind:this={coreCopyElement}
    id="core-copy"
    class="mx-auto max-w-4xl px-4 text-center"
  >
    <h2
      id="core-copy-heading"
      class="md:text-8xl lg:text-9xl tracking-tighter mb-8 font-heading text-5xl font-black leading-none text-white"
      style="letter-spacing: -0.05em;"
    >
      ENJOY YOUR WORLD.
    </h2>

    <div class="mt-12 opacity-80">
      <div class="inline-block rounded-full border-2 border-white/40 px-8 py-4">
        <span class="tracking-widest font-heading text-xl font-bold text-white">
          JOYZO
        </span>
      </div>
    </div>
  </div>
</section>

<style>
  /* パフォーマンス最適化 */
  section {
    will-change: transform, opacity;
    transform: translateZ(0);
  }

  /* スムーズなアニメーション */
  * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* グラデーション背景 */
  .bg-gradient-to-br {
    background: linear-gradient(to bottom right, #1e3a8a, #1e40af, #1e3a8a);
  }
</style>
