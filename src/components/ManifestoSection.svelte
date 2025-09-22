<script lang="ts">
  import { onMount } from "svelte";

  // ピックアップマニフェストデータ（3個に絞る）
  const featuredManifestos = [
    {
      title: "ハローワールド",
      subtitle: "楽しむから、変わる",
      description:
        "私たちは、仕事も人生も「楽しい」を追求します。楽しさから生まれる創造性とエネルギーが、新しい価値を生み出していくのです。",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "フッカラー",
      subtitle: "試して、変えて、前に行け",
      description:
        "失敗を恐れず、まずは試してみる。そして改善を重ね、前に進み続ける。それが私たちの姿勢です。",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "リスペリレー",
      subtitle: "信頼はひとりでは作れない",
      description:
        "お客様、パートナー、チームメンバー。すべての関係性を大切にし、信頼の輪を広げていきます。",
      color: "from-red-500 to-red-600",
    },
  ];

  let currentIndex = 0;
  let isMobile = false;

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  });

  function nextCard() {
    if (isMobile) {
      currentIndex = (currentIndex + 1) % featuredManifestos.length;
    }
  }

  function prevCard() {
    if (isMobile) {
      currentIndex =
        currentIndex === 0 ? featuredManifestos.length - 1 : currentIndex - 1;
    }
  }
</script>

<section class="manifesto-section py-24">
  <div class="container mx-auto max-w-6xl px-4">
    <!-- タイトル -->
    <div class="mb-20 text-center">
      <h2
        class="tracking-tighter mb-6 font-heading text-5xl font-black leading-tight text-gray-900 md:text-6xl"
      >
        MANIFESTO
      </h2>
      <p class="text-xl text-gray-600">私たちの価値観と世界観</p>
    </div>

    <!-- デスクトップ表示（3列グリッド） -->
    <div class="mb-16 hidden gap-8 md:grid md:grid-cols-3">
      {#each featuredManifestos as manifesto, index}
        <div
          class="manifesto-card group transform cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <div
            class="h-full rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <div class="text-center">
              <div
                class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100"
              >
                <span class="text-2xl font-bold text-gray-700">{index + 1}</span
                >
              </div>
              <h3 class="mb-3 text-2xl font-bold text-gray-900">
                {manifesto.title}
              </h3>
              <p class="mb-4 text-lg font-medium text-gray-600">
                {manifesto.subtitle}
              </p>
              <p class="text-sm leading-relaxed text-gray-500">
                {manifesto.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- モバイル表示（スワイプ） -->
    <div class="relative mb-16 md:hidden">
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          style="transform: translateX(-{currentIndex * 100}%)"
        >
          {#each featuredManifestos as manifesto, index}
            <div class="w-full flex-shrink-0 px-4">
              <div class="manifesto-card rounded-2xl bg-white p-8 shadow-lg">
                <div class="text-center">
                  <div
                    class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100"
                  >
                    <span class="text-2xl font-bold text-gray-700"
                      >{index + 1}</span
                    >
                  </div>
                  <h3 class="mb-3 text-2xl font-bold text-gray-900">
                    {manifesto.title}
                  </h3>
                  <p class="mb-4 text-lg font-medium text-gray-600">
                    {manifesto.subtitle}
                  </p>
                  <p class="text-sm leading-relaxed text-gray-500">
                    {manifesto.description}
                  </p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- ナビゲーションボタン -->
      <button
        on:click={prevCard}
        class="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl"
      >
        <svg
          class="h-6 w-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        on:click={nextCard}
        class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl"
      >
        <svg
          class="h-6 w-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <!-- インジケーター -->
    <div class="mb-12 flex justify-center space-x-2">
      {#each featuredManifestos as _, index}
        <button
          on:click={() => (currentIndex = index)}
          class="h-3 w-3 rounded-full transition-colors duration-300 {index ===
          currentIndex
            ? 'bg-gray-600'
            : 'bg-gray-300'}"
        />
      {/each}
    </div>

    <!-- CTA -->
    <div class="text-center">
      <a
        href="/aboutus"
        class="inline-flex items-center text-lg font-semibold text-gray-700 transition-colors duration-300 hover:text-gray-900"
      >
        ジョイゾーの世界観をもっと読む
        <svg
          class="ml-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  .manifesto-section {
    background: #ffffff;
    position: relative;
  }
</style>
