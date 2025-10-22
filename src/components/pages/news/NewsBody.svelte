<script lang="ts">
  import FormattedDate from "@components/FormattedDate.svelte";
  import InternalAnchor from "@components/InternalAnchor.svelte";
  import MicroCMSPicture from "@components/MicroCMSPicture.svelte";
  import type { Blog } from "@types/microcms/blogs";

  export let content: Blog;
</script>

<div class="mx-auto max-w-prose">
  <h1 class="text-[1.75rem] font-bold leading-normal">
    {content.title}
  </h1>

  <div class="mt-4 flex items-center gap-2">
    <FormattedDate
      date={content.release_date ?? content.publishedAt ?? content.createdAt}
      class="text-sm font-bold"
    />
    
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
              const tag = tagText.toLowerCase();
              if (tag === 'update' || tag === 'アップデート') return 'bg-green-600';
              if (tag === 'news' || tag === 'お知らせ') return 'bg-blue-600';
              if (tag === 'event' || tag === 'イベント') return 'bg-purple-600';
              if (tag === 'release' || tag === 'リリース') return 'bg-orange-600';
              if (tag === 'maintenance' || tag === 'メンテナンス') return 'bg-red-600';
              if (tag === 'media' || tag === 'メディア') return 'bg-cyan-600';
              // 部分一致のチェック（完全一致でない場合）
              if (tag.includes('update') && !tag.includes('news')) return 'bg-green-600';
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

  <div
    class="prose mx-auto mt-20 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg [&_*]:text-main"
  >
    {@html content.content}
  </div>

  <div class="mt-20 flex justify-center">
    <InternalAnchor href="/news/1" direction="left">BACK</InternalAnchor>
  </div>
</div>
