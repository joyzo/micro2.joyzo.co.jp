<script lang="ts">
  // ビジョンセクションのコンポーネント
</script>

<section class="vision-section py-24">
  <div class="container mx-auto max-w-6xl px-4">
    <div class="grid items-center gap-16 lg:grid-cols-2">
      <!-- テキストコンテンツ -->
      <div class="space-y-8">
        <div class="space-y-6">
          <h2
            class="tracking-tighter font-heading text-5xl font-black leading-tight text-gray-900 md:text-6xl"
          >
            ENJOY YOUR WORLD.
          </h2>
          <p class="text-2xl text-gray-600">仕事を、生活を、未来を、楽しめ。</p>
        </div>

        <p class="text-lg leading-relaxed text-gray-700">
          きっと、楽しいはずのこと。<br />
          世界をもっと快適に、もっと創造的に。
        </p>

        <div class="flex flex-col gap-4 pt-6 sm:flex-row">
          <a
            href="https://service.joyzo.co.jp"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-none bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
          >
            サービスを見る
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
          <a
            href="/company"
            class="inline-flex items-center justify-center rounded-none border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-colors duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            会社概要を見る
          </a>
        </div>
      </div>

      <!-- 背景画像 -->
      <div class="relative">
        <div class="relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src="/images/top/about.png"
            alt="社員・顧客・チームの雰囲気"
            class="h-96 w-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .vision-section {
    background: #fafafa;
    position: relative;
  }
</style>
