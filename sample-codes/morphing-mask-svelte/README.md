# MorphingMask (Svelte)

画像・要素を **clip-path: path()** でマスクし、複数の形状にシームレス変形する Svelte コンポーネント。  
提供いただいたHTMLの「画像マスク部分」を再利用可能にしました。

## 使い方

```
src/
 ├ lib/
 │   └ MorphingMask.svelte
 └ routes/ もしくは任意の場所にデモ用のファイル
```

### 基本

```svelte
<script lang="ts">
  import MorphingMask from '$lib/MorphingMask.svelte';
</script>

<MorphingMask />
```

### スロットで任意のコンテンツをマスク

```svelte
<MorphingMask useBuiltInGradient={false}>
  <img src="/your/image.jpg" style="width:100%;height:100%;object-fit:cover;" />
</MorphingMask>
```

## Props

| Prop | 型 | デフォルト | 説明 |
|---|---|---:|---|
| `width` | `string` | `'100%'` | コンポーネント幅 |
| `height` | `number` | `400` | コンポーネント高さ(px) |
| `borderRadius` | `number` | `20` | 角丸(px) |
| `cycleMs` | `number` | `25000` | 形状変形サイクル(ms) |
| `pauseOnHover` | `boolean` | `true` | ホバーで一時停止 |
| `useBuiltInGradient` | `boolean` | `true` | 内蔵グラデーション背景を使う |
| `gradientMs` | `number` | `15000` | グラデーションのシフト周期(ms) |
| `gradientColors` | `string[]` | `['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57','#ff9ff3']` | グラデーション色 |
| `showOverlay` | `boolean` | `true` | デモ用オーバーレイの表示 |
| `overlayOpacity` | `number` | `0.6` | オーバーレイ不透明度 |
| `showIndicator` | `boolean` | `true` | 形状数のドットとラベル表示 |
| `shapeNames` | `string[]` | `[...]` | ラベル文言 |
| `shapes` | `string[]` | 5個の有機パス | **必須** 形状配列（CSS `path()` 互換文字列） |

> `shapes` は全て同じコマンド構成・頂点数であるほど滑らかに補間されます（ベストエフォートですが、形状差が大きいと稀にゆがみが出ます）。

## 注意点
- `clip-path: path()` のアニメーションはモダンブラウザ向けです（Safari 16+ / Chrome 118+ 目安）。
- レガシー対応が必要な場合は、SVG `<clipPath>` と `<animate>` / JS 補間へ差し替えてください。

## デモ
`src/routes` などに `Demo.svelte` を配置してご確認ください。

---

Happy hacking! 🧪
