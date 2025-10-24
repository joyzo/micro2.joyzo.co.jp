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

<section bind:this={sectionElement} class="anniversary-section py-24">
  <div class="mx-auto max-w-none sm:max-w-6xl px-4">
    <div class="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
      <!-- テキストコンテンツ -->
      <div class="space-y-6 lg:space-y-8 order-2 lg:order-2">
        <div class="space-y-4 lg:space-y-6">
          <h2
            class="tracking-tighter font-heading text-4xl font-black leading-tight text-gray-900 md:text-5xl lg:text-6xl transition-all duration-700"
            class:opacity-100={isVisible}
            class:opacity-0={!isVisible}
            class:translate-y-0={isVisible}
            class:translate-y-8={!isVisible}
            style="letter-spacing: -0.05em;"
          >
            CELEBRATING 15 YEARS
          </h2>
          <p 
            class="text-xl lg:text-2xl text-gray-600 transition-all duration-700 delay-200"
            class:opacity-100={isVisible}
            class:opacity-0={!isVisible}
            class:translate-y-0={isVisible}
            class:translate-y-8={!isVisible}
          >
            Thank you for your continued support
          </p>
        </div>

        <p 
          class="text-base lg:text-lg leading-relaxed text-gray-700 transition-all duration-700 delay-300"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          ジョイゾーはお陰様で15周年を迎えました。<br />
          これまで支えてくださった皆様への感謝を込めて、<br />
          これからも「ENJOY YOUR WORLD.」を実現していきます。
        </p>

        <div 
          class="flex flex-col gap-3 lg:gap-4 pt-4 lg:pt-6 sm:flex-row transition-all duration-700 delay-400"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          <a
            href="/company"
            class="inline-flex items-center justify-center rounded-none bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
          >
            会社の歩みを見る
          </a>
          <a
            href="/aboutjoyzo"
            class="inline-flex items-center justify-center rounded-none border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition-colors duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            ストーリーを見る
          </a>
        </div>
      </div>

      <!-- 15周年ロゴ -->
      <div 
        class="relative order-1 lg:order-1 transition-all duration-700 delay-500"
        class:opacity-100={isVisible}
        class:opacity-0={!isVisible}
        class:translate-y-0={isVisible}
        class:translate-y-8={!isVisible}
      >
        <div class="relative overflow-hidden rounded-2xl shadow-xl bg-white p-6 lg:p-8">
          <img
            src="/images/season/logo_15th.png"
            alt="JOYZO 15周年記念ロゴ"
            class="w-full h-auto object-contain max-h-80 lg:max-h-96"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .anniversary-section {
    /* background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); */
    position: relative;
  }
  
  .anniversary-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.3;
  }
  
  .anniversary-section > * {
    position: relative;
    z-index: 1;
  }
</style>
