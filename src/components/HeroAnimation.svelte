<script lang="ts">
  import { onMount } from "svelte";

  // CMS管理を想定した単語リスト設定
  const wordSequence = {
    left: ["ENJOY", "DX", "ENJOY"],
    right: ["IT", "TECH", "YOUR"],
  } as const;

  // アニメーション状態管理
  let currentStep = 0;
  let leftIndex = 0;
  let rightIndex = 0;
  let isAnimating = false;
  let animationTimeout: ReturnType<typeof setTimeout> | undefined;

  // 左右テキスト関連（左右組み合わせ用）
  let leftText: string = "";
  let rightText: string = "";
  let leftOpacity = 0;
  let rightOpacity = 0;
  let leftTransform = "translateY(0)";
  let rightTransform = "translateY(0)";

  // コンテナ表示関連
  let leftContainerOpacity = 0;
  let rightContainerOpacity = 0;
  let centerXOpacity = 0;

  // 最終状態（3つの枠用）
  let finalLeftText = "";
  let finalCenterText = "";
  let finalRightText = "";
  let finalLeftOpacity = 0;
  let finalCenterOpacity = 0;
  let finalRightOpacity = 0;
  let showFinalText = false;

  // 新しいアニメーション用の状態
  let centerText = "?";
  let centerTextBlink = false;
  let leftContainerPosition = "center"; // 'center' | 'left'
  let centerTextPosition = "right"; // 'center' | 'right'

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function startInitialAnimation(): Promise<void> {
    // Phase 1: 左のコンテナと中央のコンテナを画面中央に配置
    leftContainerOpacity = 1;
    centerXOpacity = 1;
    leftContainerPosition = "center";
    centerTextPosition = "right"; // スタート時点では右に3em移動
    await sleep(200);

    // Phase 2: 左側に「ENJOY」が現れる
    leftText = "ENJOY";
    leftOpacity = 1;
    await sleep(300);

    // Phase 3: 中央に「?」が現れる
    centerText = "?";
    centerXOpacity = 1;
    await sleep(200);

    // Phase 4: クエスチョンマークを点滅させる
    centerTextBlink = true;
    await sleep(2000); // 2秒間点滅

    // Phase 5: 点滅を停止し、直接スプレッド開始
    centerTextBlink = false;
    centerXOpacity = 0;
    leftOpacity = 0;
    await sleep(200);

    // Phase 6: 直接スプレッド位置に移動（中央に戻らず）
    leftContainerPosition = "left";
    centerTextPosition = "center";
    leftText = "ENJOY";
    leftOpacity = 1;
    centerText = "×";
    centerXOpacity = 1;
    await sleep(300);

    // Phase 7: 右のコンテナを表示
    rightContainerOpacity = 1;
    rightText = "IT";
    rightOpacity = 1;
    await sleep(200);

    // Phase 8: 通常のアニメーション開始
    startWordAnimation();
  }

  function changeWord(newWord: string, isLeft: boolean): Promise<void> {
    return new Promise((resolve) => {
      if (isLeft) {
        // 左側：上から登場、下に消える
        // 新しいワードを上から登場させる
        leftText = newWord;
        leftTransform = "translateY(-100%)";
        leftOpacity = 1;

        // 同時に古いワードを下に移動させる
        setTimeout(() => {
          leftTransform = "translateY(0)";
          resolve();
        }, 50);
      } else {
        // 右側：下から登場、上に消える
        // 新しいワードを下から登場させる
        rightText = newWord;
        rightTransform = "translateY(100%)";
        rightOpacity = 1;

        // 同時に古いワードを上に移動させる
        setTimeout(() => {
          rightTransform = "translateY(0)";
          resolve();
        }, 50);
      }
    });
  }

  async function animateStep(): Promise<void> {
    console.log(
      "Current step:",
      currentStep,
      "leftIndex:",
      leftIndex,
      "rightIndex:",
      rightIndex
    );

    // 左右のテキストを同時に変更
    const leftWord = wordSequence.left[leftIndex];
    const rightWord = wordSequence.right[rightIndex];

    // 左側のテキストを変更
    if (leftWord) {
      console.log("Changing left word to:", leftWord);
      await changeWord(leftWord, true);
    }

    // 右側のテキストを変更
    if (rightWord) {
      console.log("Changing right word to:", rightWord);
      await changeWord(rightWord, false);
    }

    // インデックスを進める
    leftIndex++;
    rightIndex++;
    currentStep++;

    // 次のステップがあるかチェック
    const hasMoreLeft = leftIndex < wordSequence.left.length;
    const hasMoreRight = rightIndex < wordSequence.right.length;

    if (isAnimating && (hasMoreLeft || hasMoreRight)) {
      // 緩急をつける：最初は早く、後半は少し遅く
      const delay = currentStep <= 1 ? 300 : 400;
      animationTimeout = setTimeout(animateStep, delay);
    } else {
      isAnimating = false;
      // アニメーションが終了したら強制的にshowFinalAnimationを呼ぶ
      if (!hasMoreLeft && !hasMoreRight) {
        console.log("Animation ended, calling showFinalAnimation");
        await showFinalAnimation();
      }
    }
  }

  async function showFinalAnimation(): Promise<void> {
    console.log("showFinalAnimation started");

    // スプレッドアニメーション：左右に分かれる
    leftContainerPosition = "left";
    centerTextPosition = "center";
    await sleep(500);

    // 中央の×をフェードアウト
    centerXOpacity = 0;
    await sleep(200);

    // 左右のテキストをフェードアウト（ゆっくり消す）
    leftOpacity = 0;
    rightOpacity = 0;
    await sleep(800); // ゆっくり消す演出

    // コンテナをフェードアウト
    leftContainerOpacity = 0;
    rightContainerOpacity = 0;
    await sleep(300);

    // 最終テキストを3つの枠で表示
    showFinalText = true;
    finalLeftText = wordSequence.left[wordSequence.left.length - 1] || "ENJOY"; // 最後のENJOY
    finalCenterText =
      wordSequence.right[wordSequence.right.length - 1] || "YOUR"; // 最後のYOUR
    finalRightText = "WORLD"; // 最終的なWORLDは固定
    finalLeftOpacity = 1;
    finalCenterOpacity = 1;
    finalRightOpacity = 1;
  }

  function startWordAnimation(): void {
    if (isAnimating) return;

    isAnimating = true;
    currentStep = 0; // 0から開始して、交互に右側と左側を変更
    leftIndex = 0; // 左側のインデックスをリセット
    rightIndex = 0; // 右側のインデックスをリセット

    // 初期状態は既に設定されているので、そのまま開始
    animationTimeout = setTimeout(animateStep, 1000);
  }

  function startAnimation(): void {
    startInitialAnimation();
  }

  onMount(() => {
    console.log("HeroAnimation mounted!!");
    const initialTimeout = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => {
      console.log("HeroAnimation unmounted!!");
      clearTimeout(initialTimeout);
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  });

  const scrollToNext = (): void => {
    const nextSection = document.querySelector("#inverted-section");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
</script>

<section
  id="hero-section"
  class="relative flex h-screen items-center justify-center overflow-hidden bg-blue-900"
  style="z-index: 3;"
>
  <!-- 背景の装飾 -->
  <div class="absolute inset-0 opacity-10">
    <div
      class="absolute left-20 top-20 h-64 w-64 rounded-full border border-white"
    />
    <div
      class="absolute bottom-20 right-20 h-32 w-32 rotate-45 transform border border-white"
    />
    <div
      class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-white opacity-30"
    />
  </div>

  <!-- メインテキスト -->
  <div class="relative z-10 w-full text-center text-white">
    <!-- 最終テキスト（ENJOY YOUR WORLD） -->
    {#if showFinalText}
      <div
        class="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 transform items-center space-x-8 text-center md:space-x-12 lg:space-x-16"
      >
        <div
          class="font-heading font-black transition-all duration-500 ease-in-out"
          style="
            opacity: {finalLeftOpacity}; 
            font-size: clamp(2.2rem, 8.8vw, 13.2rem);
            line-height: 0.9;
            letter-spacing: -0.1em;
          "
        >
          {finalLeftText}
        </div>
        <div
          class="font-heading font-black transition-all duration-500 ease-in-out"
          style="
            opacity: {finalCenterOpacity}; 
            font-size: clamp(2.2rem, 8.8vw, 13.2rem);
            line-height: 0.9;
            letter-spacing: -0.1em;
          "
        >
          {finalCenterText}
        </div>
        <div
          class="font-heading font-black transition-all duration-500 ease-in-out"
          style="
            opacity: {finalRightOpacity}; 
            font-size: clamp(2.2rem, 8.8vw, 13.2rem);
            line-height: 0.9;
            letter-spacing: -0.1em;
          "
        >
          {finalRightText}
        </div>
      </div>
    {/if}

    <!-- 左右のテキストコンテナ -->
    <div class="relative mb-8 flex items-center justify-center">
      <!-- 左側のテキストコンテナ（固定幅） -->
      <div
        class="flex h-[calc(15vh+2rem)] w-[calc(50vw-2rem)] min-w-[330px] max-w-[550px] justify-end pr-6 transition-all duration-1000 md:pr-8 lg:pr-12"
        style="
          opacity: {leftContainerOpacity};
          transform: {leftContainerPosition === 'center'
          ? 'translateX(25%)'
          : 'translateX(0)'};
        "
      >
        <!-- 経線（赤）: border-2 border-red-500 -->
        <div
          class="flex w-full items-center justify-end overflow-hidden text-right"
        >
          <div
            class="w-full whitespace-nowrap font-heading font-black transition-all duration-300 ease-in-out"
            style="
              transform: {leftTransform}; 
              opacity: {leftOpacity}; 
              font-size: clamp(2.2rem, 8.8vw, 13.2rem);
              line-height: 0.9;
              letter-spacing: -0.1em;
            "
          >
            {leftText}
          </div>
        </div>
      </div>

      <!-- 中央の×マーク（固定位置） -->
      <div
        class="absolute left-1/2 top-1/2 z-10 font-bold text-accent transition-all duration-1000"
        style="
          font-size: clamp(2.2rem, 8.8vw, 13.2rem);
          opacity: {centerXOpacity};
          transform: {centerTextPosition === 'right'
          ? 'translateX(4em) translateY(-50%)'
          : 'translateX(-50%) translateY(-50%)'};
        "
      >
        <!-- 経線（緑）: border-2 border-green-500 -->
        {#if centerTextBlink}
          <span class="animate-pulse">{centerText}</span>
        {:else}
          {centerText}
        {/if}
      </div>

      <!-- 右側のテキストコンテナ（左側と同じ幅） -->
      <div
        class="flex h-[calc(15vh+2rem)] w-[calc(50vw-2rem)] min-w-[330px] max-w-[550px] justify-start pl-6 transition-opacity duration-1000 md:pl-8 lg:pl-12"
        style="opacity: {rightContainerOpacity};"
      >
        <!-- 経線（青）: border-2 border-blue-500 -->
        <div
          class="flex w-full items-center justify-start overflow-hidden text-left"
        >
          <div
            class="w-full whitespace-nowrap font-heading font-black transition-all duration-300 ease-in-out"
            style="
              transform: {rightTransform}; 
              opacity: {rightOpacity}; 
              font-size: clamp(2.2rem, 8.8vw, 13.2rem);
              line-height: 0.9;
              letter-spacing: -0.1em;
            "
          >
            {rightText}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- スクロールボタン -->
  <button
    on:click={scrollToNext}
    class="group absolute bottom-2 left-1/2 flex -translate-x-1/2 transform flex-col items-center space-y-1 text-white opacity-70 transition-opacity duration-300 hover:opacity-100"
  >
    <span class="font-english text-xs">SCROLL</span>
    <div class="flex h-6 w-4 justify-center rounded-full border border-white">
      <div class="mt-1 h-2 w-0.5 animate-bounce rounded-full bg-white" />
    </div>
  </button>
</section>

<style>
  /* パフォーマンス最適化 */
  * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
