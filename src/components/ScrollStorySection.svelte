<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let message;
  export let index;
  export let isLast = false;
  
  let sectionElement;
  let catchElement;
  let leadElement;

  
  onMount(async () => {
    // クライアントサイドでのみGSAPを読み込み
    if (typeof window === 'undefined') return;
    
    const { default: gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger.js');
    
    // GSAP ScrollTrigger プラグイン登録
    gsap.registerPlugin(ScrollTrigger);
    
    // グローバルなLenisインスタンスを使用（重複初期化を避ける）
    // Lenisの初期化はLayout.astroで行われる
    
    // 初期状態設定
    gsap.set(catchElement, { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      clipPath: "inset(0 100% 0 0)" // 右端から完全に隠す
    });
    gsap.set(leadElement, { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    });
    
    // スクロールトリガー作成
    const tl = ScrollTrigger.create({
      trigger: sectionElement,
      start: "top 70%", // 90%から70%に変更して、より画面に表示されてから開始
      end: "bottom 10%",
      scrub: 1.0, // 2.0から1.0に変更して、より軽量に
      onEnter: () => {
        // キャッチフレーズ：clipPathで左から右へ文字を現す
        gsap.to(catchElement, { 
          clipPath: "inset(0 0% 0 0)", // 完全に表示
          duration: 0.4, // 0.6から0.4に短縮
          ease: "power2.out" 
        });
        
        // リード文：0.1s遅延で下からフェードイン（0.2sから0.1sに短縮）
        gsap.to(leadElement, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.3, // 0.4から0.3に短縮
          ease: "power3.out", 
          delay: 0.1 
        });
      },
      onLeave: () => {
        // キャッチフレーズ：clipPathで右から左へ文字を隠す
        gsap.to(catchElement, { 
          clipPath: "inset(0 0% 0 100%)", // 左端から隠す
          duration: 0.3, 
          ease: "power2.inOut" 
        });
        
        // リード文：下方向にスケールダウン
        gsap.to(leadElement, { 
          opacity: 0, 
          y: 30, 
          scale: 0.8,
          duration: 0.2, 
          ease: "power2.inOut" 
        });
      },
      onEnterBack: () => {
        // 戻ってきた時の再表示
        gsap.to(catchElement, { 
          clipPath: "inset(0 0% 0 0)", // 完全に表示
          duration: 0.6, 
          ease: "power2.out" 
        });
        gsap.to(leadElement, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          ease: "power3.out" 
        });
      }
    });
    
    // prefers-reduced-motion対応
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([catchElement, leadElement], { 
        opacity: 1, 
        scale: 1, 
        clipPath: "inset(0 0% 0 0)",
        y: 0 
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
  class="min-h-screen flex items-center justify-center relative"
  class:bg-white={index % 2 === 0}
  class:bg-blue-900={index % 2 === 1}
  aria-labelledby="story-heading-{index}"
>
  <!-- 背景装飾 -->
  <div class="absolute inset-0 -z-10 opacity-5">
    <div class="absolute top-20 left-20 w-64 h-64 border border-current rounded-full"></div>
    <div class="absolute bottom-20 right-20 w-32 h-32 border border-current transform rotate-45"></div>
  </div>
  
  <div class="container mx-auto px-8 md:px-16 text-left max-w-7xl">
    <!-- キャッチフレーズ -->
    <div 
      bind:this={catchElement}
      class="mb-8 md:mb-12 w-full relative overflow-hidden text-left"
    >
      <!-- テキスト（clipPathでマスク効果を適用） -->
      <h2 
        id="story-heading-{index}"
        class="text-6xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-black leading-none"
        class:text-blue-900={index % 2 === 0}
        class:text-white={index % 2 === 1}
        style="letter-spacing: 0.02em;"
      >
        {#each message.catch.split('、') as part, i}
          {part}{i < message.catch.split('、').length - 1 ? '' : ''}
          {#if i < message.catch.split('、').length - 1}
            <br />
          {/if}
        {/each}
      </h2>
    </div>
    
    <!-- リード文 -->
    <div 
      bind:this={leadElement}
      class="mt-8 md:mt-12 max-w-4xl text-left"
    >
      {#each message.body as paragraph}
        <p 
          class="text-base md:text-xl leading-relaxed mb-4 last:mb-0 opacity-80"
          class:text-gray-800={index % 2 === 0}
          class:text-white={index % 2 === 1}
        >
          {paragraph}
        </p>
      {/each}
    </div>
    
    <!-- 最後のセクション用の特別な表示 -->
    {#if isLast}
      <div class="mt-16">
        <div class="inline-block px-8 py-4 border-2 rounded-full border-current opacity-60">
          <span 
            class="text-lg font-bold tracking-wider"
            class:text-blue-900={index % 2 === 0}
            class:text-white={index % 2 === 1}
          >
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
</style>
