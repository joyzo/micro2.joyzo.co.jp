<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let openingPhase = 0; // 0: 導入, 1: 移行, 2: 演出, 3: 完了
  let showOpening = true;
  let leftWord = "ENJOY";
  let rightWord = "";
  let centerSymbol = "?";
  let isLeftChanging = false;
  let isRightChanging = false;
  let isVisible = false;
  let isFadedOut = false; // フェイドアウト完了フラグ

  const keywordPairs = [
    { left: "ENJOY", right: "IT" },
    { left: "DX", right: "TECH" },
    { left: "ENJOY", right: "YOUR" },
  ];

  let openingInterval: NodeJS.Timeout | undefined;
  let keywordInterval: NodeJS.Timeout | undefined;

  onMount(() => {
    const openingSequence = async () => {
      // ①導入: ENJOY? を1.5秒表示
      setTimeout(() => {
        openingPhase = 1; // 移行フェーズ開始
        setTimeout(() => {
          centerSymbol = "×";
          rightWord = "IT";
        }, 300);
      }, 1500);

      // ②演出開始: 2.5秒後から左右交互に入れ替え
      setTimeout(() => {
        openingPhase = 2;
        let pairIndex = 0;
        let isLeftTurn = false; // 左から開始

        keywordInterval = setInterval(() => {
          if (isLeftTurn) {
            isLeftChanging = true;
            setTimeout(() => {
              pairIndex = (pairIndex + 1) % keywordPairs.length;
              leftWord = keywordPairs[pairIndex]?.left || "";
              setTimeout(() => (isLeftChanging = false), 200);
            }, 50);
          } else {
            isRightChanging = true;
            setTimeout(() => {
              rightWord = keywordPairs[pairIndex]?.right || "";
              setTimeout(() => (isRightChanging = false), 200);
            }, 50);
          }

          isLeftTurn = !isLeftTurn;

          if (pairIndex === keywordPairs.length - 1 && isLeftTurn) {
            // 入換演出終了：ENJOY ✗ YOUR の状態で1秒キープ
            setTimeout(() => {
              clearInterval(keywordInterval);
              openingPhase = 3; // 最終演出フェーズ
              leftWord = "ENJOY";
              rightWord = "YOUR";

              // 1秒キープ後に移動無しでフェイドアウト
              setTimeout(() => {
                isFadedOut = true;
                setTimeout(() => {
                  showOpening = false;
                  isVisible = true;
                }, 500); // フェイドアウトアニメーション完了後に切り替え
              }, 1000);
            }, 500);
          }
        }, 600); // 元のスピードに戻す
      }, 2500);
    };

    openingSequence();

    return () => {
      if (openingInterval) clearTimeout(openingInterval);
      if (keywordInterval) clearInterval(keywordInterval);
    };
  });

  onDestroy(() => {
    if (openingInterval) clearTimeout(openingInterval);
    if (keywordInterval) clearInterval(keywordInterval);
  });
</script>

