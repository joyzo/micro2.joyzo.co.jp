<script>
  import { onMount } from 'svelte';
  
  let isVisible = false;
  let sectionElement;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  });
</script>

<section 
  bind:this={sectionElement}
  id="careers-section"
  class="py-20 flex items-center bg-gradient-to-br from-light to-white"
  style="z-index: 3;"
>
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-main font-english mb-6">
        CAREERS
      </h2>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-600">採用情報</p>
    </div>
    
    <div class="max-w-6xl mx-auto">
      <!-- 採用メッセージ -->
      <div class="text-center mb-16">
        <div class="bg-white p-12 rounded-3xl shadow-lg">
          <h3 class="text-3xl md:text-4xl font-bold text-main mb-8">
            一緒に「ENJOY YOUR WORLD.」を<br />
            創りませんか？
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
        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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
            <a href="/careers/new-graduate" class="inline-block px-6 py-3 bg-main text-white font-bold rounded-lg hover:bg-secondary transition-colors duration-300">
              詳細を見る
            </a>
          </div>
        </div>
        
        <!-- 中途採用 -->
        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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
            <a href="/careers/mid-career" class="inline-block px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors duration-300">
              詳細を見る
            </a>
          </div>
        </div>
      </div>
      
      <!-- 会社データ -->
      <div class="bg-white p-8 rounded-2xl shadow-lg mb-16">
        <h3 class="text-2xl font-bold text-main mb-8 text-center">ジョイゾーのデータ</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-main mb-2">25</div>
            <div class="text-sm text-gray-600">平均年齢</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-main mb-2">60%</div>
            <div class="text-sm text-gray-600">男性比率</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-main mb-2">100%</div>
            <div class="text-sm text-gray-600">リモート対応</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-main mb-2">15</div>
            <div class="text-sm text-gray-600">社員数</div>
          </div>
        </div>
      </div>
      
      <!-- 採用発信リンク -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-main mb-8">採用発信</h3>
        <div class="flex flex-wrap justify-center gap-6">
          <a href="https://www.wantedly.com/companies/joyzo" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-[#2E5BFF] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Wantedly
          </a>
          <a href="https://line.me/ti/p/@joyzo" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-[#00B900] text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            公式LINE
          </a>
          <a href="https://www.instagram.com/joyzo_official" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </div>
  </div>
</section> 