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
  let isRotating = false; // ?から×への回転アニメーション用

  const keywordPairs = [
    { left: "DX", right: "CREATIVE" },
    { left: "AI", right: "IT" },
    { left: "TECH", right: "WORK" },
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
          isRotating = true;
          centerSymbol = "×";
          rightWord = "IT";
          // 回転アニメーション終了
          setTimeout(() => {
            isRotating = false;
          }, 500);
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
  <div class="flex min-h-screen items-center justify-center bg-white px-4">
    <div
      class="relative flex h-32 w-full max-w-4xl items-center justify-center"
    >
      <!-- 左側のテキスト -->
      <div
        class="absolute left-0 flex items-center justify-end overflow-hidden"
        style="width: 45%;"
      >
        <div
          class="tracking-tighter font-heading text-[2.5rem] font-black text-black transition-all duration-500 ease-out sm:text-[3rem] md:text-[4rem] lg:text-[5rem] {isLeftChanging
            ? 'animate-slot-rollup-left'
            : ''} {openingPhase === 3 ? 'animate-fade-out' : ''}"
          style="opacity: {isFadedOut ? 0 : 1};"
        >
          {leftWord}
        </div>
      </div>

      <!-- 中央のシンボル -->
      <div
        class="absolute left-1/2 -translate-x-1/2 transform text-[2.5rem] font-black text-gray-600 transition-all duration-500 ease-linear sm:text-[3rem] md:text-[4rem] lg:text-[5rem] {openingPhase ===
        3
          ? 'animate-fade-out'
          : ''} {isRotating ? 'animate-rotate-symbol' : ''}"
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
        style="width: 45%;"
      >
        <div
          class="tracking-tighter font-heading text-[2.5rem] font-black text-gray-600 transition-all duration-500 ease-out sm:text-[3rem] md:text-[4rem] lg:text-[5rem] {rightWord
            ? 'opacity-100'
            : 'opacity-0'} {isRightChanging
            ? 'animate-slot-rollup-right'
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
    class="relative flex min-h-screen items-center justify-center bg-white"
  >
    <div class="relative z-10 mx-auto max-w-7xl px-4">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- 左側：ENJOY YOUR WORLD -->
        <div class="order-1 lg:order-1">
          <div class="mb-8 overflow-hidden">
            <div class="hero-text-container">
              <h1
                class="tracking-tighter font-heading text-[4rem] font-black leading-[0.9] text-black md:text-[5rem] lg:text-[7rem] xl:text-[8rem] {isVisible
                  ? 'animate-slot-final-1'
                  : 'opacity-0'}"
              >
                ENJOY
              </h1>
              <h1
                class="tracking-tighter font-heading text-[4rem] font-black leading-[0.9] md:text-[5rem] lg:text-[7rem] xl:text-[8rem] {isVisible
                  ? 'animate-slot-final-2'
                  : 'opacity-0'}"
              >
                <span class="font-heading text-black">YOUR</span>
              </h1>
              <h1
                class="tracking-tighter font-heading text-[4rem] font-black leading-[0.9] text-gray-600 md:text-[5rem] lg:text-[7rem] xl:text-[8rem] {isVisible
                  ? 'animate-slot-final-3'
                  : 'opacity-0'}"
              >
                WORLD.
              </h1>
            </div>
          </div>
        </div>

        <!-- 右側：説明文とボタン -->
        <div class="order-2 lg:order-2">
          <div class="mb-8 {isVisible ? 'opacity-100' : 'opacity-0'}">
            <p
              class="text-lg font-medium leading-relaxed text-gray-600 md:text-xl"
            >
              ジョイゾーのジョイはエンジョイのジョイ。
            </p>
          </div>

          <div class="mb-8 {isVisible ? 'opacity-100' : 'opacity-0'}">
            <div
              class="mb-8 flex flex-col items-start justify-start gap-4 sm:flex-row"
            >
              <a
                href="/company"
                class="rounded-none border-2 border-black px-8 py-4 text-lg font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white"
              >
                会社概要を見る
              </a>
              <a
                href="https://joyzo.co.jp"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-none bg-gray-800 px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
              >
                サービスを見る
              </a>
            </div>
          </div>

          <div class={isVisible ? "opacity-100" : "opacity-0"}>
            <a
              href="/aboutus"
              class="inline-block text-lg text-gray-500 transition-colors duration-300 hover:text-black"
            >
              JOYZO Manifesto をもっと見る →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  @keyframes slot-rollup-left {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes slot-rollup-right {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes slot-final-1 {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slot-final-2 {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slot-final-3 {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
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

  @keyframes rotate-symbol {
    0% {
      transform: translateX(-50%) rotate(0deg);
    }
    100% {
      transform: translateX(-50%) rotate(180deg);
    }
  }

  .animate-slot-rollup-left {
    animation: slot-rollup-left 0.6s ease-out;
  }

  .animate-slot-rollup-right {
    animation: slot-rollup-right 0.6s ease-out;
  }

  .animate-slot-final-1 {
    animation: slot-final-1 0.6s ease-out;
  }

  .animate-slot-final-2 {
    animation: slot-final-2 0.6s ease-out;
    animation-delay: 0.1s;
  }

  .animate-slot-final-3 {
    animation: slot-final-3 0.6s ease-out;
    animation-delay: 0.2s;
  }

  .animate-fade-out {
    animation: fade-out 0.5s ease-out;
  }

  .hero-text-container h1 {
    margin-bottom: 1rem;
  }

  .animate-wave-slide-in {
    animation: wave-slide-in 0.6s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 0.6s ease-out;
  }

  .animate-rotate-symbol {
    animation: rotate-symbol 0.5s ease-in-out;
  }

  .animate-delay-800 {
    animation-delay: 0.8s;
  }

  .animate-delay-1000 {
    animation-delay: 1s;
  }
</style>
