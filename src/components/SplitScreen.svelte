<script lang="ts">
  import { onMount } from "svelte";
  import { initScrollAnimations } from "@utils/scrollAnimations";

  let hoveredSide: "left" | "right" | null = null;
  let rightContentFadeProgress = 0; // right side content fade out progress (0-1)
  let rightExpandProgress = 0; // right side expansion progress (0-1)
  let isRightExpanding = false; // right side is expanding
  let leftContentFadeProgress = 0; // left side content fade out progress (0-1)
  let leftExpandProgress = 0; // left side expansion progress (0-1)
  let isLeftExpanding = false; // left side is expanding
  let leftContentFadeOutProgress = 0; // left side content fade out when right expands (0-1)
  let rightContentFadeOutProgress = 0; // right side content fade out when left expands (0-1)
  let shouldReloadOnHidden = false; // タブが非表示になったときにリロードするかどうか
  let splitScreenElement: HTMLElement;
  let scrollProgress = 0; // スクロール進行度 (0-1)
  let currentScrollY = 0; // 現在のスクロール位置
  let virtualScrollY = 0; // 仮想的なスクロール位置（preventDefault中でも更新）
  let lenis: any = null; // Lenisインスタンス
  let hasSnappedToHero = false; // ヒーローセクションにスナップ済みかどうか
  let heroSectionElement: HTMLElement | null = null; // ヒーローセクション要素
  let prevShouldLockScroll = false; // 前回のshouldLockScrollの状態
  
  // Custom cursor state
  let cursorX = 0;
  let cursorY = 0;
  let cursorVisible = false;
  let wave1Delay = 0;
  let wave2Delay = 0;
  let wave3Delay = 0;
  
  // URL parameters for customization
  let leftBgColor = "#2563eb"; // Default: bg-blue-600
  let rightBgColor = "#FFC107"; // Default: current yellow
  let showImages = true; // Default: show images
  
  // Hover colors (10% darker)
  let leftHoverColor = "#1d4ed8"; // bg-blue-700
  let rightHoverColor = "#FFB300"; // current hover

  onMount(() => {
    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    
    const leftBg = params.get("leftBg");
    const rightBg = params.get("rightBg");
    const showImagesParam = params.get("showImages");
    
    if (leftBg) {
      leftBgColor = leftBg.startsWith("#") ? leftBg : `#${leftBg}`;
      leftHoverColor = darkenColor(leftBgColor, 10);
    }
    
    if (rightBg) {
      rightBgColor = rightBg.startsWith("#") ? rightBg : `#${rightBg}`;
      rightHoverColor = darkenColor(rightBgColor, 10);
    }
    
    if (showImagesParam) {
      showImages = showImagesParam === "true";
    }
    
    // Random wave delays for organic feel
    wave1Delay = Math.random() * 2; // 0-2秒
    wave2Delay = 3 + Math.random() * 3; // 3-6秒
    wave3Delay = 6 + Math.random() * 4; // 6-10秒
    
    // Custom cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorVisible = true;
    };
    
    const handleMouseLeave = () => {
      cursorVisible = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // タブが非表示になったときにリロード（右側クリック時のみ）
    const handleVisibilityChange = () => {
      if (document.hidden && shouldReloadOnHidden) {
        setTimeout(() => {
          window.location.reload();
        }, 800);
        shouldReloadOnHidden = false; // リロード後はフラグをリセット
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Lenisを初期化
    initScrollAnimations().then((lenisInstance) => {
      if (lenisInstance) {
        lenis = lenisInstance;
      }
    });
    
    // ヒーローセクション要素を取得
    heroSectionElement = document.querySelector('#corporate') as HTMLElement;
    
    // スクロール量に応じて左側のアニメーションを制御
    const handleScroll = () => {
      if (isRightExpanding) return; // 右側が拡張中は処理しない
      if (!splitScreenElement) return; // 要素がまだマウントされていない場合は処理しない
      
      const scrollY = window.scrollY;
      const splitScreenHeight = splitScreenElement.offsetHeight || window.innerHeight;
      
      // スクロール進行度を計算
      // マウスオーバーで75%になった状態からスクロールを開始
      // 0-0.3: 75%→100%に拡張
      // 0.3-0.4: 100%のまま待機（タイムラグ）
      // 0.4-0.95: 100%のまま、スクロール追従で透過（fixedのまま）
      // 0.95-1.0: 完全透明になる
      
      const maxScrollForAnimation = splitScreenHeight * 1.0; // アニメーション完了までのスクロール量
      
      // preventDefault中でも仮想的なスクロール位置を使用
      const effectiveScrollY = virtualScrollY > 0 ? virtualScrollY : scrollY;
      scrollProgress = Math.min(effectiveScrollY / maxScrollForAnimation, 1);
      
      // 実際のスクロール位置を更新したら、仮想的なスクロール位置もリセット
      if (scrollY > virtualScrollY) {
        virtualScrollY = scrollY;
      }
      
      // スクロール量を記録
      currentScrollY = scrollY;
      
      // スクロール量に応じて左側を拡張
      // マウスオーバーで75%になった状態からスクロール追従を開始
      if (scrollY > 0) {
        isLeftExpanding = true;
        
        // 0-0.3: 75%→100%に拡張
        if (scrollProgress <= 0.3) {
          leftExpandProgress = 0.75 + (scrollProgress / 0.3) * 0.25; // 0.75→1.0
          rightContentFadeOutProgress = scrollProgress / 0.3; // 右のコンテンツをフェードアウト
          leftContentFadeProgress = 0;
        }
        // 0.3-0.4: 100%のまま待機（タイムラグ）
        else if (scrollProgress <= 0.4) {
          leftExpandProgress = 1;
          rightContentFadeOutProgress = 1;
          leftContentFadeProgress = 0;
        }
        // 0.4-0.95: 100%のまま、スクロール追従で透過（fixedのまま）
        else if (scrollProgress <= 0.95) {
          leftExpandProgress = 1;
          rightContentFadeOutProgress = 1;
          // 0.4-0.95を0-1にマッピングして透過
          leftContentFadeProgress = (scrollProgress - 0.4) / 0.55; // 0.4-0.95を0-1にマッピング
        }
        // 0.95-1.0: 完全透明になる（エリアは維持）
        else {
          leftExpandProgress = 1;
          rightContentFadeOutProgress = 1;
          leftContentFadeProgress = 1; // 完全透明
          // 透過が完了しても、エリアを維持するため要素は残す（opacity: 0でも高さは維持される）
          
          // 透過完了時にヒーローセクションにスナップ（1回のみ）
          // scrollProgressが0.95を超えた瞬間にスナップフラグを立てる
          if (!hasSnappedToHero) {
            hasSnappedToHero = true; // フラグを立てて、重複実行を防ぐ
            console.log('hasSnappedToHero set to true, scrollProgress:', scrollProgress);
          }
        }
        
        // position: fixedが解除された時にスナップを実行
        // leftOpacityを直接計算（リアクティブ変数ではなく）
        const calculatedLeftOpacity = isLeftExpanding && scrollProgress > 0.4
          ? 1 - ((scrollProgress - 0.4) / 0.55) // 0.4-0.95を0-1にマッピングして透過
          : 1;
        const currentShouldLockScroll = isLeftExpanding && leftExpandProgress >= 1.0 && calculatedLeftOpacity > 0;
        
        if (prevShouldLockScroll && !currentShouldLockScroll && hasSnappedToHero) {
          console.log('Snap condition met in handleScroll:', {
            prevShouldLockScroll,
            currentShouldLockScroll,
            hasSnappedToHero,
            scrollProgress,
            calculatedLeftOpacity,
            leftExpandProgress
          });
          
          // heroSectionElementとlenisが準備できているか確認
          if (!heroSectionElement) {
            heroSectionElement = document.querySelector('#corporate') as HTMLElement;
          }
          if (!lenis && (window as any).lenis) {
            lenis = (window as any).lenis;
          }
          
          if (heroSectionElement && lenis) {
            const heroTop = heroSectionElement.offsetTop;
            console.log('Snapping to hero section at:', heroTop, 'scrollProgress:', scrollProgress);
            // 少し遅延を入れてスナップ
            setTimeout(() => {
              if (lenis && heroSectionElement) {
                const currentHeroTop = heroSectionElement.offsetTop;
                console.log('Executing snap to:', currentHeroTop);
                lenis.scrollTo(currentHeroTop, {
                  duration: 1.0,
                  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              } else {
                console.warn('Snap failed: lenis or heroSectionElement not available');
              }
            }, 300);
          } else {
            console.warn('Snap condition not met:', {
              hasSnappedToHero,
              heroSectionElement: !!heroSectionElement,
              lenis: !!lenis,
              scrollProgress
            });
          }
        }
        
        // 前回のshouldLockScrollの状態を更新
        prevShouldLockScroll = currentShouldLockScroll;
      } else {
        // トップに戻ったらリセット
        isLeftExpanding = false;
        leftExpandProgress = 0;
        rightContentFadeOutProgress = 0;
        leftContentFadeProgress = 0;
        virtualScrollY = 0;
        hasSnappedToHero = false; // スナップフラグをリセット
        // トップに戻った時はスナップしない（SplitScreenが表示されている状態なので）
      }
    };
    
    // wheelイベントで透過完了までのスクロールを制御
    const handleWheel = (e: WheelEvent) => {
      if (isRightExpanding) return;
      if (!splitScreenElement) return;
      
      const scrollY = window.scrollY;
      const splitScreenHeight = splitScreenElement.offsetHeight || window.innerHeight;
      const maxScrollForAnimation = splitScreenHeight * 1.0;
      
      // 仮想的なスクロール位置を使用してprogressを計算
      const effectiveScrollY = virtualScrollY > 0 ? virtualScrollY : scrollY;
      const currentProgress = Math.min(effectiveScrollY / maxScrollForAnimation, 1);
      
      // 透過が完了するまで（0.95まで）下方向のスクロールをロック
      // 透過が完了したら、通常のスクロールに戻す（position: fixedを解除）
      // 上方向のスクロールは常に許可（逆スクロール対応）
      if (isLeftExpanding && leftExpandProgress >= 1.0 && currentProgress < 0.95 && e.deltaY > 0) {
        e.preventDefault();
        
        // preventDefaultしている間でも、仮想的なスクロール位置を更新
        virtualScrollY = Math.max(virtualScrollY, effectiveScrollY) + e.deltaY;
        
        // handleScrollを呼び出して、progressを更新
        handleScroll();
      } else if (e.deltaY < 0) {
        // 上方向のスクロールは許可（逆スクロール対応）
        // 仮想的なスクロール位置も更新
        virtualScrollY = Math.max(0, effectiveScrollY + e.deltaY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // 要素がマウントされた後に初回実行
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  });
  
  // Helper function to darken a hex color by a percentage
  function darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }

  // Derived styles
  // PC: width-based, Mobile: height-based
  // 左側の幅はスクロール追従で75%→100%に拡張（マウスオーバーで75%になった状態から開始）
  $: leftWidth = isRightExpanding 
    ? 0 
    : isLeftExpanding
    ? leftExpandProgress * 100 // leftExpandProgressが0.75（75%）から1.0（100%）へ
    : hoveredSide === "left" ? 75 : hoveredSide === "right" ? 25 : 50;
  $: rightWidth = isRightExpanding 
    ? 100 
    : isLeftExpanding
    ? (1 - leftExpandProgress) * 100 // 25%から0%へ
    : hoveredSide === "right" ? 75 : hoveredSide === "left" ? 25 : 50;
  
  // Mobile: height-based animation
  // 左側の高さはスクロール追従で75%→100%に拡張（マウスオーバーで75%になった状態から開始）
  $: leftHeight = isRightExpanding 
    ? 0 
    : isLeftExpanding
    ? leftExpandProgress * 100 // leftExpandProgressが0.75（75%）から1.0（100%）へ
    : hoveredSide === "left" ? 75 : hoveredSide === "right" ? 25 : 50;
  $: rightHeight = isRightExpanding 
    ? 100 
    : isLeftExpanding
    ? (1 - leftExpandProgress) * 100 // 25%から0%へ
    : hoveredSide === "right" ? 75 : hoveredSide === "left" ? 25 : 50;
  
  // 左側の透過度（スクロールプログレス0.4-0.95で完全透明になる）
  $: leftOpacity = isLeftExpanding && scrollProgress > 0.4
    ? 1 - ((scrollProgress - 0.4) / 0.55) // 0.4-0.95を0-1にマッピングして透過
    : 1;
  
  // 100%になるまでSplitScreenを固定
  $: shouldFixPosition = isLeftExpanding && leftExpandProgress < 1.0;
  
  // 透過が完了するまで固定（スクロール量は取得）
  // 透過が完了したら、通常のスクロールに戻す（position: fixedを解除）
  // ただし、エリアを維持するため、要素自体は残す（opacity: 0でも高さは維持される）
  $: shouldLockScroll = isLeftExpanding && leftExpandProgress >= 1.0 && leftOpacity > 0;
  

  function handleMouseEnter(side: "left" | "right") {
    hoveredSide = side;
  }

  function handleMouseLeave() {
    hoveredSide = null;
  }

  function handleLeftClick(e: MouseEvent) {
    e.preventDefault();
    // スクロールベースのアニメーションなので、クリック時はスクロールを開始
    const target = document.getElementById("corporate");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleRightClick(e: MouseEvent) {
    e.preventDefault();
    
    isRightExpanding = true;
    hoveredSide = null; // ホバー状態をリセット
    
    // 左側のコンテンツをフェードアウト
    const leftFadeOutDuration = 200; // 左側コンテンツのフェードアウト時間（速めに）
    const leftFadeOutStart = Date.now();
    const animateLeftFadeOut = () => {
      const elapsed = Date.now() - leftFadeOutStart;
      const progress = Math.min(elapsed / leftFadeOutDuration, 1);
      leftContentFadeOutProgress = progress;
      if (progress < 1) {
        requestAnimationFrame(animateLeftFadeOut);
      }
    };
    requestAnimationFrame(animateLeftFadeOut);
    
    // 幅を100%に拡張するアニメーション
    const expandDuration = 800; // 拡張アニメーションの時間
    const expandStart = Date.now();
    const animateExpand = () => {
      const elapsed = Date.now() - expandStart;
      const progress = Math.min(elapsed / expandDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      rightExpandProgress = eased;
      if (progress < 1) {
        requestAnimationFrame(animateExpand);
      } else {
        // 拡張完了後、コンテンツをフェードアウト
        const fadeDuration = 400; // フェードアウトの時間
        const fadeStart = Date.now();
        const animateFade = () => {
          const elapsed = Date.now() - fadeStart;
          const progress = Math.min(elapsed / fadeDuration, 1);
          rightContentFadeProgress = progress;
          if (progress < 1) {
            requestAnimationFrame(animateFade);
          } else {
            // フェードアウト完了後、800ms待ってから遷移
            setTimeout(() => {
              shouldReloadOnHidden = true; // リロードフラグを立てる
              window.open("https://www.joyzo.co.jp/service/", "_blank", "noopener,noreferrer");
            }, 800);
          }
        };
        requestAnimationFrame(animateFade);
      }
    };
    requestAnimationFrame(animateExpand);
  }
</script>

<!-- Custom Cursor -->
<div 
  class="custom-cursor"
  class:visible={cursorVisible}
  class:hover-left={hoveredSide === "left"}
  class:hover-right={hoveredSide === "right"}
  style="left: {cursorX}px; top: {cursorY}px;"
>
  <div class="cursor-inner">
    <img 
      src="/images/surfers/s001.png" 
      alt="Cursor" 
      class="cursor-icon"
    />
  </div>
  <div class="cursor-ripple cursor-wave-1" style="animation-delay: {wave1Delay}s;"></div>
  <div class="cursor-ripple cursor-wave-2" style="animation-delay: {wave2Delay}s;"></div>
  <div class="cursor-ripple cursor-wave-3" style="animation-delay: {wave3Delay}s;"></div>
</div>

<!-- SplitScreenがfixedの間、その下にスペーサーを配置 -->
{#if shouldFixPosition || shouldLockScroll}
  <div 
    class="split-screen-spacer"
    style="height: 100dvh; min-height: 100dvh;"
  ></div>
{/if}

<div 
  bind:this={splitScreenElement}
  class="relative z-[55] flex w-full flex-col overflow-hidden md:flex-row cursor-none split-screen-container"
  class:fixed={shouldFixPosition || shouldLockScroll}
  class:scrolling={isLeftExpanding && leftOpacity > 0}
  style="height: 100dvh; min-height: 100dvh;"
>
  <!-- Right Side: Service Info (Mobile: top, PC: right) -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <a
    href="https://www.joyzo.co.jp/service/"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative flex w-full items-center justify-center transition-all duration-500 ease-in-out order-1 md:order-2 split-right"
    style="background-color: {hoveredSide === 'right' ? rightHoverColor : rightBgColor}; width: {rightWidth}%; height: {rightHeight}%; transition: width 0.5s ease-out, height 0.5s ease-out, background-color 0.5s ease-in-out;"
    on:mouseenter={() => handleMouseEnter("right")}
    on:mouseleave={handleMouseLeave}
    on:click={handleRightClick}
  >
    <div 
      class="z-10 flex flex-col items-center text-center text-black transition-all duration-700"
      style="opacity: {1 - Math.max(rightContentFadeProgress, rightContentFadeOutProgress)};"
    >
      <h2 class="text-3xl font-bold tracking-wider md:text-4xl">サービスのことを知りたい</h2>
      <p class="mt-4 text-sm opacity-80 md:text-base">Service Information</p>
      {#if showImages}
        <div class="mt-6">
          <img 
            src="/images/top/system39-logo-yokokana.png" 
            alt="システム39" 
            class="h-16 w-auto object-contain md:h-20"
          />
        </div>
      {/if}
    </div>
  </a>

  <!-- Left Side: Corporate Info (Mobile: bottom, PC: left) -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <a
    href="#corporate"
    class="group relative flex w-full items-center justify-center transition-all duration-500 ease-in-out order-2 md:order-1 split-left"
    style="background-color: {hoveredSide === 'left' ? leftHoverColor : leftBgColor}; width: {leftWidth}%; height: {leftHeight}%; opacity: {leftOpacity}; transition: width 0.5s ease-out, height 0.5s ease-out, background-color 0.5s ease-in-out, opacity 0.1s linear;"
    on:mouseenter={() => handleMouseEnter("left")}
    on:mouseleave={handleMouseLeave}
    on:click={handleLeftClick}
  >
    <div 
      class="z-10 flex flex-col items-center text-center text-white transition-all duration-300"
      style="opacity: {1 - Math.max(leftContentFadeProgress, leftContentFadeOutProgress)};"
    >
      <h2 class="text-3xl font-bold tracking-wider md:text-4xl">会社のことを知りたい</h2>
      <p class="mt-4 text-sm opacity-80 md:text-base">Corporate Information</p>
      {#if showImages}
        <div class="mt-6">
          <img 
            src="/images/logo_corp.png" 
            alt="JOYZO Logo" 
            class="h-16 w-auto object-contain md:h-20"
          />
        </div>
      {/if}
    </div>
  </a>
</div>

<style>
  /* Mobile: height-based, PC: width-based */
  @media (max-width: 767px) {
    .split-left,
    .split-right {
      width: 100% !important;
    }
  }
  
  @media (min-width: 768px) {
    .split-left,
    .split-right {
      height: 100% !important;
    }
  }
  
  /* Custom Cursor Styles */
  .custom-cursor {
    position: fixed;
    width: 60px;
    height: 60px;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .custom-cursor.visible {
    opacity: 1;
  }
  
  .cursor-inner {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, background 0.2s ease;
    backdrop-filter: blur(4px);
    border-radius: 50%;
  }
  
  .cursor-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
    transition: transform 0.2s ease;
    display: block;
    animation: bounce 1s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    mix-blend-mode: normal;
  }
  
  .custom-cursor:hover-left .cursor-inner {
    background: rgba(37, 99, 235, 0.4);
    transform: scale(1.2);
  }
  
  .custom-cursor:hover-right .cursor-inner {
    background: rgba(255, 193, 7, 0.4);
    transform: scale(1.2);
  }
  
  .custom-cursor:hover-left .cursor-icon,
  .custom-cursor:hover-right .cursor-icon {
    transform: scale(1.3);
    animation: pulse 0.5s ease-in-out infinite;
  }
  
  .cursor-ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
    border-radius: 50%;
  }
  
  .cursor-wave-1 {
    animation: wave 8s ease-out infinite;
  }
  
  .cursor-wave-2 {
    animation: wave 8s ease-out infinite;
  }
  
  .cursor-wave-3 {
    animation: wave 8s ease-out infinite;
  }
  
  .custom-cursor:hover-left .cursor-ripple {
    border-color: rgba(37, 99, 235, 0.5);
    animation: wave-active 6s ease-out infinite;
  }
  
  .custom-cursor:hover-right .cursor-ripple {
    border-color: rgba(255, 193, 7, 0.5);
    animation: wave-active 6s ease-out infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1.3);
    }
    50% {
      transform: scale(1.5);
    }
  }
  
  @keyframes wave {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translate(-50%, -50%) scale(2.5);
      opacity: 0;
    }
  }
  
  @keyframes wave-active {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      transform: translate(-50%, -50%) scale(3);
      opacity: 0;
    }
  }
  
  .cursor-none {
    cursor: none;
  }
  
  .cursor-none * {
    cursor: none !important;
  }
  
  /* SplitScreenの位置固定 */
  .split-screen-container.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    will-change: transform;
    backface-visibility: hidden; /* GPU加速を有効化 */
    -webkit-backface-visibility: hidden;
  }
  
  .split-screen-container.scrolling {
    transition: none !important;
  }
  
  /* スクロール中は子要素のtransitionを無効化してスムーズに */
  .split-screen-container.scrolling > a {
    transition: opacity 0.2s ease !important;
  }
  
  /* SplitScreenがfixedの間のスペーサー */
  .split-screen-spacer {
    width: 100%;
    pointer-events: none;
  }
</style>
