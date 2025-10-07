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
        { surfer: 's001', side: 'left', scrollTrigger: 0.05, delay: 0 },
        { surfer: 's002', side: 'right', scrollTrigger: 0.4, delay: 200 },
        { surfer: 's003', side: 'left', scrollTrigger: 0.6, delay: 400 },
        { surfer: 's004', side: 'right', scrollTrigger: 0.8, delay: 600 }
      ]
    },
    'aboutus': {
      positions: [
        { surfer: 's005', side: 'left', scrollTrigger: 0.05, delay: 0 },
        { surfer: 's001', side: 'right', scrollTrigger: 0.5, delay: 300 },
        { surfer: 's006', side: 'left', scrollTrigger: 0.8, delay: 500 }
      ]
    },
    'company': {
      positions: [
        { surfer: 's007', side: 'right', scrollTrigger: 0.05, delay: 0 },
        { surfer: 's002', side: 'left', scrollTrigger: 0.5, delay: 250 },
        { surfer: 's008', side: 'right', scrollTrigger: 0.8, delay: 450 }
      ]
    },
    'contact': {
      positions: [
        { surfer: 's001', side: 'left', scrollTrigger: 0.05, delay: 0 },
        { surfer: 's003', side: 'right', scrollTrigger: 0.5, delay: 200 },
        { surfer: 's004', side: 'left', scrollTrigger: 0.8, delay: 400 }
      ]
    },
    'recruit': {
      positions: [
        { surfer: 's005', side: 'right', scrollTrigger: 0.05, delay: 0 },
        { surfer: 's006', side: 'left', scrollTrigger: 0.5, delay: 300 },
        { surfer: 's007', side: 'right', scrollTrigger: 0.8, delay: 500 }
      ]
    },
    'privacy': {
      positions: [
        { surfer: 's008', side: 'left', scrollTrigger: 0.05, delay: 0 },
        { surfer: 's002', side: 'right', scrollTrigger: 0.7, delay: 200 }
      ]
    },
    'news': {
      positions: [
        { surfer: 's003', side: 'left', scrollTrigger: 0.05, delay: 0 },
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
    let activeElements = new Set();
    let elementQueue: number[] = [];
    let occupiedPositions: Array<{top: number, left: number, right: number}> = [];
    
    // 位置の重複チェック関数
    function isPositionOccupied(newTop: number, newLeft: number, newRight: number, imageWidth: number): boolean {
      const buffer = imageWidth * 0.3; // 30%のバッファ
      
      return occupiedPositions.some(pos => {
        const topOverlap = Math.abs(pos.top - newTop) < imageWidth + buffer;
        const leftOverlap = pos.left !== undefined && Math.abs(pos.left - newLeft) < imageWidth + buffer;
        const rightOverlap = pos.right !== undefined && Math.abs(pos.right - newRight) < imageWidth + buffer;
        
        return topOverlap && (leftOverlap || rightOverlap);
      });
    }
    
    // 位置を登録する関数
    function registerPosition(top: number, left?: number, right?: number) {
      occupiedPositions.push({ top, left, right });
    }
    
    // 位置を削除する関数
    function removePosition(top: number, left?: number, right?: number) {
      occupiedPositions = occupiedPositions.filter(pos => 
        !(pos.top === top && pos.left === left && pos.right === right)
      );
    }
    
    // クリック時の回転退出処理
    function handleSurferClick(element: HTMLElement, index: number) {
      // 既にクリック済みの場合は何もしない
      if (element.classList.contains('clicked')) return;
      
      // クリック済みマークを追加
      element.classList.add('clicked');
      element.classList.remove('animate-float');
      
      // 退出方向を決定
      const isLeftSide = element.classList.contains('left');
      const exitDirection = isLeftSide ? -window.innerWidth : window.innerWidth;
      
      // CSS変数で退出方向を設定
      element.style.setProperty('--exit-direction', `${exitDirection}px`);
      
      // アクティブリストから削除
      activeElements.delete(index);
      
      // 位置を削除
      const top = parseFloat(element.style.top);
      if (isLeftSide) {
        const left = parseFloat(element.style.left);
        removePosition(top, left);
      } else {
        const right = parseFloat(element.style.right);
        removePosition(top, undefined, right);
      }
      
      // アニメーション完了後に要素を非表示
      setTimeout(() => {
        element.style.display = 'none';
      }, 1500);
    }
    
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
          elementQueue.push(index);
          
          // 画像サイズを考慮した左右位置の計算
          const imageWidth = 240; // PC版の画像サイズ
          const mobileImageWidth = 120; // モバイル版の画像サイズ
          const currentImageWidth = window.innerWidth <= 768 ? mobileImageWidth : imageWidth;
          
          // 余白の計算
          const leftMargin = window.innerWidth * 0.1; // 左側10%の余白
          const rightMargin = window.innerWidth * 0.1; // 右側10%の余白
          const centerContentWidth = window.innerWidth * 0.8; // 中央コンテンツエリア80%
          
          // 重複しない位置を見つけるまで試行
          let randomTop, randomLeft, randomRight;
          let attempts = 0;
          const maxAttempts = 20;
          
          do {
            randomTop = Math.random() * (windowHeight * 0.6) + (windowHeight * 0.2); // 20%〜80%の範囲
            
            if (centerContentWidth > currentImageWidth * 2) {
              // 余白が十分な場合：余白範囲内でランダム配置（少しはみ出るのはOK）
              randomLeft = Math.random() * (leftMargin + currentImageWidth * 0.3);
              randomRight = Math.random() * (rightMargin + currentImageWidth * 0.3);
            } else {
              // 余白が少ない場合：画像が見える程度に少しはみ出る範囲
              const minLeft = -currentImageWidth * 0.2; // 20%はみ出し
              const maxLeft = leftMargin + currentImageWidth * 0.1; // 10%はみ出し
              const minRight = -currentImageWidth * 0.2; // 20%はみ出し
              const maxRight = rightMargin + currentImageWidth * 0.1; // 10%はみ出し
              
              randomLeft = Math.random() * (maxLeft - minLeft) + minLeft;
              randomRight = Math.random() * (maxRight - minRight) + minRight;
            }
            
            attempts++;
          } while (isPositionOccupied(randomTop, randomLeft, randomRight, currentImageWidth) && attempts < maxAttempts);
          
          // 要素の位置をランダムに設定（画面外からスライドイン）
          if (element.classList.contains('left')) {
            // 左側から登場：画面外の左側から目標位置へ
            element.style.left = `${randomLeft}px`;
            element.style.top = `${randomTop}px`;
            element.style.transform = `translateX(-${window.innerWidth}px) scale(0.8) translateY(-50%)`;
          } else {
            // 右側から登場：画面外の右側から目標位置へ
            element.style.right = `${randomRight}px`;
            element.style.top = `${randomTop}px`;
            element.style.transform = `translateX(${window.innerWidth}px) scale(0.8) translateY(-50%)`;
          }
          
          // 段階的なアニメーション
          setTimeout(() => {
            element.style.display = 'block';
            
            // 1. まず透明な状態で画面外に配置
            element.style.opacity = '0';
            
            // 2. フェードイン（まだ画面外にいる）
            setTimeout(() => {
              element.style.opacity = '1';
            }, 100);
            
            // 3. 移動アニメーション開始（見える状態で移動）
            setTimeout(() => {
              element.style.transform = `translateX(0) scale(0.8) translateY(-50%)`;
            }, 200);
            
            // 4. スケールアップ
            setTimeout(() => {
              element.style.transform = `translateX(0) scale(1) translateY(-50%)`;
              element.classList.add('animate-float');
              activeElements.add(index);
              
              // 位置を登録
              if (element.classList.contains('left')) {
                registerPosition(randomTop, randomLeft);
              } else {
                registerPosition(randomTop, undefined, randomRight);
              }
              
              // クリックイベントリスナーを追加
              element.addEventListener('click', () => handleSurferClick(element, index));
            }, 1400);
            
            // 3体目が出るタイミングで1体目を退出させる
            if (activeElements.size >= 3) {
              const oldestIndex = elementQueue.shift();
              if (oldestIndex !== undefined) {
                const oldestElement = document.querySelectorAll('.surfer-element')[oldestIndex] as HTMLElement;
                if (oldestElement) {
                  // 退出方向を決定（左右どちらから来たかで決める）
                  const isLeftSide = oldestElement.classList.contains('left');
                  const exitDirection = isLeftSide ? -window.innerWidth : window.innerWidth;
                  
                  // 1. まずフェードアウト + スケールダウン
                  oldestElement.style.opacity = '0';
                  oldestElement.style.transform = `translateX(0) scale(0.5) translateY(-50%)`;
                  
                  // 2. フェードアウト完了後に移動
                  setTimeout(() => {
                    oldestElement.style.transform = `translateX(${exitDirection}px) scale(0.5) translateY(-50%)`;
                  }, 300);
                  
                  activeElements.delete(oldestIndex);
                  
                  // 位置を削除
                  const oldestTop = parseFloat(oldestElement.style.top);
                  if (oldestElement.classList.contains('left')) {
                    const oldestLeft = parseFloat(oldestElement.style.left);
                    removePosition(oldestTop, oldestLeft);
                  } else {
                    const oldestRight = parseFloat(oldestElement.style.right);
                    removePosition(oldestTop, undefined, oldestRight);
                  }
                  
                  // 退出アニメーション完了後に要素を非表示
                  setTimeout(() => {
                    oldestElement.style.display = 'none';
                  }, 1200);
                }
              }
            }
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
    transform: translateX(-100px) scale(0.8);
    transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                scale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 10;
    pointer-events: auto;
    cursor: pointer;
  }

  .surfer-element.left {
    left: -20px; /* 余白25%を考慮して内側に寄せる */
  }

  .surfer-element.right {
    right: -20px; /* 余白25%を考慮して内側に寄せる */
  }

  .surfer-element.animate-slide-in {
    opacity: 1;
    transform: translateX(0) scale(1) translateY(-50%);
  }

  .surfer-element.animate-float {
    animation: float 4s ease-in-out infinite;
  }

  .surfer-element.clicked {
    animation: spinAndExit 1.5s ease-in-out forwards;
  }

  @keyframes spinAndExit {
    0% {
      transform: translateX(0) scale(1) translateY(-50%) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: translateX(0) scale(1.2) translateY(-50%) rotate(720deg);
      opacity: 0.8;
    }
    100% {
      transform: translateX(var(--exit-direction, 0px)) scale(0.3) translateY(-50%) rotate(1080deg);
      opacity: 0;
    }
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

  .surfer-element:hover .surfer-image {
    transform: scale(1.1);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(-50px) translateX(0) scale(1);
    }
    25% {
      transform: translateY(-58px) translateX(1px) scale(1.02);
    }
    50% {
      transform: translateY(-54px) translateX(-0.5px) scale(0.98);
    }
    75% {
      transform: translateY(-62px) translateX(0.5px) scale(1.01);
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
          style="top: 0; transform: translateY(-50%); display: none;"
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
