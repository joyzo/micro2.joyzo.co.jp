<script>
  import { onMount, onDestroy } from "svelte";

  export let message;
  export let index;
  export let isLast = false;

  let sectionElement;
  let catchElement;
  let leadElement;
  let imageElement;

  onMount(async () => {
    // クライアントサイドでのみGSAPを読み込み
    if (typeof window === "undefined") return;

    const { default: gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger.js");

    // GSAP ScrollTrigger プラグイン登録
    gsap.registerPlugin(ScrollTrigger);

    // 初期状態設定
    gsap.set(catchElement, {
      opacity: 0,
      y: 30,
    });
    gsap.set(leadElement, {
      opacity: 0,
      y: 20,
    });
    if (imageElement) {
      gsap.set(imageElement, {
        opacity: 0,
        scale: 0.95,
      });
    }

    // スクロールトリガー作成
    const tl = ScrollTrigger.create({
      trigger: sectionElement,
      start: "top 75%",
      end: "bottom 15%",
      scrub: 1.5,
      onEnter: () => {
        // キャッチフレーズ：シンプルなフェードイン
        gsap.to(catchElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        // リード文：少し遅延でフェードイン
        gsap.to(leadElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        });

        // 画像：さらに遅延でフェードイン
        if (imageElement) {
          gsap.to(imageElement, {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power2.out",
            delay: 0.4,
          });
        }
      },
      onLeave: () => {
        // 要素を少し薄くする（完全に消さない）
        gsap.to([catchElement, leadElement, imageElement], {
          opacity: 0.3,
          duration: 0.5,
          ease: "power2.inOut",
        });
      },
      onEnterBack: () => {
        // 戻ってきた時の再表示
        gsap.to(catchElement, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(leadElement, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
        if (imageElement) {
          gsap.to(imageElement, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2,
          });
        }
      },
    });

    // prefers-reduced-motion対応
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([catchElement, leadElement, imageElement], {
        opacity: 1,
        y: 0,
        scale: 1,
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
  class="relative flex min-h-screen items-center justify-center overflow-hidden"
  class:bg-white={index % 2 === 0}
  class:bg-blue-50={index % 2 === 1}
  aria-labelledby="story-heading-{index}"
>
  <!-- 背景装飾（より控えめに） -->
  <div class="opacity-3 absolute inset-0 -z-10">
    <div
      class="absolute left-32 top-32 h-48 w-48 rounded-full border border-current opacity-20"
    />
    <div
      class="absolute bottom-32 right-32 h-24 w-24 rotate-45 transform border border-current opacity-20"
    />
  </div>

  <div class="container mx-auto max-w-7xl px-8 text-center md:px-16">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- 左側：テキストコンテンツ -->
      <div class="order-2 lg:order-1">
        <!-- キャッチフレーズ -->
        <div bind:this={catchElement} class="relative mb-8 w-full">
          <h2
            id="story-heading-{index}"
            class="md:text-7xl lg:text-8xl xl:text-9xl font-heading text-5xl font-bold leading-tight"
            class:text-blue-900={index % 2 === 0}
            class:text-blue-800={index % 2 === 1}
            style="letter-spacing: -0.05em;"
          >
            {message.catch}
          </h2>
        </div>

        <!-- リード文 -->
        <div bind:this={leadElement} class="mx-auto mt-8 max-w-2xl lg:mx-0">
          {#each message.body as paragraph}
            <p
              class="mb-4 text-lg leading-relaxed text-gray-700 last:mb-0 md:text-xl"
            >
              {paragraph}
            </p>
          {/each}

          <!-- タグライン -->
          <div class="mt-8">
            <span
              class="tracking-wider inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
            >
              {message.tagline}
            </span>
          </div>
        </div>
      </div>

      <!-- 右側：画像 -->
      {#if message.image}
        <div class="order-1 lg:order-2">
          <div bind:this={imageElement} class="group relative">
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={message.image}
                alt={message.imageAlt || ""}
                class="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <!-- オーバーレイ効果 -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>

            <!-- 装飾的な要素 -->
            <div
              class="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-blue-500 opacity-60"
            />
            <div
              class="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-blue-300 opacity-40"
            />
          </div>
        </div>
      {/if}
    </div>

    <!-- 最後のセクション用の特別な表示 -->
    {#if isLast}
      <div class="mt-20 text-center">
        <div
          class="inline-block rounded-full border-2 border-blue-600 px-10 py-5"
        >
          <span class="tracking-wider text-xl font-bold text-blue-600">
            JOYZO
          </span>
        </div>
      </div>
    {/if}
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

  /* 画像のホバー効果 */
  img {
    will-change: transform;
  }
</style>
