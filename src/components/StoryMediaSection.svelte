<script lang="ts">
  import type { Blog } from "../types/microcms/blogs";

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

  // microCMSから取得したブログデータを受け取る
  export let blogs: Blog[] = [];

  // 日付フォーマット関数
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '.');
  }

  // HTMLタグを除去してプレーンテキストに変換（改行を保持）
  function stripHtml(html: string): string {
    return html
      .replace(/<br\s*\/?>/gi, '\n') // <br>タグを改行に変換
      .replace(/<\/p>/gi, '\n') // </p>タグを改行に変換
      .replace(/<[^>]*>/g, '') // その他のHTMLタグを除去
      .replace(/&nbsp;/g, ' ') // &nbsp;をスペースに変換
      .replace(/&amp;/g, '&') // &amp;を&に変換
      .replace(/&lt;/g, '<') // &lt;を<に変換
      .replace(/&gt;/g, '>') // &gt;を>に変換
      .replace(/&quot;/g, '"') // &quot;を"に変換
      .replace(/&#39;/g, "'") // &#39;を'に変換
      .replace(/\n\s*\n/g, '\n') // 連続する改行を1つに
      .trim();
  }

  // テキストを指定文字数で切り詰める
  function truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // 画像URLを取得（複数のフィールド名に対応）
  function getImageUrl(blog: Blog): string | null {
    return blog.thumbnail?.url || blog.eyecatch?.url || blog.image?.url || null;
  }

  // 記事URLを取得（複数のフィールド名に対応）
  function getArticleUrl(blog: Blog): string {
    return blog.articleUrl || blog.url || blog.link || '#';
  }
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
        {#each blogs as blog, index}
          <a
            href={getArticleUrl(blog)}
            target="_blank"
            rel="noopener noreferrer"
            class="article-card group block"
          >
            <div
              class="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                {#if getImageUrl(blog)}
                  <img
                    src={getImageUrl(blog)}
                    alt={blog.title}
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                {:else}
                  <div class="flex h-full w-full items-center justify-center text-gray-400">
                    <svg class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                {/if}
              </div>
              <div class="p-6">
                <h4
                  class="mb-3 font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-700"
                >
                  {blog.title}
                </h4>
                <p class="mb-3 text-sm text-gray-600 whitespace-pre-line">{truncateText(stripHtml(blog.content))}</p>
                <div class="text-xs text-gray-500">{formatDate(blog.release_date)}</div>
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
