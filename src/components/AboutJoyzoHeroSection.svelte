<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let isVisible = false;
  let sectionElement: HTMLElement;
  let currentSlide = 0;
  let slideInterval: number;

  const slides = [
    { src: "/images/joyster.png", alt: "JOYZO", duration: 4000 }, // JOYZOロゴを最初に長めに表示
    { src: "/images/slideshow/slide1.jpg", alt: "", duration: 2000 },
    { src: "/images/slideshow/slide2.jpg", alt: "", duration: 2000 },
    { src: "/images/slideshow/slide3.jpg", alt: "", duration: 2000 },
    { src: "/images/slideshow/slide4.jpg", alt: "", duration: 2000 },
    { src: "/images/slideshow/slide5.jpg", alt: "", duration: 2000 },
    { src: "/images/slideshow/slide6.jpg", alt: "", duration: 2000 },
    { src: "/images/slideshow/slide7.jpg", alt: "", duration: 2000 }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            startSlideShow();
          } else {
            stopSlideShow();
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      observer.disconnect();
      stopSlideShow();
    };
  });

  onDestroy(() => {
    stopSlideShow();
  });

  function startSlideShow() {
    stopSlideShow();
    // 最初のスライド（JOYZOロゴ）を表示
    currentSlide = 0;
    slideInterval = setTimeout(() => {
      nextSlide();
    }, slides[0].duration);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    slideInterval = setTimeout(() => {
      nextSlide();
    }, slides[currentSlide].duration);
  }

  function stopSlideShow() {
    if (slideInterval) {
      clearTimeout(slideInterval);
    }
  }
</script>

<section bind:this={sectionElement} class="about-joyzo-hero-section py-24">
  <div class="mx-auto max-w-none px-4">
    <div class="mx-auto max-w-6xl">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <!-- テキストコンテンツ -->
        <div class="space-y-8">
          <div class="space-y-6">
            <h1
              class="tracking-tighter font-heading text-6xl font-black leading-tight text-gray-900 md:text-7xl lg:text-8xl transition-all duration-700"
              class:opacity-100={isVisible}
              class:opacity-0={!isVisible}
              class:translate-y-0={isVisible}
              class:translate-y-8={!isVisible}
              style="letter-spacing: -0.05em;"
            >
              ENJOY<br />
              YOUR<br />
              WORLD.
            </h1>
          </div>

          <p 
            class="text-lg leading-relaxed text-gray-700 transition-all duration-700 delay-200"
            class:opacity-100={isVisible}
            class:opacity-0={!isVisible}
            class:translate-y-0={isVisible}
            class:translate-y-8={!isVisible}
          >
            私たちは、DXと働き方の変化を通じて、<br />
            お客様の世界をより楽しくすることを目指す企業です。
          </p>
        </div>

        <!-- スライドショー画像 -->
        <div 
          class="relative transition-all duration-700 delay-500 overflow-hidden"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          <div class="relative h-96 w-full">
            {#each slides as slide, index}
              <img
                src={slide.src}
                alt={slide.alt}
                class="absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out"
                class:object-contain={slide.src.includes('joyster')}
                class:object-cover={!slide.src.includes('joyster')}
                class:p-8={slide.src.includes('joyster')}
                class:opacity-100={currentSlide === index}
                class:opacity-0={currentSlide !== index}
                class:scale-105={currentSlide === index}
                class:scale-100={currentSlide !== index}
                loading="lazy"
              />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-joyzo-hero-section {
    background: linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(241, 245, 249, 0.7) 50%, rgba(226, 232, 240, 0.7) 100%);
    position: relative;
  }
</style>
