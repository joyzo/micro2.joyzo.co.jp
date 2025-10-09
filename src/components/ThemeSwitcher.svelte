<script lang="ts">
  import { themes, applyTheme } from '../utils/theme';
  import { onMount } from 'svelte';
  
  const availableThemes = Object.keys(themes);
  let currentTheme = 'default';
  let mounted = false;
  let isOpen = false;
  
  onMount(() => {
    mounted = true;
    currentTheme = getCurrentTheme();
    
    // sessionStorageからテーマを復元
    const savedTheme = sessionStorage.getItem('joyzo-theme');
    if (savedTheme && themes[savedTheme]) {
      currentTheme = savedTheme;
      applyTheme(savedTheme);
    }
  });
  
  function switchTheme(themeName: string) {
    if (typeof window === 'undefined') return;
    
    // sessionStorageに保存
    sessionStorage.setItem('joyzo-theme', themeName);
    
    const url = new URL(window.location.href);
    if (themeName === 'default') {
      url.searchParams.delete('color');
    } else {
      url.searchParams.set('color', themeName);
    }
    window.location.href = url.toString();
  }
  
  function getCurrentTheme(): string {
    if (typeof window === 'undefined') return 'default';
    
    // まずsessionStorageをチェック
    const savedTheme = sessionStorage.getItem('joyzo-theme');
    if (savedTheme && themes[savedTheme]) {
      return savedTheme;
    }
    
    // 次にURLパラメータをチェック
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('color');
    return themeParam && themes[themeParam] ? themeParam : 'default';
  }
  
  function togglePanel() {
    isOpen = !isOpen;
  }
  
  function closePanel() {
    isOpen = false;
  }
</script>

{#if mounted}
  <!-- テーマ切り替えパネル -->
  {#if isOpen}
    <div class="fixed bottom-4 right-4 z-50 bg-theme-background-secondary border border-theme-border rounded-lg shadow-lg p-4 max-w-xs">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-bold text-theme-text">🎨 テーマ切り替え</h3>
        <button
          class="text-theme-text-muted hover:text-theme-text transition-colors"
          on:click={closePanel}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="space-y-2">
        {#each availableThemes as themeName}
          <button
            class="w-full text-left px-3 py-2 text-sm rounded transition-colors {currentTheme === themeName ? 'bg-theme-hover text-theme-primary' : 'hover:bg-theme-hover text-theme-text'}"
            on:click={() => switchTheme(themeName)}
          >
            {themeName === 'default' ? '⚫ デフォルト（モノクロ）' : 
             themeName === 'blue' ? '🔵 ブルー' :
             themeName === 'pink' ? '🩷 ピンク' :
             themeName === 'orange' ? '🟠 オレンジ' :
             themeName === 'green' ? '🟢 グリーン' :
             themeName === 'purple' ? '🟣 パープル' : themeName}
          </button>
        {/each}
      </div>
      <div class="mt-3 pt-2 border-t border-theme-border">
        <p class="text-xs text-theme-text-secondary">
         現在: <span class="font-medium">{currentTheme}</span>
        </p>
        <p class="text-xs text-theme-text-muted mt-1">
          URLパラメータ: ?color={currentTheme === 'default' ? '' : currentTheme}
        </p>
      </div>
    </div>
  {/if}
  
  <!-- テーマ切り替えアイコン -->
  <button
    class="fixed bottom-4 right-4 z-40 bg-theme-background-secondary border border-theme-border rounded-full shadow-lg p-3 hover:shadow-xl transition-all duration-200 {isOpen ? 'hidden' : ''}"
    on:click={togglePanel}
    title="テーマ切り替え"
  >
    <svg class="w-5 h-5 text-theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
    </svg>
  </button>
{/if}

<style>
  /* デバッグ用のスタイル */
</style>
