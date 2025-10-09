<script lang="ts">
  // お問い合わせセクションのコンポーネント
</script>

<section class="contact-section py-24">
  <div class="mx-auto max-w-none sm:max-w-4xl px-4">
    <!-- メッセージ性のあるキャッチコピー -->
    <div class="mb-20 text-center">
      <h2 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
        お話ししませんか？
      </h2>
      <p class="mb-8 text-2xl text-gray-600">
        あなたのアイデアや課題を聞かせてください。<br />
        きっと一緒に解決策を見つけられるはずです。
      </p>
      <div class="mx-auto max-w-2xl">
        <p class="text-lg leading-relaxed text-gray-700">
          サービスに関するご質問、採用に関するお問い合わせ、<br />
          または「こんなことできるかな？」という相談まで、<br />
          どんなことでもお気軽にお声がけください。
        </p>
      </div>
    </div>

    <!-- メインお問い合わせカード -->
    <div class="mb-16 rounded-2xl bg-white p-12 shadow-lg">
      <div class="text-center">
        <div
          class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100"
        >
          <svg
            class="h-10 w-10 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 class="mb-4 text-3xl font-bold text-gray-900">
          お問い合わせフォーム
        </h3>
        <p class="mb-8 text-lg text-gray-600">
          まずはお話ししましょう。きっと何かが見えてきます。
        </p>
        <a
          href="/contact"
          class="inline-flex items-center rounded-none bg-gray-800 px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
        >
          お話しを始める
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

    <!-- 補足情報 -->
    <div class="text-center">
      <p class="text-lg text-gray-600">
        サービスに関するご相談は
        <a
          href="https://service.joyzo.co.jp"
          target="_blank"
          rel="noopener noreferrer"
          class="font-semibold text-gray-700 underline transition-all duration-300 hover:no-underline"
        >
          サービスサイト
        </a>
        でも承っております
      </p>
    </div>
  </div>
</section>

<style>
  .contact-section {
    background: #ffffff;
    position: relative;
  }
</style>
