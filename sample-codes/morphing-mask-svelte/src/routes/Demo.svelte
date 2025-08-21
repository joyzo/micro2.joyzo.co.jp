<script lang="ts">
  import MorphingMask from '../lib/MorphingMask.svelte';

  const customShapes = [
    'M50,10 C80,15 90,40 85,70 C80,90 60,95 40,90 C15,85 5,60 10,35 C15,15 30,5 50,10 Z',
    'M40,5 C70,8 95,25 90,55 C88,80 65,95 35,90 C10,85 2,60 8,35 C12,15 25,2 40,5 Z',
    'M45,8 C75,12 92,35 88,65 C85,88 58,98 30,92 C8,88 -2,65 5,40 C10,18 28,4 45,8 Z',
    'M55,12 C82,18 95,45 90,72 C86,92 62,98 38,93 C18,89 8,68 12,45 C16,22 35,8 55,12 Z',
    'M50,10 C65,8 82,18 88,35 C92,50 88,68 75,80 C60,90 40,90 25,80 C12,68 8,50 12,35 C18,18 35,8 50,10 Z'
  ];
</script>

<section style="max-width: 880px; margin: 40px auto; padding: 20px; font-family: system-ui, -apple-system, 'Hiragino Sans', 'Yu Gothic', sans-serif;">
  <h1>MorphingMask デモ</h1>
  <p>内蔵グラデーション（デモ表示）。スロットに差し替えれば任意の画像や要素をマスクできます。</p>

  <MorphingMask
    width="100%"
    {customShapes}  /* 例: shapes={customShapes} */
  />

  <h2 style="margin-top:40px;">スロットに画像を入れてマスク</h2>
  <MorphingMask
    width="100%"
    height={320}
    useBuiltInGradient={false}
    showOverlay={false}
    shapes={customShapes}
  >
    <img alt="demo" src="https://images.unsplash.com/photo-1514511542834-04d3d6eaa47f?q=80&w=1600&auto=format&fit=crop" style="width:100%; height:100%; object-fit:cover;" />
  </MorphingMask>
</section>
