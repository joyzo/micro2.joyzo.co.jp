<script>
  import ScrollAnimation from "./ScrollAnimation.svelte";
  import AnimatedText from "./AnimatedText.svelte";

  export let message;
  export let index;
  export let isAlternate = false;

  // 各段落のアニメーション遅延
  $: paragraphDelays = message.body.map((_, i) => i * 0.2);

  // パーティクル生成
  $: particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 1.5,
  }));
</script>

<ScrollAnimation
  trigger="top 98%"
  end="bottom 5%"
  scrub={1.0}
  stagger={0.2}
  duration={1.6}
  ease="power4.out"
  y={90}
  scale={0.8}
  opacity={0}
>
  <section
    class="relative flex h-screen items-center overflow-hidden"
    class:bg-white={!isAlternate}
    class:bg-theme-accent={isAlternate}
    style="z-index: {10 - index};"
  >
    <!-- デバッグ情報（開発時のみ表示） -->
    {#if import.meta.env.DEV}
      <div
        class="absolute right-4 top-4 z-50 rounded bg-black/80 p-3 font-mono text-xs text-white"
      >
        <div>Section {index + 1}</div>
      </div>
    {/if}

    <!-- 背景の装飾要素 -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="animate-on-scroll absolute left-20 top-20 h-64 w-64 rounded-full border border-current"
      />
      <div
        class="animate-on-scroll absolute bottom-20 right-20 h-32 w-32 rotate-45 transform border border-current"
      />
    </div>

    <!-- パーティクル効果 -->
    <div class="pointer-events-none absolute inset-0">
      {#each particles as particle}
        <div
          class="animate-on-scroll absolute h-1 w-1 rounded-full opacity-0 transition-all duration-1000 ease-out"
          class:bg-theme-accent={!isAlternate}
          class:bg-white={isAlternate}
          style="
            left: {particle.x}%; 
            top: {particle.y}%; 
            width: {particle.size}px; 
            height: {particle.size}px;
            transition-delay: {particle.delay * 1000}ms;
          "
        />
      {/each}
    </div>

    <div class="container relative z-10 mx-auto px-6 md:px-4">
      <div class="mx-auto max-w-6xl">
        <!-- キャッチフレーズ（1行目） -->
        <div class="animate-on-scroll mb-16 text-center">
          <h2
            class="tracking-tighter font-heading font-bold leading-[0.85] md:leading-tight"
            style="font-size: clamp(4rem, 10vw, 12rem); letter-spacing: -0.05em;"
            class:text-white={isAlternate}
            class:text-theme-accent={!isAlternate}
          >
            <AnimatedText
              text={message.catch}
              type="slide"
              direction="left"
              delay={0.6}
              duration={1.2}
              stagger={0.08}
              distance={80}
            />
          </h2>
        </div>

        <!-- リード文（2行目） -->
        <div class="animate-on-scroll mb-16 text-center">
          <p
            class="mx-auto max-w-4xl text-xl leading-relaxed md:text-2xl lg:text-3xl"
            class:text-white={isAlternate}
            class:text-theme-accent={!isAlternate}
          >
            <AnimatedText
              text={message.lead}
              type="fade"
              delay={1.1}
              duration={1.0}
              stagger={0.1}
            />
          </p>
        </div>

        <!-- 本文 -->
        <div class="animate-on-scroll mx-auto max-w-4xl">
          {#each message.body as paragraph, i}
            <p
              class="mb-6 text-lg leading-relaxed last:mb-0 md:text-xl"
              class:text-white={isAlternate}
              class:text-blue-900={!isAlternate}
            >
              <AnimatedText
                text={paragraph}
                type="slide"
                direction="up"
                delay={1.5 + i * 0.3}
                duration={0.9}
                stagger={0.12}
                distance={60}
              />
            </p>
          {/each}
        </div>

        <!-- CTAボタン（存在する場合） -->
        {#if message.cta}
          <div class="animate-on-scroll mt-12 text-center">
            <a
              href={message.cta.url}
              class="inline-flex transform items-center rounded-lg px-8 py-4 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              class:bg-white={isAlternate}
              class:bg-theme-accent={!isAlternate}
              class:text-theme-accent={isAlternate}
              class:text-white={!isAlternate}
            >
              <span>{message.cta.text}</span>
              <svg
                class="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
        {/if}
      </div>
    </div>
  </section>
</ScrollAnimation>

<style>
  /* スムーズなアニメーションのための設定 */
  section {
    will-change: transform, opacity;
    transform: translateZ(0);
  }

  /* パフォーマンス最適化 */
  * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* マーカーの光沢効果とパルスアニメーションは削除 */

  /* アニメーション要素の最適化 */
  .transform {
    will-change: transform, opacity;
    transform: translateZ(0);
  }
</style>
