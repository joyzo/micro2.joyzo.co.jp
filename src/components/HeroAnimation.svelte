<script lang="ts">
  import { onMount } from 'svelte';
  
  // CMS管理を想定した単語リスト設定
  const wordSequence = {
    left: ['ENJOY', 'DX', '未来', '働き方', 'ENJOY'],
    right: ['IT', 'TECH', 'LIFE', '楽しめ', 'YOUR']
  } as const;
  
  // アニメーション状態管理
  let currentStep = 0;
  let leftIndex = 0;
  let rightIndex = 0;
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
  
  // 新しいアニメーション用の状態
  let centerText = '?';
  let centerTextBlink = false;
  let leftContainerPosition = 'center'; // 'center' | 'left'
  let centerTextPosition = 'right'; // 'center' | 'right'
  
  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function startInitialAnimation(): Promise<void> {
    // Phase 1: 左のコンテナと中央のコンテナを画面中央に配置
    leftContainerOpacity = 1;
    centerXOpacity = 1;
    leftContainerPosition = 'center';
    centerTextPosition = 'right'; // スタート時点では右に3em移動
    await sleep(200);
    
    // Phase 2: 左側に「ENJOY」が現れる
    leftText = 'ENJOY';
    leftOpacity = 1;
    await sleep(300);
    
    // Phase 3: 中央に「?」が現れる
    centerText = '?';
    centerXOpacity = 1;
    await sleep(200);
    
    // Phase 4: クエスチョンマークを点滅させる
    centerTextBlink = true;
    await sleep(2000); // 2秒間点滅
    
    // Phase 5: 点滅を停止し、元の位置に移動
    centerTextBlink = false;
    centerXOpacity = 0;
    leftOpacity = 0;
    await sleep(200);
    
    // Phase 6: 元の位置に移動
    leftContainerPosition = 'left';
    centerTextPosition = 'center'; // Enjoyが左に移動するタイミングで中央に戻す
    leftText = 'ENJOY';
    leftOpacity = 1;
    centerText = '×';
    centerXOpacity = 1;
    await sleep(300);
    
    // Phase 7: 右のコンテナを表示
    rightContainerOpacity = 1;
    rightText = 'IT';
    rightOpacity = 1;
    await sleep(200);
    
    // Phase 8: 通常のアニメーション開始
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
    console.log('Current step:', currentStep, 'leftIndex:', leftIndex, 'rightIndex:', rightIndex);
    
    // 左右のテキストを同時に変更
    const leftWord = wordSequence.left[leftIndex];
    const rightWord = wordSequence.right[rightIndex];
    
    // 左側のテキストを変更
    if (leftWord) {
      console.log('Changing left word to:', leftWord);
      await changeWord(leftWord, true, 'up');
    }
    
    // 右側のテキストを変更
    if (rightWord) {
      console.log('Changing right word to:', rightWord);
      await changeWord(rightWord, false, 'down');
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
      const delay = currentStep <= 2 ? 400 : 600;
      animationTimeout = setTimeout(animateStep, delay);
    } else {
      isAnimating = false;
      // アニメーションが終了したら強制的にshowFinalAnimationを呼ぶ
      if (!hasMoreLeft && !hasMoreRight) {
        console.log('Animation ended, calling showFinalAnimation');
        await showFinalAnimation();
      }
    }
  }
  
  async function showFinalAnimation(): Promise<void> {
    console.log('showFinalAnimation started');
    // 中央の×をフェードアウト
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
    finalLeftText = wordSequence.left[wordSequence.left.length - 1] || 'ENJOY';  // 最後のENJOY
    finalCenterText = wordSequence.right[wordSequence.right.length - 1] || 'YOUR';  // 最後のYOUR
    finalRightText = 'WORLD';  // 最終的なWORLDは固定
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
    const nextSection = document.querySelector('#inverted-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
</script>

<section id="hero-section" class="relative h-screen flex items-center justify-center bg-blue-900 overflow-hidden" style="z-index: 3;">
  <!-- 背景の装飾 -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-20 left-20 w-64 h-64 border border-white rounded-full"></div>
    <div class="absolute bottom-20 right-20 w-32 h-32 border border-white transform rotate-45"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full opacity-30"></div>
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
        class="w-[calc(50vw-2rem)] max-w-[550px] min-w-[330px] flex justify-end pr-6 md:pr-8 lg:pr-12 h-[calc(15vh+2rem)] transition-all duration-1000"
        style="
          opacity: {leftContainerOpacity};
          transform: {leftContainerPosition === 'center' ? 'translateX(25%)' : 'translateX(0)'};
        "
      >
        <!-- 経線（赤）: border-2 border-red-500 -->
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
      
      <!-- 中央の×マーク（固定位置） -->
      <div 
        class="absolute left-1/2 top-1/2 font-bold text-accent z-10 transition-all duration-1000"
        style="
          font-size: clamp(2.2rem, 8.8vw, 13.2rem);
          opacity: {centerXOpacity};
          transform: {centerTextPosition === 'right' ? 'translateX(4em) translateY(-50%)' : 'translateX(-50%) translateY(-50%)'};
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
        class="w-[calc(50vw-2rem)] max-w-[550px] min-w-[330px] flex justify-start pl-6 md:pl-8 lg:pl-12 h-[calc(15vh+2rem)] transition-opacity duration-1000"
        style="opacity: {rightContainerOpacity};"
      >
        <!-- 経線（青）: border-2 border-blue-500 -->
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
    <!-- <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light opacity-80 mb-12">
      JOYZO
    </div> -->
  </div>
  
  <!-- スクロールボタン -->
  <button 
    on:click={scrollToNext}
    class="group absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
  >
    <span class="text-xs font-english">SCROLL</span>
    <div class="w-4 h-6 border border-white rounded-full flex justify-center">
      <div class="w-0.5 h-2 bg-white rounded-full mt-1 animate-bounce"></div>
    </div>
  </button>
</section>