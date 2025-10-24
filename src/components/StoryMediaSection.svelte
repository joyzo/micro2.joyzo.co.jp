<script lang="ts">
  import { onMount } from "svelte";
  import type { Blog } from "../types/microcms/blogs";

  // microCMSから取得したニュースデータを受け取る
  export let news: Blog[] = [];

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

<section bind:this={sectionElement} class="story-media-section py-24">
  <div class="mx-auto max-w-none sm:max-w-6xl px-4">
    <!-- タイトル -->
    <div 
      class="mb-20 text-center transition-all duration-700"
      class:opacity-100={isVisible}
      class:opacity-0={!isVisible}
      class:translate-y-0={isVisible}
      class:translate-y-8={!isVisible}
    >
      <h2 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl" style="letter-spacing: -0.05em;">
        NEWS
      </h2>
      <p class="text-xl text-gray-600">
        私たちの日常や技術的な取り組みを発信しています
      </p>
    </div>


    <!-- 最新記事プレビュー -->
    <div class="rounded-2xl bg-white p-8 shadow-lg">
      <div class="grid gap-8 md:grid-cols-3">
        {#each news as blog, index}
          <a
            href={`/news/${blog.id}`}
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
                <!-- タグと日付をタイトルの上に配置 -->
                <div class="mb-3 flex items-center gap-2">
                  <div class="flex items-center gap-2">
                    {#if blog.tag}
                      {@const displayTags = (() => {
                        let tags = [];
                        if (Array.isArray(blog.tag)) {
                          tags = blog.tag.map(tag => {
                            if (typeof tag === 'string') {
                              return tag;
                            } else if (tag && typeof tag === 'object') {
                              return tag.name || tag.label || tag.value || tag.id || tag;
                            }
                            return tag;
                          });
                        } else if (typeof blog.tag === 'object') {
                          tags = [blog.tag.name || blog.tag.label || blog.tag.value || blog.tag.id || blog.tag];
                        } else if (typeof blog.tag === 'string') {
                          tags = [blog.tag];
                        }
                        return tags;
                      })()}
                      
                      {#if displayTags.length > 0}
                        <span class="inline-flex items-center gap-1">
                          {#each displayTags as tag}
                            {@const getTagColor = (tagText) => {
                              const tag = tagText.toLowerCase().trim();
                              // 完全一致を最優先
                              if (tag === 'update') return 'bg-emerald-600';
                              if (tag === 'news') return 'bg-blue-600';
                              if (tag === 'event') return 'bg-purple-600';
                              if (tag === 'release') return 'bg-orange-600';
                              if (tag === 'maintenance') return 'bg-red-600';
                              if (tag === 'media') return 'bg-cyan-600';
                              // 日本語の完全一致
                              if (tag === 'アップデート') return 'bg-emerald-600';
                              if (tag === 'お知らせ') return 'bg-blue-600';
                              if (tag === 'イベント') return 'bg-purple-600';
                              if (tag === 'リリース') return 'bg-orange-600';
                              if (tag === 'メンテナンス') return 'bg-red-600';
                              if (tag === 'メディア') return 'bg-cyan-600';
                              // 部分一致（除外条件付き）
                              if (tag.includes('update') && !tag.includes('news')) return 'bg-emerald-600';
                              if (tag.includes('news') && !tag.includes('update')) return 'bg-blue-600';
                              if (tag.includes('event')) return 'bg-purple-600';
                              if (tag.includes('release')) return 'bg-orange-600';
                              if (tag.includes('maintenance')) return 'bg-red-600';
                              if (tag.includes('media')) return 'bg-cyan-600';
                              return 'bg-gray-600'; // デフォルト色
                            }}
                            <span class="{getTagColor(tag)} text-white text-xs font-bold px-2 py-1 rounded">
                              {tag}
                            </span>
                          {/each}
                        </span>
                      {/if}
                    {/if}
                  </div>
                  <div class="text-xs text-gray-500">{formatDate(blog.release_date)}</div>
                </div>
                
                <h4
                  class="mb-3 font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-700"
                >
                  {blog.title}
                </h4>
                <p class="text-sm text-gray-600 whitespace-pre-line">{blog.overview || truncateText(stripHtml(blog.content))}</p>
              </div>
            </div>
          </a>
        {/each}
      </div>
      <div class="mt-8 text-center">
        <a
          href="/news/1"
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
