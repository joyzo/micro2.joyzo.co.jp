<script lang="ts">
  import { onMount } from 'svelte';

  // サーファー画像の定義（正しいパスに修正）
  const surfers = [
    { id: 's001', src: '/images/surfers/s001.png', weight: 1.0, isMain: true },
    { id: 's002', src: '/images/surfers/s002.png', weight: 0.8 },
    { id: 's003', src: '/images/surfers/s003.png', weight: 0.7 },
    { id: 's004', src: '/images/surfers/s004.png', weight: 0.6 },
    { id: 's005', src: '/images/surfers/s005.png', weight: 0.5 },
    { id: 's006', src: '/images/surfers/s006.png', weight: 0.4 },
    { id: 's007', src: '/images/surfers/s007.png', weight: 0.3 },
    { id: 's008', src: '/images/surfers/s008.png', weight: 0.2 }
  ];

  // ページごとの配置設定（スクロール位置ベース）
  const pageConfigs = {
    'index': {
      positions: [
        { surfer: 's001', side: 'left', scrollTrigger: 0.2, delay: 0 },
        { surfer: 's002', side: 'right', scrollTrigger: 0.4, delay: 200 },
        { surfer: 's003', side: 'left', scrollTrigger: 0.6, delay: 400 },
        { surfer: 's004', side: 'right', scrollTrigger: 0.8, delay: 600 }
      ]
    },
    'aboutus': {
      positions: [
        { surfer: 's005', side: 'left', scrollTrigger: 0.2, delay: 0 },
        { surfer: 's001', side: 'right', scrollTrigger: 0.5, delay: 300 },
        { surfer: 's006', side: 'left', scrollTrigger: 0.8, delay: 500 }
      ]
    },
    'company': {
      positions: [
        { surfer: 's007', side: 'right', scrollTrigger: 0.2, delay: 0 },
        { surfer: 's002', side: 'left', scrollTrigger: 0.5, delay: 250 },
        { surfer: 's008', side: 'right', scrollTrigger: 0.8, delay: 450 }
      ]
    },
    'contact': {
      positions: [
        { surfer: 's001', side: 'left', scrollTrigger: 0.2, delay: 0 },
        { surfer: 's003', side: 'right', scrollTrigger: 0.5, delay: 200 },
        { surfer: 's004', side: 'left', scrollTrigger: 0.8, delay: 400 }
      ]
    },
    'recruit': {
      positions: [
        { surfer: 's005', side: 'right', scrollTrigger: 0.2, delay: 0 },
        { surfer: 's006', side: 'left', scrollTrigger: 0.5, delay: 300 },
        { surfer: 's007', side: 'right', scrollTrigger: 0.8, delay: 500 }
      ]
    },
    'privacy': {
      positions: [
        { surfer: 's008', side: 'left', scrollTrigger: 0.3, delay: 0 },
        { surfer: 's002', side: 'right', scrollTrigger: 0.7, delay: 200 }
      ]
    },
    'news': {
      positions: [
        { surfer: 's003', side: 'left', scrollTrigger: 0.2, delay: 0 },
        { surfer: 's004', side: 'right', scrollTrigger: 0.5, delay: 300 },
        { surfer: 's005', side: 'left', scrollTrigger: 0.8, delay: 500 }
      ]
    }
  };

  // 現在のページを取得
  let currentPage = 'index';
  let mounted = false;

  onMount(() => {
    mounted = true;
    // URLからページ名を取得
    const path = window.location.pathname;
    if (path === '/') currentPage = 'index';
    else if (path.startsWith('/aboutus')) currentPage = 'aboutus';
    else if (path.startsWith('/company')) currentPage = 'company';
    else if (path.startsWith('/contact')) currentPage = 'contact';
    else if (path.startsWith('/recruit')) currentPage = 'recruit';
    else if (path.startsWith('/privacy')) currentPage = 'privacy';
    else if (path.startsWith('/news')) currentPage = 'news';
    else currentPage = 'index';

    // 少し遅延してからアニメーション初期化（DOM要素が確実に存在するように）
    setTimeout(() => {
      initScrollAnimations();
    }, 100);
  });

  function initScrollAnimations() {
    let triggeredElements = new Set();
    
    function handleScroll() {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollProgress = scrollTop / (documentHeight - windowHeight);
      
      // 各サーファー要素をチェック
      document.querySelectorAll('.surfer-element').forEach((el, index) => {
        const element = el as HTMLElement;
        const scrollTrigger = parseFloat(element.dataset.scrollTrigger || '0');
        const delay = parseInt(element.dataset.delay || '0');
        
        if (scrollProgress >= scrollTrigger && !triggeredElements.has(index)) {
          triggeredElements.add(index);
          
          // 現在のビューポート内の適切な位置を計算
          const viewportTop = scrollTop;
          const viewportBottom = scrollTop + windowHeight;
          const viewportCenter = scrollTop + windowHeight / 2;
          
          // スクロール進捗に応じて表示位置を調整
          let displayTop;
          if (scrollProgress < 0.3) {
            // 上部エリア：ビューポートの下部寄り
            displayTop = viewportBottom - 200;
          } else if (scrollProgress < 0.7) {
            // 中部エリア：ビューポートの中央
            displayTop = viewportCenter;
          } else {
            // 下部エリア：ビューポートの上部寄り
            displayTop = viewportTop + 200;
          }
          
          // 要素の位置を更新
          element.style.top = `${displayTop}px`;
          element.style.transform = 'translateY(-50%)';
          
          setTimeout(() => {
            element.classList.add('animate-slide-in');
            element.classList.add('animate-float');
          }, delay);
        }
      });
    }
    
    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初期チェック
    handleScroll();
  }

  // 現在のページの設定を取得
  $: currentConfig = pageConfigs[currentPage as keyof typeof pageConfigs] || pageConfigs['index'];
