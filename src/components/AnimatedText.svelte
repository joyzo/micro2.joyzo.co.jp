<script lang="ts">
  import { onMount } from 'svelte';
  
  export let text: string;
  export let className: string = '';
  export let delay: number = 0.03;
  export let duration: number = 1;
  
  let isVisible = false;
  let textRef: HTMLDivElement;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (textRef) {
      observer.observe(textRef);
    }
    
    return () => {
      if (textRef) {
        observer.unobserve(textRef);
      }
    };
  });
</script>

<div bind:this={textRef} class="flex flex-wrap {className}">
  {#each text.split('') as char, index}
    <span
      class="inline-block"
      style="
        animation: {isVisible ? `text-scramble ${duration}s ease-out forwards` : 'none'};
        animation-delay: {index * delay}s;
        opacity: {isVisible ? 1 : 0};
        transform: {isVisible ? 'translateY(0)' : 'translateY(20px)'};
        transition: opacity 0.5s, transform 0.5s;
        transition-delay: {index * delay}s;
      "
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  {/each}
</div>

<style>
  @keyframes text-scramble {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>