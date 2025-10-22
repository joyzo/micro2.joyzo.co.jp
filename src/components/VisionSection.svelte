<script lang="ts">
  // ビジョンセクションのコンポーネント
</script>

<section class="vision-section py-24">
  <div class="mx-auto max-w-none sm:max-w-6xl px-4">
    <div class="grid items-center gap-16 lg:grid-cols-2">
      <!-- テキストコンテンツ -->
      <div class="space-y-8">
        <div class="space-y-6">
          <h2
            class="tracking-tighter font-heading text-5xl font-black leading-tight text-gray-900 md:text-6xl"
            style="letter-spacing: -0.05em;"
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
            class="inline-flex items-center justify-center rounded-none border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition-colors duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            会社概要を見る
          </a>
        </div>
      </div>

      <!-- 背景画像 -->
      <div class="relative">
        <div class="relative rounded-2xl shadow-xl p-8">
          <img
            src="/images/joyster.png"
            alt="JOYZO"
            class="h-96 w-full object-contain"
          />
          <div
            class="absolute inset-0 gradient-overlay"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .vision-section {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
    position: relative;
  }

  .gradient-overlay {
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.05) 25%, rgba(79, 70, 229, 0.12) 50%, rgba(67, 56, 202, 0.06) 75%, rgba(55, 48, 163, 0.10) 100%);
    background-size: 400% 400%;
    animation: seamlessGradientFlow 12s ease-in-out infinite;
  }

  @keyframes seamlessGradientFlow {
    0% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 50%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
