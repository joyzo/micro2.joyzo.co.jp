<script lang="ts">
  import { onMount } from "svelte";

  let isVisible = false;
  let showContent = false;

  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 300);

    setTimeout(() => {
      showContent = true;
    }, 800);
  });
</script>

<!-- リクルートバナーセクション -->
<section class="relative overflow-hidden bg-black">
  <!-- 背景画像 -->
  <div class="absolute inset-0">
    <img
      src="/images/top/image_001.jpg"
      alt="JOYZOの社員たち"
      class="h-full w-full object-cover opacity-40"
    />
  </div>

  <!-- メインコンテンツ -->
  <div class="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-4">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- テキストコンテンツ -->
      <div class="text-center lg:text-left">
        <h2
          class="mb-6 font-heading text-4xl font-black text-white md:text-5xl lg:text-6xl leading-tight"
        >
          <span
            class="transition-all duration-500"
            class:opacity-100={isVisible}
            class:opacity-0={!isVisible}
            class:translate-y-0={isVisible}
            class:translate-y-8={!isVisible}
          >
            お客様と共に『価値』を創る<br />
            プロフェッショナルへ。
          </span>
        </h2>

        <p
          class="mb-8 text-lg font-light leading-relaxed text-gray-300 md:text-xl"
        >
          <span
            class="delay-200 transition-all duration-700"
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
            class:translate-y-0={showContent}
            class:translate-y-8={!showContent}
          >
            仕事を楽しむ姿でチームを活気づけ、社会を変える。<br />
            そんな働き方をしてみませんか？
          </span>
        </p>

        <div
          class="delay-400 transition-all duration-700"
          class:opacity-100={showContent}
          class:opacity-0={!showContent}
          class:translate-y-0={showContent}
          class:translate-y-8={!showContent}
        >
          <a
            href="/recruit"
            class="inline-flex items-center rounded-none bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-gray-100 hover:scale-105"
          >
            採用情報を見る
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- 装飾的な要素 -->
      <div class="hidden lg:block">
        <div class="relative">
          <!-- 背景の装飾的な円 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="h-64 w-64 rounded-full border-2 border-white/20"></div>
            <div class="absolute h-48 w-48 rounded-full border border-white/30"></div>
            <div class="absolute h-32 w-32 rounded-full border border-white/40"></div>
          </div>
          
          <!-- 中央のテキスト -->
          <div class="relative z-10 flex h-64 items-center justify-center">
            <div class="text-center">
              <div class="font-english text-6xl font-black text-white/80 mb-2">
                RECRUIT
              </div>
              <div class="text-sm text-white/60">
                一緒に働きませんか？
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
