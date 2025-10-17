<script lang="ts">
  // メディアデータ
  const mediaLinks = [
    {
      title: "note",
      description: "ジョイゾーの日常や技術記事",
      url: "https://note.com/joyzo",
      icon: "note",
    },
    {
      title: "X (Twitter)",
      description: "最新情報や社内の様子",
      url: "https://twitter.com/joyzo_company",
      icon: "twitter",
    },
    {
      title: "キントマニアブログ",
      description: "kintone活用事例やTips",
      url: "https://kintomania.com",
      icon: "blog",
    },
  ];

  // 最新記事データ
  const latestArticles = [
    {
      title: "kintoneで作る業務効率化システム",
      description: "お客様の課題を解決した事例をご紹介します。",
      date: "2024.01.15",
      image: "/images/top/about.png",
      url: "https://note.com/joyzo/article1",
    },
    {
      title: "JOYZOの働き方改革",
      description: "私たちが実践しているリモートワークの工夫について。",
      date: "2024.01.10",
      image: "/images/top/image_001.jpg",
      url: "https://note.com/joyzo/article2",
    },
    {
      title: "kintone認定資格取得のコツ",
      description: "効率的な学習方法と試験対策のポイントを解説。",
      date: "2024.01.05",
      image: "/images/company.jpg",
      url: "https://note.com/joyzo/article3",
    },
  ];
</script>

<section class="story-media-section py-24">
  <div class="mx-auto max-w-none sm:max-w-6xl px-4">
    <!-- タイトル -->
    <div class="mb-20 text-center">
      <h2 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl" style="letter-spacing: -0.05em;">
        ジョイゾーのストーリー
      </h2>
      <p class="text-xl text-gray-600">
        私たちの日常や技術的な取り組みを発信しています
      </p>
    </div>

    <!-- メディアリンク -->
    <div class="mb-20">
      <h3 class="mb-12 text-center text-3xl font-bold text-gray-900">
        メディア・SNS
      </h3>
      <div class="grid gap-8 md:grid-cols-3">
        {#each mediaLinks as media}
          <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            class="media-card group block"
          >
            <div
              class="h-full rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div class="text-center">
                <div
                  class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100"
                >
                  {#if media.icon === "note"}
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  {:else if media.icon === "twitter"}
                    <svg
                      class="h-10 w-10 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                  {:else if media.icon === "blog"}
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  {/if}
                </div>
                <h4
                  class="mb-3 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-700"
                >
                  {media.title}
                </h4>
                <p class="mb-4 text-gray-600">{media.description}</p>
                <div
                  class="inline-flex items-center font-semibold text-gray-700"
                >
                  見に行く
                  <svg
                    class="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>

    <!-- 最新記事プレビュー -->
    <div class="rounded-2xl bg-white p-8 shadow-lg">
      <h3 class="mb-12 text-center text-3xl font-bold text-gray-900">
        最新記事
      </h3>
      <div class="grid gap-8 md:grid-cols-3">
        {#each latestArticles as article}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            class="article-card group block"
          >
            <div
              class="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={article.image}
                  alt={article.title}
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-6">
                <h4
                  class="mb-3 font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-700"
                >
                  {article.title}
                </h4>
                <p class="mb-3 text-sm text-gray-600">{article.description}</p>
                <div class="text-xs text-gray-500">{article.date}</div>
              </div>
            </div>
          </a>
        {/each}
      </div>
      <div class="mt-8 text-center">
        <a
          href="https://note.com/joyzo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center font-semibold text-gray-700 transition-colors duration-300 hover:text-gray-900"
        >
          もっと記事を見る
          <svg
            class="ml-2 h-4 w-4"
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
  </div>
</section>

<style>
  .story-media-section {
    /* background: #fafafa; */
    position: relative;
  }
</style>
