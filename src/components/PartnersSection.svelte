<script lang="ts">
  // 地域活動データ
  const activities = [
    {
      title: "地域IT支援",
      description: "地元企業のDX推進をサポート",
      icon: "building",
    },
    {
      title: "学生向けワークショップ",
      description: "次世代のIT人材育成",
      icon: "graduation",
    },
    {
      title: "コミュニティ活動",
      description: "地域コミュニティとの連携",
      icon: "community",
    },
  ];
</script>

<section class="partners-section py-24">
  <div class="container mx-auto max-w-6xl px-4">
    <!-- タイトル -->
    <div class="mb-20 text-center">
      <h2 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
        共に歩むパートナー
      </h2>
      <p class="text-xl text-gray-600">
        信頼できるパートナーと共に、お客様のDXをサポートしています
      </p>
    </div>

    <!-- 地域活動 -->
    <div class="mb-20">
      <h3 class="mb-12 text-center text-3xl font-bold text-gray-900">
        地域活動
      </h3>
      <div class="grid gap-8 md:grid-cols-3">
        {#each activities as activity}
          <div
            class="activity-card rounded-2xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <div
              class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100"
            >
              {#if activity.icon === "building"}
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              {:else if activity.icon === "graduation"}
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
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              {:else if activity.icon === "community"}
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              {/if}
            </div>
            <h4 class="mb-3 text-2xl font-bold text-gray-900">
              {activity.title}
            </h4>
            <p class="text-gray-600">{activity.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- 実績サマリー -->
    <div class="mb-16">
      <h3 class="mb-12 text-center text-3xl font-bold text-gray-900">
        実績サマリー
      </h3>
      <div class="grid gap-12 md:grid-cols-3">
        <!-- 導入企業数 - シンプルな数値表示 -->
        <div class="text-center">
          <div
            class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-gray-100"
          >
            <div class="text-center">
              <div class="text-4xl font-bold text-gray-900">100+</div>
              <div class="text-sm text-gray-600">企業</div>
            </div>
          </div>
          <p class="text-lg font-medium text-gray-700">導入企業数</p>
          <p class="text-sm text-gray-500">お客様の数</p>
        </div>

        <!-- サポート実績 - シンプルな数値表示 -->
        <div class="text-center">
          <div
            class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-gray-100"
          >
            <div class="text-center">
              <div class="text-4xl font-bold text-gray-900">5年+</div>
              <div class="text-sm text-gray-600">継続</div>
            </div>
          </div>
          <p class="text-lg font-medium text-gray-700">サポート実績</p>
          <p class="text-sm text-gray-500">継続サポート年数</p>
        </div>

        <!-- 顧客満足度 - シンプルな数値表示 -->
        <div class="text-center">
          <div
            class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-gray-100"
          >
            <div class="text-center">
              <div class="text-4xl font-bold text-gray-900">98%</div>
              <div class="text-sm text-gray-600">満足</div>
            </div>
          </div>
          <p class="text-lg font-medium text-gray-700">顧客満足度</p>
          <p class="text-sm text-gray-500">満足度評価</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center">
      <a
        href="/company"
        class="inline-flex items-center rounded-none bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
      >
        お客様の声を見る
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
  .partners-section {
    background: #fafafa;
    position: relative;
  }

  .activity-card {
    min-height: 240px;
  }
</style>
