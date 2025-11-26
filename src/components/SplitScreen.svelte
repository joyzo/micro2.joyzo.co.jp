<script lang="ts">
  import { onMount } from "svelte";

  let hoveredSide: "left" | "right" | null = null;
  
  // Animation state variables
  let animationProgress = 0; // width expansion progress (0-1)
  let fadeProgress = 0; // left side opacity/blur progress (0-1)
  let rightContentFadeProgress = 0; // right side content opacity progress (0-1)
  let leftContentFadeProgress = 0; // left side content fade out when right expands (0-1)
  let rightContentFadeOutProgress = 0; // right side content fade out when left expands (0-1)
  let expandedSide: "left" | "right" | null = null;
  let isAnimating = false;
  let isComplete = false;
  
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
    
    // Scroll-based animation handler
    const handleScroll = () => {
      if (isAnimating || isComplete) return;
      
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        expandedSide = "left";
        isAnimating = true;
        
        // 右側のコンテンツをフェードアウト
        const fadeOutDuration = 400;
        const fadeOutStart = Date.now();
        const animateFadeOut = () => {
          const elapsed = Date.now() - fadeOutStart;
          const progress = Math.min(elapsed / fadeOutDuration, 1);
          rightContentFadeOutProgress = progress;
          if (progress < 1) {
            requestAnimationFrame(animateFadeOut);
          }
        };
        requestAnimationFrame(animateFadeOut);
        
        // 一旦100%になる（透過せずに）
        animationProgress = 1;
        // 1秒待機
        setTimeout(() => {
          // その後、徐々に透過していって、トップページが見える
          startFadeOut(() => {
            isComplete = true;
            isAnimating = false;
            // Scroll to corporate after fade
            const target = document.getElementById("corporate");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          });
        }, 1000);
        // Remove scroll listener
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
  $: leftWidth = expandedSide === "left"
    ? 50 + animationProgress * 50
    : expandedSide === "right"
    ? 50 - animationProgress * 50
    : hoveredSide === "left" ? 75
    : hoveredSide === "right" ? 25
    : 50;

  $: rightWidth = expandedSide === "right"
    ? 50 + animationProgress * 50
    : expandedSide === "left"
    ? 50 - animationProgress * 50
    : hoveredSide === "right" ? 75
    : hoveredSide === "left" ? 25
    : 50;

  // Left side: overall overlay opacity and blur based on fadeProgress
  $: leftOpacity = 1 - fadeProgress;
  $: blurAmount = expandedSide === "left" ? fadeProgress * 10 : 0;
  
  // Right side: only content fades, background stays
  $: rightContentOpacity = expandedSide === "right" 
    ? 1 - rightContentFadeProgress 
    : 1 - rightContentFadeOutProgress;
  
  // Left side content: fades out when right expands
  $: leftContentOpacity = expandedSide === "left"
    ? 1
    : 1 - leftContentFadeProgress;

  // Left side fade out function
  function startFadeOut(callback: () => void) {
    const fadeDuration = 800; // ms
    const fadeStart = Date.now();
    const animateFade = () => {
      const elapsed = Date.now() - fadeStart;
      const progress = Math.min(elapsed / fadeDuration, 1);
      fadeProgress = progress;
      if (progress < 1) {
        requestAnimationFrame(animateFade);
      } else {
        callback();
      }
    };
    requestAnimationFrame(animateFade);
  }

  // Right side content fade out function
  function startRightContentFadeOut(callback: () => void) {
    const fadeDuration = 800; // ms
    const fadeStart = Date.now();
    const animateFade = () => {
      const elapsed = Date.now() - fadeStart;
      const progress = Math.min(elapsed / fadeDuration, 1);
      rightContentFadeProgress = progress;
      if (progress < 1) {
        requestAnimationFrame(animateFade);
      } else {
        callback();
      }
    };
    requestAnimationFrame(animateFade);
  }

  function handleMouseEnter(side: "left" | "right") {
    if (!isAnimating && !isComplete) {
      hoveredSide = side;
    }
  }

  function handleMouseLeave() {
    if (!isAnimating && !isComplete) {
      hoveredSide = null;
    }
  }

  function handleLeftClick(e: MouseEvent) {
    e.preventDefault();
    if (isAnimating || isComplete) return;
    expandedSide = "left";
    isAnimating = true;
    const startProgress = animationProgress;
    const duration = 800;
    const startTime = Date.now();
    
    // 右側のコンテンツをフェードアウト
    const fadeOutDuration = 400; // 幅の拡張より少し早くフェードアウト
    const fadeOutStart = Date.now();
    const animateFadeOut = () => {
      const elapsed = Date.now() - fadeOutStart;
      const progress = Math.min(elapsed / fadeOutDuration, 1);
      rightContentFadeOutProgress = progress;
      if (progress < 1) {
        requestAnimationFrame(animateFadeOut);
      }
    };
    requestAnimationFrame(animateFadeOut);
    
    const animateExpand = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      animationProgress = startProgress + (1 - startProgress) * eased;
      if (progress < 1) {
        requestAnimationFrame(animateExpand);
      } else {
        // 一旦100%になる（透過せずに）→ 1秒待機
        setTimeout(() => {
          // その後、徐々に透過していって、トップページが見える
          startFadeOut(() => {
            isComplete = true;
            isAnimating = false;
            // Scroll after fade completes
            const target = document.getElementById("corporate");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          });
        }, 1000);
      }
    };
    requestAnimationFrame(animateExpand);
  }

  function handleRightClick(e: MouseEvent) {
    e.preventDefault();
    if (isAnimating || isComplete) return;
    expandedSide = "right";
    isAnimating = true;
    const startProgress = animationProgress;
    const duration = 800;
    const startTime = Date.now();
    
    // 左側のコンテンツをフェードアウト
    const fadeOutDuration = 400; // 幅の拡張より少し早くフェードアウト
    const fadeOutStart = Date.now();
    const animateFadeOut = () => {
      const elapsed = Date.now() - fadeOutStart;
      const progress = Math.min(elapsed / fadeOutDuration, 1);
      leftContentFadeProgress = progress;
      if (progress < 1) {
        requestAnimationFrame(animateFadeOut);
      }
    };
    requestAnimationFrame(animateFadeOut);
    
    const animateExpand = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      animationProgress = startProgress + (1 - startProgress) * eased;
      if (progress < 1) {
        requestAnimationFrame(animateExpand);
      } else {
        // 100%になった後、コンテンツが透過して背景色だけになる
        startRightContentFadeOut(() => {
          // 背景色だけになる状態から1秒待機
          setTimeout(() => {
            // 画面遷移（1秒後に本体が見える）
            // Open new tab
            window.open("https://www.joyzo.co.jp/service/", "_blank", "noopener,noreferrer");
            // Redirect current tab to home and hide overlay
            window.location.href = "/";
            isComplete = true;
            isAnimating = false;
          }, 1000);
        });
      }
    };
    requestAnimationFrame(animateExpand);
  }
