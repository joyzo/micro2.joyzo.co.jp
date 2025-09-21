<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let delay: number = 0;
  export let duration: number = 0.8;
  export let threshold: number = 0.1;
  
  let element: HTMLElement;
  let observer: IntersectionObserver;
  let isVisible = false;
  
  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateX(0)';
            }, delay);
          }
        });
      },
      { 
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateX(30px)';
      element.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
      
      observer.observe(element);
    }
    
    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  });
  
  onDestroy(() => {
    if (observer && element) {
      observer.unobserve(element);
    }
  });
</script>

<div bind:this={element}>
  <slot />
</div>

<style>
  div {
    will-change: transform, opacity;
  }
</style>

