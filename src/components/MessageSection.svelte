<script>
  import { onMount } from 'svelte';
  
  export let message;
  export let index;
  export let isAlternate = false;
  
  let sectionElement;
  let isVisible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  });
  
  // 各段落のアニメーション遅延
  $: paragraphDelays = message.body.map((_, i) => i * 0.2);
  
  // パーティクル生成
  $: particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 1.5
  }));
</script>

<section 
  bind:this={sectionElement}
  class="h-screen flex items-center relative overflow-hidden"
  class:bg-white={!isAlternate}
  class:bg-blue-900={isAlternate}
  style="z-index: {10 - index};"
>
  <!-- デバッグ情報（開発時のみ表示） -->
  {#if import.meta.env.DEV}
    <div class="absolute top-4 right-4 bg-black/80 text-white p-3 rounded text-xs font-mono z-50">
      <div>Section {index + 1}</div>
      <div>Visible: {isVisible ? 'Yes' : 'No'}</div>
    </div>
  {/if}

  <!-- 背景の装飾要素 -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-20 left-20 w-64 h-64 border border-current rounded-full"></div>
    <div class="absolute bottom-20 right-20 w-32 h-32 border border-current transform rotate-45"></div>
  </div>
  
  <!-- パーティクル効果 -->
  <div class="absolute inset-0 pointer-events-none">
    {#each particles as particle}
      <div 
        class="absolute w-1 h-1 rounded-full opacity-0 transition-all duration-1000 ease-out"
        class:bg-blue-400={!isAlternate}
        class:bg-white={isAlternate}
        style="
          left: {particle.x}%; 
          top: {particle.y}%; 
          width: {particle.size}px; 
          height: {particle.size}px;
          opacity: {isVisible ? 0.4 : 0}; 
          transform: scale({isVisible ? 1 : 0.8});
          transition-delay: {particle.delay * 1000}ms;
        "
      ></div>
    {/each}
  </div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-6xl mx-auto">
      <!-- キャッチフレーズ（1行目） -->
      <div 
        class="mb-16 text-center transform transition-all duration-1000 ease-out"
        style="transform: translateX({isVisible ? 0 : '-100vw'}) scale({isVisible ? 1 : 0.8}); opacity: {isVisible ? 1 : 0};"
      >
        <h2 
          class="font-bold leading-tight tracking-tighter font-english"
          style="font-size: clamp(4rem, 10vw, 12rem); letter-spacing: -0.05em;"
          class:text-white={isAlternate}
          class:text-blue-900={!isAlternate}
        >
          {message.catch}
        </h2>
      </div>
      
      <!-- メインメッセージ -->
      <div class="space-y-6 max-w-4xl mx-auto">
        {#each message.body as paragraph, i}
          <div 
            class="relative transform transition-all duration-700 ease-out"
            style="transform: translateY({isVisible ? 0 : 30}px) translateX({isVisible ? 0 : 15}px); opacity: {isVisible ? 1 : 0}; transition-delay: {paragraphDelays[i] * 1000}ms;"
          >
            <!-- マーカー装飾 -->
            <div 
              class="absolute -left-8 top-0 w-3 h-full rounded-full opacity-0 transition-all duration-800 ease-out"
              style="opacity: {isVisible ? 1 : 0}; transform: scaleY({isVisible ? 1 : 0}); transition-delay: {paragraphDelays[i] * 1000 + 150}ms;"
            >
              <!-- グラデーションマーカー -->
              <div class="w-full h-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full"></div>
              <!-- 光沢効果 -->
              <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full"></div>
              <!-- パルス効果 -->
              <div 
                class="absolute inset-0 rounded-full opacity-0 animate-pulse"
                style="animation-delay: {paragraphDelays[i] * 1000 + 300}ms;"
              ></div>
            </div>
            
            <p 
              class="text-lg md:text-xl leading-relaxed font-medium relative z-10"
              class:text-white={isAlternate}
              class:text-gray-800={!isAlternate}
            >
              {paragraph}
            </p>
          </div>
        {/each}
      </div>
      
      <!-- 装飾的な要素 -->
      <div 
        class="mt-12 text-center opacity-0 transition-all duration-800 ease-out"
        style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? 0 : 20}px) scale({isVisible ? 1 : 0.95}); transition-delay: {paragraphDelays[paragraphDelays.length - 1] * 1000 + 200}ms;"
      >
        <div 
          class="inline-block px-6 py-3 border-2 rounded-full transform transition-all duration-300 hover:scale-105 relative overflow-hidden"
          class:border-white={isAlternate}
          class:border-blue-900={!isAlternate}
        >
          <!-- ホバー時の光効果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"></div>
          
          <span 
            class="text-sm font-bold tracking-wider relative z-10"
            class:text-white={isAlternate}
            class:text-blue-900={!isAlternate}
          >
            {message.tagline}
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* スムーズなアニメーションのための設定 */
  section {
    will-change: transform, opacity;
    transform: translateZ(0);
  }
  
  /* パフォーマンス最適化 */
  * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* マーカーの光沢効果 */
  .bg-gradient-to-b {
    background: linear-gradient(to bottom, #60a5fa, #3b82f6, #1d4ed8);
  }
  
  /* パルスアニメーション */
  @keyframes pulse {
    0%, 100% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(1.05);
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    will-change: transform, opacity;
  }
  
  /* アニメーション要素の最適化 */
  .transform {
    will-change: transform, opacity;
    transform: translateZ(0);
  }
</style>
