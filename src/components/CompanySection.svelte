<script>
  import ScrollAnimation from "./ScrollAnimation.svelte";
</script>

<ScrollAnimation
  trigger="top 95%"
  duration={0.6}
  stagger={0.1}
  y={30}
  opacity={0}
>
  <section id="company-section" class="company-section py-20">
    <div class="mx-auto max-w-none sm:max-w-7xl px-4">
      <div class="mb-16 text-center">
        <h2
          class="md:text-8xl lg:text-9xl mb-6 font-english text-5xl font-bold text-main sm:text-6xl leading-[0.9] md:leading-[0.95]"
          style="letter-spacing: -0.05em;"
          data-scroll-animate
        >
          COMPANY
        </h2>
        <p
          class="mb-8 text-lg text-gray-600 sm:text-xl md:text-2xl"
          data-scroll-animate
        >
          会社概要
        </p>
        <div
          class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-main to-secondary"
          data-scroll-animate
        />
      </div>

      <div class="mx-auto max-w-none sm:max-w-4xl space-y-8">
        <!-- 基本情報 -->
        <div
          class="transform rounded-lg border border-white/20 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl"
          data-scroll-animate
        >
          <h3 class="mb-6 text-2xl font-bold text-main">基本情報</h3>
          <div class="space-y-4">
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-3"
            >
              <span class="font-medium text-gray-700 mb-1 md:mb-0">社名</span>
              <span class="md:text-right">株式会社ジョイゾー</span>
            </div>
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-3"
            >
              <span class="font-medium text-gray-700 mb-1 md:mb-0">設立</span>
              <span class="md:text-right">2010年12月</span>
            </div>
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-3"
            >
              <span class="font-medium text-gray-700 mb-1 md:mb-0">資本金</span>
              <span class="md:text-right">2,000,000円</span>
            </div>
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-3"
            >
              <span class="font-medium text-gray-700 mb-1 md:mb-0">代表者</span>
              <span class="md:text-right">代表取締役社長 四宮 靖隆</span>
            </div>
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-3"
            >
              <span class="font-medium text-gray-700 mb-1 md:mb-0">事業内容</span>
              <span class="md:text-right"
                >サイボウズ製品に対するコンサルティング・システム開発、<br />kintoneプラグインの開発/販売</span
              >
            </div>
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-3"
            >
              <span class="font-medium text-gray-700 mb-1 md:mb-0">適格請求書発行事業者登録番号</span>
              <span class="md:text-right">T1010601040500</span>
            </div>
          </div>
        </div>

        <!-- アクセス情報 -->
        <div
          class="transform rounded-lg border border-white/20 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl"
          data-scroll-animate
        >
          <h3 class="mb-6 text-2xl font-bold text-main">アクセス</h3>
          <div class="space-y-4">
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-3"
            >
              <span class="font-medium text-gray-700 mb-1 md:mb-0">所在地</span>
              <span class="md:text-right"
                >〒135-0016<br />東京都江東区東陽4-10-4<br />東陽町SHビル7階</span
              >
            </div>
            <div class="flex flex-col md:flex-row md:items-start md:justify-between">
              <span class="font-medium text-gray-700 mb-1 md:mb-0">最寄り駅</span>
              <span class="md:text-right"
                >東京メトロ東西線<br />東陽町駅 徒歩3分</span
              >
            </div>
          </div>
        </div>

        <!-- お客様 -->
        <div
          class="transform rounded-lg border border-white/20 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl"
          data-scroll-animate
        >
          <h3 class="mb-6 text-2xl font-bold text-main">お客様</h3>
          <div class="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/achievements-img.jpg"
              alt="お客様実績"
              class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <!-- オーバーレイ効果 -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        </div>

        <!-- 私たちの特徴 -->
        <div
          class="transform rounded-lg border border-white/20 bg-gradient-to-br from-main/90 to-secondary/90 p-8 text-white backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl"
          data-scroll-animate
        >
          <h3 class="mb-6 text-2xl font-bold">私たちの特徴</h3>
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div
                class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white bg-opacity-20"
              >
                <span class="text-sm font-bold">1</span>
              </div>
              <div>
                <h4 class="mb-2 font-bold">cybozu公認SIパートナー</h4>
                <p class="text-sm opacity-90">
                  kintoneリリース当初より、kintoneを専門に取り扱うSIerとして活動しています。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div
                class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white bg-opacity-20"
              >
                <span class="text-sm font-bold">2</span>
              </div>
              <div>
                <h4 class="mb-2 font-bold">豊富な認定資格取得者</h4>
                <p class="text-sm opacity-90">
                  kintone認定資格取得者数40名を超えるスペシャリスト集団です。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div
                class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white bg-opacity-20"
              >
                <span class="text-sm font-bold">3</span>
              </div>
              <div>
                <h4 class="mb-2 font-bold">1750社を超える実績</h4>
                <p class="text-sm opacity-90">
                  「システム39」を通じて1750を超えるお客様の課題解決に取り組んでいます。
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</ScrollAnimation>

<style>
  .company-section {
    background: radial-gradient(
        circle at 20% 80%,
        rgba(0, 31, 63, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(0, 51, 102, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(230, 57, 70, 0.05) 0%,
        transparent 50%
      ),
      linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
    position: relative;
  }

  .company-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
      circle at 1px 1px,
      rgba(0, 0, 0, 0.03) 1px,
      transparent 0
    );
    background-size: 28px 28px;
    opacity: 0.4;
    pointer-events: none;
  }
</style>
