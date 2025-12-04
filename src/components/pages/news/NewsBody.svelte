<script lang="ts">
  import FormattedDate from "@components/FormattedDate.svelte";
  import InternalAnchor from "@components/InternalAnchor.svelte";
  import MicroCMSPicture from "@components/MicroCMSPicture.svelte";
  import type { KintoneNews } from "@types/kintone/news";

  export let content: KintoneNews;
</script>

<div class="mx-auto max-w-5xl">
  <div class="bg-white rounded-lg shadow-sm">
    <!-- タイトル部分（パディング多め） -->
    <div class="px-4 sm:px-8 md:px-16 lg:px-24 pt-20 pb-8">
      <!-- タグと日付をタイトルの上に配置 -->
      <div class="mb-3 flex items-center justify-start gap-2">
        <div class="flex items-center gap-2">
          {#if content.tag}
            {@const displayTags = (() => {
              let tags = [];
              if (Array.isArray(content.tag)) {
                tags = content.tag.map(tag => {
                  if (typeof tag === 'string') {
                    return tag;
                  } else if (tag && typeof tag === 'object') {
                    return tag.name || tag.label || tag.value || tag.id || tag;
                  }
                  return tag;
                });
              } else if (typeof content.tag === 'object') {
                tags = [content.tag.name || content.tag.label || content.tag.value || content.tag.id || content.tag];
              } else if (typeof content.tag === 'string') {
                tags = [content.tag];
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
        <FormattedDate
          date={content.release_date ?? content.publishedAt ?? content.createdAt}
          class="text-sm font-bold"
        />
      </div>

      <h1 class="text-[1.75rem] font-bold leading-normal">
        {content.title}
      </h1>
    </div>

    <!-- 記事内容部分（パディングなしでタイトルと横幅を揃える） -->
    <div class="px-4 sm:px-8 md:px-16 lg:px-24 pb-8">
      <div
        class="prose max-w-none mx-auto mt-12 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg [&_*]:text-main"
      >
        {@html content.content}
      </div>

      <div class="mt-20 flex justify-center">
        <InternalAnchor href="/news/1" direction="left">BACK</InternalAnchor>
      </div>
    </div>
  </div>
</div>
