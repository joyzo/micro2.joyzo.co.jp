<script>
  import ScrollAnimation from "./ScrollAnimation.svelte";
</script>

<ScrollAnimation
  trigger="top 85%"
  duration={0.8}
  stagger={0.15}
  y={40}
  opacity={0}
>
  <section id="about-section" class="bg-white py-20" style="display: none;">
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <h2
          class="md:text-8xl lg:text-9xl mb-6 font-english text-5xl font-bold text-main sm:text-6xl"
          style="letter-spacing: -0.05em;"
          data-scroll-animate
        >
          WORLDVIEW
        </h2>
        <p
          class="mb-8 text-lg text-gray-600 sm:text-xl md:text-2xl"
          data-scroll-animate
        >
          ジョイゾーの世界観
        </p>
        <div
          class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-main to-secondary"
          data-scroll-animate
        />
      </div>

      <div class="mx-auto max-w-4xl space-y-8">
        <!-- 私たちのビジョン -->
        <div
          class="transform rounded-subtle bg-light p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl"
          data-scroll-animate
        >
          <h3 class="mb-6 text-2xl font-bold text-main">私たちのビジョン</h3>
          <div class="space-y-4">
            <p class="leading-relaxed text-gray-700">
              「新しい世界の新しい波を、楽しもう。」この言葉に込められた想いは、私たちが目指す未来そのものです。
              テクノロジーの進化は、私たちの働き方や生活を大きく変えています。
              この変化を「楽しむ」ことで、より豊かで充実した社会を創りたいと考えています。
            </p>
            <p class="leading-relaxed text-gray-700">
              私たちは、単なるシステム開発会社ではありません。
              お客様の業務効率化を通じて、創造的な仕事に集中できる環境を提供し、
              結果として「楽しさ」を生み出すことを目指しています。
            </p>
          </div>
        </div>

        <!-- 私たちのアプローチ -->
        <div
          class="transform rounded-subtle bg-gradient-to-br from-main to-secondary p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-xl"
          data-scroll-animate
        >
          <h3 class="mb-6 text-2xl font-bold">私たちのアプローチ</h3>
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div
                class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20"
              >
                <span class="text-sm font-bold">1</span>
              </div>
              <div>
                <h4 class="mb-2 font-bold">お客様中心の思考</h4>
                <p class="text-sm opacity-90">
                  技術ありきではなく、お客様の課題解決を最優先に考え、最適なソリューションを提供します。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div
                class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20"
              >
                <span class="text-sm font-bold">2</span>
              </div>
              <div>
                <h4 class="mb-2 font-bold">継続的なパートナーシップ</h4>
                <p class="text-sm opacity-90">
                  一度きりの取引ではなく、長期的な関係性を築き、お客様の成長を継続的にサポートします。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div
                class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20"
              >
                <span class="text-sm font-bold">3</span>
              </div>
              <div>
                <h4 class="mb-2 font-bold">イノベーションの追求</h4>
                <p class="text-sm opacity-90">
                  最新技術を活用しながらも、使いやすさと実用性を重視したソリューションを提供します。
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 私たちが大切にすること -->
        <div
          class="transform rounded-subtle bg-accent p-8 text-white transition-all duration-500 hover:scale-105 hover:shadow-xl"
          data-scroll-animate
        >
          <h3 class="mb-6 text-2xl font-bold">私たちが大切にすること</h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <h4 class="mb-3 text-lg font-bold">人とのつながり</h4>
              <p class="text-sm leading-relaxed opacity-90">
                技術は手段であり、目的ではありません。
                私たちは人と人とのつながりを大切にし、
                テクノロジーを通じてより良い関係性を築くことを目指しています。
              </p>
            </div>
            <div>
              <h4 class="mb-3 text-lg font-bold">持続可能な成長</h4>
              <p class="text-sm leading-relaxed opacity-90">
                短期的な利益よりも、長期的な価値創造を重視します。
                お客様、パートナー、社会全体が持続的に成長できる
                エコシステムの構築を目指しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</ScrollAnimation>
