<script>
  import ScrollAnimation from './ScrollAnimation.svelte';
  import AnimatedText from './AnimatedText.svelte';
</script>

<ScrollAnimation 
  trigger="top 98%" 
  end="bottom 5%" 
  scrub={1.0}
  stagger={0.15}
  duration={1.4}
  ease="power4.out"
  y={75}
  scale={0.88}
  opacity={0}
>
  <section 
    id="careers-section"
    class="py-20 flex items-center bg-gradient-to-br from-light to-white"
    style="z-index: 3;"
  >
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-main font-english mb-6 animate-on-scroll" style="letter-spacing: -0.05em;">
          <AnimatedText 
            text="CAREERS" 
            type="scale" 
            delay={0.5}
            duration={1.0}
            stagger={0.05}
            ease="elastic.out(1, 0.3)"
          />
        </h2>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 animate-on-scroll">
          <AnimatedText 
            text="採用情報" 
            type="slide" 
            direction="up"
            delay={0.9}
            duration={0.8}
            stagger={0.1}
            distance={45}
          />
        </p>
        <div 
          class="w-24 h-1 bg-gradient-to-r from-main to-accent mx-auto rounded-full animate-on-scroll"
        ></div>
      </div>
      
      <div class="max-w-6xl mx-auto">
        <!-- 採用メッセージ -->
        <div class="text-center mb-16">
          <div 
            class="bg-white p-12 rounded-3xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-on-scroll"
          >
            <h3 class="text-3xl md:text-4xl font-bold text-main mb-8">
              <AnimatedText 
                text="一緒に「ENJOY YOUR WORLD.」を" 
                type="slide" 
                direction="left"
                delay={1.1}
                duration={0.9}
                stagger={0.08}
                distance={40}
              />
              <br />
              <AnimatedText 
                text="創りませんか？" 
                type="slide" 
                direction="left"
                delay={1.5}
                duration={0.9}
                stagger={0.08}
                distance={40}
              />
            </h3>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              私たちは、テクノロジーの力で人々の世界をより楽しくすることを目指しています。
              あなたの技術とアイデアで、新しい価値を創造しませんか？
            </p>
          </div>
        </div>
        
        <!-- 採用種別 -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <!-- 新卒採用 -->
          <div 
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-on-scroll"
          >
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-main rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">新</span>
              </div>
              <h4 class="text-2xl font-bold text-main">新卒採用</h4>
            </div>
            <div class="space-y-4 text-gray-700">
              <p>技術に興味があり、新しいことに挑戦したい方を募集しています。</p>
              <ul class="space-y-2 text-sm">
                <li>• システム開発エンジニア</li>
                <li>• プロジェクトマネージャー</li>
                <li>• 営業職</li>
              </ul>
            </div>
            <div class="mt-6 text-center">
              <a href="/careers/new-graduate" class="inline-block px-6 py-3 bg-main text-white font-bold rounded-lg hover:bg-secondary transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                詳細を見る
              </a>
            </div>
          </div>
          
          <!-- 中途採用 -->
          <div 
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-on-scroll"
          >
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">中</span>
              </div>
              <h4 class="text-2xl font-bold text-main">中途採用</h4>
            </div>
            <div class="space-y-4 text-gray-700">
              <p>経験を活かして、より大きなプロジェクトに携わりたい方を募集しています。</p>
              <ul class="space-y-2 text-sm">
                <li>• シニアエンジニア</li>
                <li>• プロジェクトリーダー</li>
                <li>• 営業マネージャー</li>
              </ul>
            </div>
            <div class="mt-6 text-center">
              <a href="/careers/mid-career" class="inline-block px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                詳細を見る
              </a>
            </div>
          </div>
        </div>
        
        <!-- 福利厚生 -->
        <div class="text-center">
          <h3 class="text-3xl font-bold text-main mb-8 animate-on-scroll">福利厚生</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div 
              class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-on-scroll"
            >
              <div class="w-12 h-12 bg-main rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 class="font-bold text-main mb-2">フレックスタイム制</h4>
              <p class="text-sm text-gray-600">自分のペースで働ける環境</p>
            </div>
            
            <div 
              class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-on-scroll"
            >
              <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
              </div>
              <h4 class="font-bold text-main mb-2">リモートワーク</h4>
              <p class="text-sm text-gray-600">場所を選ばず働ける環境</p>
            </div>
            
            <div 
              class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-on-scroll"
            >
              <div class="w-12 h-12 bg-main rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h4 class="font-bold text-main mb-2">技術研修</h4>
              <p class="text-sm text-gray-600">最新技術の習得支援</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</ScrollAnimation> 