</script>

<style>
  .surfer-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
    overflow: hidden;
  }

  .surfer-element {
    position: absolute;
    opacity: 0;
    transform: translateX(-100px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 10;
  }

  .surfer-element.left {
    left: -20px; /* 余白25%を考慮して内側に寄せる */
  }

  .surfer-element.right {
    right: -20px; /* 余白25%を考慮して内側に寄せる */
    transform: translateX(100px);
  }

  .surfer-element.animate-slide-in {
    opacity: 1;
    transform: translateX(0);
  }

  .surfer-element.animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .surfer-image {
    width: auto;
    height: 240px; /* PC版：2倍サイズ */
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    transition: all 0.3s ease;
  }

  .surfer-image:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) translateX(0);
    }
    25% {
      transform: translateY(-10px) translateX(2px);
    }
    50% {
      transform: translateY(-5px) translateX(-1px);
    }
    75% {
      transform: translateY(-15px) translateX(1px);
    }
  }

  /* レスポンシブ対応 */
  @media (max-width: 768px) {
    .surfer-image {
      height: 120px; /* モバイル版：適度なサイズ */
    }
    
    .surfer-element.left {
      left: -5px; /* モバイルでも余白を考慮 */
    }
    
    .surfer-element.right {
      right: -5px; /* モバイルでも余白を考慮 */
    }
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    .surfer-image {
      height: 180px; /* タブレット版：中間サイズ */
    }
    
    .surfer-element.left {
      left: -10px; /* タブレットでも余白を考慮 */
    }
    
    .surfer-element.right {
      right: -10px; /* タブレットでも余白を考慮 */
    }
  }
</style>

{#if mounted}
  <div class="surfer-container">
    
    <!-- スクロール連動の動的表示 -->
    {#each currentConfig.positions as position}
      {@const surfer = surfers.find(s => s.id === position.surfer)}
      {#if surfer}
        <div 
          class="surfer-element {position.side}"
          style="top: 0; transform: translateY(-50%);"
          data-scroll-trigger={position.scrollTrigger}
          data-delay={position.delay}
        >
          <img 
            src={surfer.src} 
            alt="Surfer {surfer.id}"
            class="surfer-image"
            loading="lazy"
          />
        </div>
      {/if}
    {/each}
  </div>
{/if}
