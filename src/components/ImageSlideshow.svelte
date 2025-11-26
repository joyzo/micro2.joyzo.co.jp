<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentSlide = 0;
  let intervalId: number;
  
  const images = [
    // '/images/slideshow/slide1.jpg',
    // '/images/slideshow/slide2.jpg',
    '/images/slideshow/slide3.jpg',
    '/images/slideshow/slide4.jpg',
    // '/images/slideshow/slide5.jpg',
    '/images/slideshow/slide6.jpg',
    // '/images/slideshow/slide7.jpg'
  ];
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % images.length;
  };
  
  const prevSlide = () => {
    currentSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
  };
  
  const goToSlide = (index: number) => {
    currentSlide = index;
  };
  
  onMount(() => {
    // 自動スライド（5秒間隔）
    intervalId = setInterval(nextSlide, 5000);
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });
</script>

<div class="relative w-full h-[30vh] overflow-hidden bg-gray-100">
  <!-- 画像コンテナ -->
  <div class="relative w-full h-full">
    {#each images as image, index}
      <div 
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out {currentSlide === index ? 'opacity-100' : 'opacity-0'}"
      >
        <img 
          src={image} 
          alt="スライドショー画像 {index + 1}"
          class="w-full h-full object-cover object-center"
        />
      </div>
    {/each}
  </div>
  
  <!-- ナビゲーションボタン -->
  <button 
    on:click={prevSlide}
    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
    aria-label="前の画像"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </button>
  
  <button 
    on:click={nextSlide}
    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
    aria-label="次の画像"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </button>
  
  <!-- インジケーター -->
  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {#each images as _, index}
      <button 
        on:click={() => goToSlide(index)}
        class="w-3 h-3 rounded-full transition-all duration-200 {currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}"
        aria-label="スライド {index + 1} に移動"
      ></button>
    {/each}
  </div>
</div>

<style>
  /* スライドショーのスタイル */
</style>
