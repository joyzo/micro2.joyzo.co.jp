import type Lenis from "lenis";

let lenis: Lenis | null = null;
let isInitialized = false;

export async function initScrollAnimations() {
  // 既に初期化済みの場合は何もしない
  if (isInitialized) return lenis;

  // クライアントサイドでのみ実行
  if (typeof window === "undefined") return null;

  try {
    const { default: gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger.js");
    const Lenis = await import("lenis");

    // GSAP ScrollTrigger プラグイン登録
    gsap.registerPlugin(ScrollTrigger);

    // Lenis スムーススクロール初期化
    lenis = new Lenis.default({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Lenisインスタンスをグローバルに公開
    (window as any).lenis = lenis;

    // RAF ループ
    function raf(time: number) {
      if (lenis) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger と連携
    lenis.on("scroll", ScrollTrigger.update);

    // ScrollTriggerの設定
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    // prefers-reduced-motion対応
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // アニメーションを無効化
      gsap.set("[data-scroll-animate]", {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        rotation: 0,
      });
    }

    isInitialized = true;
    return lenis;
  } catch (error) {
    console.warn("Scroll animations initialization failed:", error);
    return null;
  }
}

export async function destroyScrollAnimations() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  // グローバル変数もクリーンアップ
  if (typeof window !== "undefined") {
    (window as any).lenis = null;
  }

  // ScrollTriggerをクリーンアップ
  if (typeof window !== "undefined") {
    try {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger.js");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    } catch (error) {
      console.warn("ScrollTrigger cleanup failed:", error);
    }
  }

  isInitialized = false;
}

// ページ離脱時のクリーンアップ
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", destroyScrollAnimations);
}