{#if showOpening}
  <div class="flex min-h-screen items-center justify-center bg-black px-4">
    <div
      class="relative flex h-32 w-full max-w-4xl items-center justify-center"
    >
      <!-- 左側のテキスト -->
      <div
        class="absolute left-0 flex items-center justify-end overflow-hidden"
        style="width: 40%;"
      >
        <div
          class="tracking-tighter font-heading text-[2.5rem] font-black text-white transition-all duration-300 ease-linear sm:text-[3rem] md:text-[4rem] lg:text-[5rem] {isLeftChanging
            ? 'animate-slide-down'
            : ''} {openingPhase === 3 ? 'animate-fade-out' : ''}"
          style="opacity: {isFadedOut ? 0 : 1};"
        >
          {leftWord}
        </div>
      </div>

      <!-- 中央のシンボル -->
      <div
        class="absolute left-1/2 -translate-x-1/2 transform text-[2.5rem] font-black text-blue-400 transition-all duration-500 ease-linear sm:text-[3rem] md:text-[4rem] lg:text-[5rem] {openingPhase ===
        3
          ? 'animate-fade-out'
          : ''}"
        style="opacity: {isFadedOut ? 0 : 1};"
      >
        {#if centerSymbol === "?"}
          ?
        {:else}
          <svg
            class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {/if}
      </div>

      <!-- 右側のテキスト -->
      <div
        class="absolute right-0 flex items-center justify-start overflow-hidden"
        style="width: 40%;"
      >
        <div
          class="tracking-tighter font-heading text-[2.5rem] font-black text-blue-400 transition-all duration-300 ease-linear sm:text-[3rem] md:text-[4rem] lg:text-[5rem] {rightWord
            ? 'opacity-100'
            : 'opacity-0'} {isRightChanging
            ? 'animate-slide-up'
            : ''} {openingPhase === 3 ? 'animate-fade-out' : ''}"
          style="opacity: {isFadedOut ? 0 : rightWord ? 1 : 0};"
        >
          {rightWord}
        </div>
      </div>
    </div>
  </div>
{:else}
  <section
    class="relative flex h-screen items-center justify-center overflow-hidden bg-black"
  >
    <div class="absolute inset-0">
      <img
        src="/src/images/top/image_001.jpg"
        alt="JOYZOの社員たち"
        class="h-full w-full object-cover opacity-30"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-4 text-center text-white">
      <div class="mb-12">
        <h1
          class="tracking-tighter duration-600 mb-4 font-heading text-[6rem] font-black leading-[0.8] text-white transition-all md:text-[8rem] lg:text-[12rem] xl:text-[14rem] {isVisible
            ? 'animate-hero-slide-stagger-1 translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'}"
        >
          ENJOY
        </h1>
        <h1
          class="tracking-tighter duration-600 mb-4 font-heading text-[6rem] font-black leading-[0.8] transition-all md:text-[8rem] lg:text-[12rem] xl:text-[14rem] {isVisible
            ? 'animate-hero-slide-stagger-2 translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'}"
        >
          <span class="text-white">YOUR</span>
        </h1>
        <h1
          class="tracking-tighter duration-600 mb-12 font-heading text-[6rem] font-black leading-[0.8] text-blue-400 transition-all md:text-[8rem] lg:text-[12rem] xl:text-[14rem] {isVisible
            ? 'animate-hero-slide-stagger-3 translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'}"
        >
          WORLD.
        </h1>
      </div>

      <div
        class="duration-600 mb-12 max-w-3xl transition-all {isVisible
          ? 'animate-wave-slide-in animate-delay-800 translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'}"
      >
        <p class="text-lg font-medium leading-relaxed text-gray-300 md:text-xl">
          革新的なテクノロジーと創造性で新しい価値を生み出し続ける
        </p>
      </div>

      <div
        class="duration-600 transition-all {isVisible
          ? 'animate-scale-in animate-delay-1000 translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'}"
      >
        <div
          class="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/company"
            class="rounded-none border-2 border-white px-12 py-5 text-lg font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
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
      </div>

      <div
        class="opacity-0 transition-all delay-700 duration-1000"
        class:opacity-100={isVisible}
        class:translate-y-0={isVisible}
        class:translate-y-8={!isVisible}
      >
        <a
          href="/aboutus"
          class="inline-block text-xl text-gray-300 transition-colors duration-300 hover:text-white"
        >
          JOYZO Manifesto をもっと見る →
        </a>
      </div>
    </div>

    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce"
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
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
{/if}

<style>
  @keyframes slide-down {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    50% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    50% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes hero-slide-stagger-1 {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes hero-slide-stagger-2 {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes hero-slide-stagger-3 {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes wave-slide-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scale-in {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-slide-down {
    animation: slide-down 0.3s ease-in-out;
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-in-out;
  }

  .animate-fade-out {
    animation: fade-out 0.5s ease-out;
  }

  .animate-hero-slide-stagger-1 {
    animation: hero-slide-stagger-1 0.6s ease-out;
  }

  .animate-hero-slide-stagger-2 {
    animation: hero-slide-stagger-2 0.6s ease-out;
  }

  .animate-hero-slide-stagger-3 {
    animation: hero-slide-stagger-3 0.6s ease-out;
  }

  .animate-wave-slide-in {
    animation: wave-slide-in 0.6s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 0.6s ease-out;
  }

  .animate-delay-800 {
    animation-delay: 0.8s;
  }

  .animate-delay-1000 {
    animation-delay: 1s;
  }
</style>