</script>

{#if !isComplete}
<!-- Custom Cursor -->
<div 
  class="custom-cursor"
  class:visible={cursorVisible && !isAnimating && !isComplete}
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

<div 
  class="fixed inset-0 z-[9999] flex h-screen w-full flex-col overflow-hidden md:flex-row cursor-none"
  style="filter: blur({blurAmount}px); transition: filter 0.1s linear;"
>
  <!-- Left Side: Corporate Info -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <a
    href="#corporate"
    class="group relative flex w-full items-center justify-center transition-all duration-500 ease-in-out md:h-full"
    class:h-1-2={true}
    style="background-color: {hoveredSide === 'left' ? leftHoverColor : leftBgColor}; width: {leftWidth}%; opacity: {leftOpacity}; transition: width 0.5s ease-out, background-color 0.5s ease-in-out, opacity 0.1s linear;"
    on:mouseenter={() => handleMouseEnter("left")}
    on:mouseleave={handleMouseLeave}
    on:click={handleLeftClick}
  >
    <div 
      class="z-10 flex flex-col items-center text-center text-white transition-all duration-300"
      style="opacity: {leftContentOpacity};"
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

  <!-- Right Side: Service Info -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <a
    href="https://www.joyzo.co.jp/service/"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative flex w-full items-center justify-center transition-all duration-500 ease-in-out md:h-full"
    class:h-1-2={true}
    style="background-color: {hoveredSide === 'right' ? rightHoverColor : rightBgColor}; width: {rightWidth}%; transition: width 0.5s ease-out, background-color 0.5s ease-in-out;"
    on:mouseenter={() => handleMouseEnter("right")}
    on:mouseleave={handleMouseLeave}
    on:click={handleRightClick}
  >
    <!-- 右側のコンテンツだけ透過、背景は透過しない -->
    <div 
      class="z-10 flex flex-col items-center text-center text-white transition-all duration-700"
      style="opacity: {rightContentOpacity};"
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
</div>
{/if}

<style>
  /* Custom utility classes for width transitions if Tailwind doesn't support arbitrary values in class: directive smoothly */
  .md\:w-3-4 {
    width: 75%;
  }
  .md\:w-1-4 {
    width: 25%;
  }
  .md\:w-1-2 {
    width: 50%;
  }
  
  @media (max-width: 768px) {
    .md\:w-3-4, .md\:w-1-4, .md\:w-1-2 {
      width: 100%;
    }
  }
  
  .h-1-2 {
    height: 50%;
  }
  
  @media (min-width: 768px) {
    .h-1-2 {
      height: 100%;
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
</style>
