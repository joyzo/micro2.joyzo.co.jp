<script>
  import { onMount, onDestroy, tick } from 'svelte';
  
  export let trigger = "top 80%";
  export let end = "bottom 20%";
  export let duration = 0.8;
  export let delay = 0;
  export let stagger = 0.1;
  export let ease = "power2.out";
  export let y = 30;
  export let x = 0;
  export let scale = 1;
  export let opacity = 1;
  export let rotation = 0;
  
  let containerElement;
  let animationElements = [];
  let scrollTrigger;
  
  onMount(async () => {
    if (typeof window === 'undefined') return;
    
    try {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger.js');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // アニメーション対象の要素を検出
      await tick();
      if (containerElement) {
        animationElements = Array.from(containerElement.querySelectorAll('[data-scroll-animate]'));
        
        // 要素が見つからない場合は、直接の子要素を対象にする
        if (animationElements.length === 0) {
          animationElements = Array.from(containerElement.children);
        }
      }
      
      if (animationElements.length === 0) return;
      
      // 初期状態を設定
      gsap.set(animationElements, {
        opacity: 0,
        y: y,
        x: x,
        scale: scale,
        rotation: rotation,
      });
      
      // アニメーション実行
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerElement,
          start: trigger,
          end: end,
          toggleActions: "play none none reverse",
        }
      });
      
      tl.to(animationElements, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: duration,
        ease: ease,
        stagger: stagger,
        delay: delay,
      });
      
      scrollTrigger = tl.scrollTrigger;
      
      // prefers-reduced-motion対応
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(animationElements, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
        });
        scrollTrigger.disable();
      }
      
    } catch (error) {
      console.warn('ScrollAnimation initialization failed:', error);
    }
  });
  
  onDestroy(() => {
    if (scrollTrigger) {
      scrollTrigger.kill();
    }
  });
</script>

<div bind:this={containerElement}>
  <slot />
</div>

<style>
  div {
    will-change: transform, opacity;
  }
</style>