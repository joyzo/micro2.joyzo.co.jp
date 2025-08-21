<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  /**
   * MorphingMask
   * 任意の子要素を「clip-path: path()」でマスクし、複数のSVGパス間をシームレスに変形させます。
   * - Web Animations API で clip-path を補間するため、モダンブラウザでの利用を想定しています。
   * - 背景グラデーションやオーバーレイはデモ用途。スロットで任意の内容を入れ替え可能です。
   */

  export let width: string = '100%';
  export let height: number = 400;
  export let borderRadius: number = 20;
  export let cycleMs: number = 25000;     // 形状変形のサイクル
  export let pauseOnHover: boolean = true;

  // オプション: 内部の見た目(デモ用)
  export let useBuiltInGradient: boolean = true;
  export let gradientMs: number = 15000;
  export let gradientColors: string[] = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57','#ff9ff3'];
  export let showOverlay: boolean = true;
  export let overlayOpacity: number = 0.6;

  // インジケータ/ラベル
  export let showIndicator: boolean = true;
  export let shapeNames: string[] = ['オーガニックブロブ1','オーガニックブロブ2','オーガニックブロブ3','オーガニックブロブ4','ウェーブサークル'];

  // クリップする形状(必須): CSS path() 互換の d 属性文字列（相対ではなく絶対コマンド推奨）
  export let shapes: string[] = [
    'M50,10 C80,15 90,40 85,70 C80,90 60,95 40,90 C15,85 5,60 10,35 C15,15 30,5 50,10 Z',
    'M40,5 C70,8 95,25 90,55 C88,80 65,95 35,90 C10,85 2,60 8,35 C12,15 25,2 40,5 Z',
    'M45,8 C75,12 92,35 88,65 C85,88 58,98 30,92 C8,88 -2,65 5,40 C10,18 28,4 45,8 Z',
    'M55,12 C82,18 95,45 90,72 C86,92 62,98 38,93 C18,89 8,68 12,45 C16,22 35,8 55,12 Z',
    'M50,10 C65,8 82,18 88,35 C92,50 88,68 75,80 C60,90 40,90 25,80 C12,68 8,50 12,35 C18,18 35,8 50,10 Z',
  ];

  let wrapper: HTMLDivElement;
  let maskEl: HTMLDivElement;
  let clipAnim: Animation | null = null;

  const dispatch = createEventDispatcher();

  function startClipAnimation() {
    if (!maskEl || !shapes?.length) return;
    // keyframes: 0..1 を等間隔で割り当て
    const kfs = shapes.map((d, i) => ({
      clipPath: `path('${d}')`,
      offset: i / shapes.length
    }));
    // 最後は先頭に戻る
    kfs.push({ clipPath: `path('${shapes[0]}')`, offset: 1 });

    // 既存を止める
    if (clipAnim) {
      try { clipAnim.cancel(); } catch {}
      clipAnim = null;
    }
    clipAnim = maskEl.animate(kfs as Keyframe[], {
      duration: cycleMs,
      iterations: Infinity,
      easing: 'ease-in-out',
      fill: 'both'
    });
  }

  function pauseAll() {
    clipAnim?.pause();
  }
  function playAll() {
    clipAnim?.play();
  }

  onMount(() => {
    startClipAnimation();
    if (pauseOnHover) {
      const enter = () => pauseAll();
      const leave = () => playAll();
      wrapper.addEventListener('mouseenter', enter);
      wrapper.addEventListener('mouseleave', leave);
      return () => {
        wrapper.removeEventListener('mouseenter', enter);
        wrapper.removeEventListener('mouseleave', leave);
      };
    }
  });

  onDestroy(() => {
    clipAnim?.cancel();
  });
</script>

<style>
  :global(@keyframes gradientShift) {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }
  .wrapper {
    position: relative;
    display: block;
    transition: transform 0.3s ease;
  }
  .wrapper:hover {
    transform: translateY(-6px);
  }
  .mask {
    width: 100%;
    height: 100%;
    border-radius: var(--radius, 20px);
    position: relative;
    overflow: hidden;
    /* clip-path はアニメーションで上書き */
  }
  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .builtin-gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--g0), var(--g1), var(--g2), var(--g3), var(--g4), var(--g5));
    background-size: 600% 600%;
    animation: gradientShift var(--gradientMs, 15000ms) ease-in-out infinite;
  }
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="%23ffffff20" stroke-width="2"/></pattern></defs><rect width="400" height="300" fill="url(%23grid)"/><circle cx="120" cy="100" r="40" fill="%23ffffff30"/><rect x="220" y="70" width="80" height="80" fill="%23ffffff25"/><polygon points="340,80 380,130 300,130" fill="%23ffffff35"/><circle cx="100" cy="220" r="35" fill="%23ffffff30"/><rect x="200" y="190" width="100" height="50" fill="%23ffffff25"/><circle cx="340" cy="220" r="45" fill="%23ffffff20"/></svg>') center/cover;
    opacity: var(--overlayOpacity, 0.6);
  }

  /* Indicator */
  .indicator {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(0,0,0,0.2);
  }
  .labels {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
    font-size: 12px;
    opacity: 0.75;
  }
  .label {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.08);
  }
</style>

<div
  class="wrapper"
  bind:this={wrapper}
  style={`width:${width};`}
>
  <div
    class="mask"
    bind:this={maskEl}
    style={`--radius:${borderRadius}px; height:${height}px; --gradientMs:${gradientMs}ms; --g0:${gradientColors[0]}; --g1:${gradientColors[1]||gradientColors[0]}; --g2:${gradientColors[2]||gradientColors[0]}; --g3:${gradientColors[3]||gradientColors[0]}; --g4:${gradientColors[4]||gradientColors[0]}; --g5:${gradientColors[5]||gradientColors[0]}; --overlayOpacity:${overlayOpacity};`}
    aria-label="Morphing masked area"
  >
    {#if useBuiltInGradient}
      <div class="builtin-gradient"></div>
    {:else}
      <div class="content"><slot /></div>
    {/if}
    {#if showOverlay}
      <div class="overlay"></div>
    {/if}
  </div>

  {#if showIndicator}
    <div class="indicator" aria-hidden="true">
      {#each shapes as _, i}
        <span class="dot" title={`shape ${i+1}`}></span>
      {/each}
    </div>
    {#if shapeNames?.length}
      <div class="labels">
        {#each shapeNames as name}
          <span class="label">{name}</span>
        {/each}
      </div>
    {/if}
  {/if}
</div>
