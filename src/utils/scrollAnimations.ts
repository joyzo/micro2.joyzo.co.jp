import type Lenis from "lenis";

let lenis: Lenis | null = null;

export async function initScrollAnimations() {
  // クライアントサイドでのみGSAPとLenisを読み込み
  if (typeof window === 'undefined') return null;
  
  const { default: gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger.js');
  const Lenis = await import('lenis');
  
  // GSAP ScrollTrigger プラグイン登録
  gsap.registerPlugin(ScrollTrigger);
  
  // Lenis スムーススクロール初期化
  lenis = new Lenis.default({
    duration: 0.4, // 0.6から0.4に短縮
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1, // 0.05から0.1に変更してよりスムーズに
  });
  
  // Lenisインスタンスをグローバルに公開（smoothScroll.tsで使用）
  (window as any).lenis = lenis;
  
  function raf(time: number) {
    if (lenis) {
      lenis.raf(time);
    }
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  // GSAP ScrollTrigger と連携
  lenis.on('scroll', ScrollTrigger.update);
  
  // ScrollTriggerの更新頻度を調整
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    // スクロール処理の最適化
    limitCallbacks: true,
    syncInterval: 16 // 60fpsに最適化
  });
  
  // prefers-reduced-motion対応
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // アニメーションを無効化
    gsap.set('[data-scroll-animation]', { 
      opacity: 1, 
      scale: 1, 
      clipPath: "inset(0 0% 0 0)", 
      y: 0 
    });
  }
  
  return lenis;
}

export async function destroyScrollAnimations() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  
  // グローバル変数もクリーンアップ
  if (typeof window !== 'undefined') {
    (window as any).lenis = null;
  }
  
  // クライアントサイドでのみScrollTriggerをクリーンアップ
  if (typeof window !== 'undefined') {
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger.js');
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    } catch (error) {
      console.warn('ScrollTrigger cleanup failed:', error);
    }
  }
}

// ページ離脱時のクリーンアップ
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', destroyScrollAnimations);
}
