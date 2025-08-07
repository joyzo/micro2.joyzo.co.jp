<script lang="ts">
  import { onMount } from 'svelte';
  
  // CMS管理を想定した単語リスト設定
  const wordSequence = {
    left: ['ENJOY', 'DX', '未来', '働き方', 'ENJOY'],
    right: ['IT', 'TECH', 'LIFE', 'YOUR', 'WORLD']
  } as const;
  
  // アニメーション状態管理
  let currentStep = 0;
  let isAnimating = false;
  let animationTimeout: ReturnType<typeof setTimeout> | undefined;
  
  // 左右テキスト関連（左右組み合わせ用）
  let leftText: string = '';
  let rightText: string = '';
  let leftOpacity = 0;
  let rightOpacity = 0;
  let leftTransform = 'translateY(0)';
  let rightTransform = 'translateY(0)';
  
  // コンテナ表示関連
  let leftContainerOpacity = 0;
  let rightContainerOpacity = 0;
  let centerXOpacity = 0;
  
  // 最終状態（3つの枠用）
  let finalLeftText = '';
  let finalCenterText = '';
  let finalRightText = '';
  let finalLeftOpacity = 0;
  let finalCenterOpacity = 0;
  let finalRightOpacity = 0;
  let showFinalText = false;
  
  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function startInitialAnimation(): Promise<void> {
    // Phase 1: 左右のコンテナが現れる
    leftContainerOpacity = 1;
    rightContainerOpacity = 1;
    centerXOpacity = 1;
    await sleep(200);
    
    // Phase 2: 左側に「ENJOY」が現れる
    leftText = 'ENJOY';
    leftOpacity = 1;
    await sleep(200);
    
    // Phase 3: 右側に「IT」が現れる
    rightText = 'IT';
    rightOpacity = 1;
    await sleep(400);
    
    // Phase 4: 通常のアニメーション開始
    startWordAnimation();
  }
  
  function changeWord(newWord: string, isLeft: boolean, direction: 'up' | 'down' = 'up'): Promise<void> {
    return new Promise((resolve) => {
      if (isLeft) {
        leftOpacity = 0;
        leftTransform = direction === 'up' ? 'translateY(-100%)' : 'translateY(100%)';
      } else {
        rightOpacity = 0;
        rightTransform = direction === 'up' ? 'translateY(-100%)' : 'translateY(100%)';
      }
      
      setTimeout(() => {
        if (isLeft) {
          leftText = newWord;
        } else {
          rightText = newWord;
        }
        
        if (isLeft) {
          leftTransform = direction === 'up' ? 'translateY(100%)' : 'translateY(-100%)';
          leftOpacity = 0;
        } else {
          rightTransform = direction === 'up' ? 'translateY(100%)' : 'translateY(-100%)';
          rightOpacity = 0;
        }
        
        setTimeout(() => {
          if (isLeft) {
            leftOpacity = 1;
            leftTransform = 'translateY(0)';
          } else {
            rightOpacity = 1;
            rightTransform = 'translateY(0)';
          }
          resolve();
        }, 50);
      }, 200);
    });
  }
  
  async function animateStep(): Promise<void> {
    if (currentStep >= wordSequence.left.length) {
      // 最終段階：ENJOY YOUR WORLD
      await showFinalAnimation();
      return;
    }
    
    currentStep++;
    
    // 右側を先に変更、その後左側を変更
    if (currentStep % 2 === 1) {
      // 奇数ステップ：右側を先に変更
      const rightWord = wordSequence.right[currentStep];
      if (rightWord) {
        await changeWord(rightWord, false, 'down');
      }
    } else {
      // 偶数ステップ：左側を変更
      const leftWord = wordSequence.left[currentStep];
      if (leftWord) {
        await changeWord(leftWord, true, 'up');
      }
    }
    
    if (isAnimating && currentStep < wordSequence.left.length) {
      // 緩急をつける：最初は早く、後半は少し遅く
      const delay = currentStep <= 2 ? 400 : 600;
      animationTimeout = setTimeout(animateStep, delay);
    } else {
      isAnimating = false;
    }
  }
  
  async function showFinalAnimation(): Promise<void> {
    // 中央の✖をフェードアウト
    centerXOpacity = 0;
    await sleep(200);
    
    // 左右のテキストをフェードアウト
    leftOpacity = 0;
    rightOpacity = 0;
    await sleep(200);
    
    // コンテナをフェードアウト
    leftContainerOpacity = 0;
    rightContainerOpacity = 0;
    await sleep(200);
    
    // 最終テキストを3つの枠で表示
    showFinalText = true;
    finalLeftText = 'ENJOY';
    finalCenterText = 'YOUR';
    finalRightText = 'WORLD';
    finalLeftOpacity = 1;
    finalCenterOpacity = 1;
    finalRightOpacity = 1;
  }
  
  function startWordAnimation(): void {
    if (isAnimating) return;
    
    isAnimating = true;
    currentStep = 0;
    
    // 初期状態は既に設定されているので、そのまま開始
    animationTimeout = setTimeout(animateStep, 1000);
  }
  
  function startAnimation(): void {
    startInitialAnimation();
  }
  
  onMount(() => {
    console.log('HeroAnimation mounted!!');
    const initialTimeout = setTimeout(() => {
      startAnimation();
    }, 1000);
    
    return () => {
      console.log('HeroAnimation unmounted!!');
      clearTimeout(initialTimeout);
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  });
  
  const scrollToNext = (): void => {
    const nextSection = document.querySelector('#about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
</script>

<section class="relative h-screen flex items-center justify-center bg-gradient-to-br from-main via-main to-secondary overflow-hidden">
  <!-- 背景のグラデーション装飾 -->
  <div class="absolute inset-0 opacity-20">
    <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
  </div>
  
  <!-- 背景の装飾要素 -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
    <div class="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
    <div class="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
    <div class="absolute top-1/3 right-1/3 w-20 h-20 border border-white rounded-full"></div>
  </div>
  
  <!-- メインテキスト -->
  <div class="relative z-10 text-center text-white w-full">
    <!-- 最終テキスト（ENJOY YOUR WORLD） -->
    {#if showFinalText}
      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 flex items-center space-x-8 md:space-x-12 lg:space-x-16">
        <div 
          class="font-bold font-english transition-all duration-500 ease-in-out"
          style="
            opacity: {finalLeftOpacity}; 
            font-size: clamp(2.2rem, 8.8vw, 13.2rem);
            line-height: 0.9;
            font-family: 'Murecho', 'Noto Sans JP', sans-serif;
          "
        >
          {finalLeftText}
        </div>
        <div 
          class="font-bold font-english transition-all duration-500 ease-in-out"
          style="
            opacity: {finalCenterOpacity}; 
            font-size: clamp(2.2rem, 8.8vw, 13.2rem);
            line-height: 0.9;
            font-family: 'Murecho', 'Noto Sans JP', sans-serif;
          "
        >
          {finalCenterText}
        </div>
        <div 
          class="font-bold font-english transition-all duration-500 ease-in-out"
          style="
            opacity: {finalRightOpacity}; 
            font-size: clamp(2.2rem, 8.8vw, 13.2rem);
            line-height: 0.9;
            font-family: 'Murecho', 'Noto Sans JP', sans-serif;
          "
        >
          {finalRightText}
        </div>
      </div>
    {/if}
    
    <!-- 左右のテキストコンテナ -->
    <div class="relative flex items-center justify-center mb-8">
      <!-- 左側のテキストコンテナ（固定幅） -->
      <div 
        class="w-[calc(50vw-2rem)] max-w-[550px] min-w-[330px] flex justify-end pr-4 md:pr-6 lg:pr-8 h-[calc(15vh+2rem)] transition-opacity duration-1000"
        style="opacity: {leftContainerOpacity};"
      >
        <div class="overflow-hidden text-right w-full flex items-center justify-end">
          <div 
            class="font-bold font-english transition-all duration-300 ease-in-out w-full whitespace-nowrap"
            style="
              transform: {leftTransform}; 
              opacity: {leftOpacity}; 
              font-size: clamp(2.2rem, 8.8vw, 13.2rem);
              line-height: 0.9;
              font-family: 'Murecho', 'Noto Sans JP', sans-serif;
            "
          >
            {leftText}
          </div>
        </div>
      </div>
      
      <!-- 中央の✖マーク（固定位置） -->
      <div 
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-accent z-10 transition-opacity duration-1000"
        style="
          font-size: clamp(1.65rem, 4.4vw, 6.6rem);
          opacity: {centerXOpacity};
        "
      >
        ✖
      </div>
      
      <!-- 右側のテキストコンテナ（左側と同じ幅） -->
      <div 
        class="w-[calc(50vw-2rem)] max-w-[550px] min-w-[330px] flex justify-start pl-4 md:pl-6 lg:pl-8 h-[calc(15vh+2rem)] transition-opacity duration-1000"
        style="opacity: {rightContainerOpacity};"
      >
        <div class="overflow-hidden text-left w-full flex items-center justify-start">
          <div 
            class="font-bold font-english transition-all duration-300 ease-in-out w-full whitespace-nowrap"
            style="
              transform: {rightTransform}; 
              opacity: {rightOpacity}; 
              font-size: clamp(2.2rem, 8.8vw, 13.2rem);
              line-height: 0.9;
              font-family: 'Murecho', 'Noto Sans JP', sans-serif;
            "
          >
            {rightText}
          </div>
        </div>
      </div>
    </div>
    
    <!-- サブタイトル -->
    <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light opacity-80 mb-12">
      JOYZO
    </div>
    
    <!-- スクロールボタン -->
    <button 
      on:click={scrollToNext}
      class="group flex flex-col items-center space-y-2 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
    >
      <span class="text-sm font-english">SCROLL</span>
      <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
        <div class="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
      </div>
    </button>
  </div>
</section>