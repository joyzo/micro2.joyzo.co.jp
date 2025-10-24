<script lang="ts">
  import { onMount } from "svelte";

  let isVisible = false;
  let sectionElement: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
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
    };
  });
</script>

<section bind:this={sectionElement} class="vision-section py-24">
  <div class="mx-auto max-w-none sm:max-w-6xl px-4">
    <div class="grid items-center gap-16 lg:grid-cols-2">
      <!-- テキストコンテンツ -->
      <div class="space-y-8">
        <div class="space-y-6">
          <h2
            class="tracking-tighter font-heading text-5xl font-black leading-tight text-gray-900 md:text-6xl transition-all duration-700"
            class:opacity-100={isVisible}
            class:opacity-0={!isVisible}
            class:translate-y-0={isVisible}
            class:translate-y-8={!isVisible}
            style="letter-spacing: -0.05em;"
          >
            ENJOY YOUR WORLD.
          </h2>
          <p 
            class="text-2xl text-gray-600 transition-all duration-700 delay-200"
            class:opacity-100={isVisible}
            class:opacity-0={!isVisible}
            class:translate-y-0={isVisible}
            class:translate-y-8={!isVisible}
          >
            仕事を、生活を、未来を、楽しめ。
          </p>
        </div>

        <p 
          class="text-lg leading-relaxed text-gray-700 transition-all duration-700 delay-300"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          きっと、楽しいはずのこと。<br />
          世界をもっと快適に、もっと創造的に。
        </p>

        <div 
          class="flex flex-col gap-4 pt-6 sm:flex-row transition-all duration-700 delay-400"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          <a
            href="https://service.joyzo.co.jp"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-none bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
          >
            サービスを見る
            <svg
              class="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <a
            href="/company"
            class="inline-flex items-center justify-center rounded-none border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition-colors duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            会社概要を見る
          </a>
        </div>
      </div>

      <!-- 背景画像 -->
      <div 
        class="relative transition-all duration-700 delay-500"
        class:opacity-100={isVisible}
        class:opacity-0={!isVisible}
        class:translate-y-0={isVisible}
        class:translate-y-8={!isVisible}
      >
        <img
          src="/images/joyster.png"
          alt="JOYZO"
          class="h-96 w-full object-contain"
        />
      </div>
    </div>
  </div>
</section>

<style>
  .vision-section {
    background: linear-gradient(135deg, rgba(254, 254, 254, 0.7) 0%, rgba(254, 252, 232, 0.7) 50%, rgba(254, 243, 199, 0.7) 100%);
    position: relative;
  }

</style>
