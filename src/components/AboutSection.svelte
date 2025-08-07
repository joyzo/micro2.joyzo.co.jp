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
  id="about-section"
  class="min-h-screen flex items-center bg-light py-20"
>
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- 左側: テキストコンテンツ -->
      <div class="space-y-8">
        <div class="space-y-4">
          <h2 class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-main font-english leading-tight">
            ENJOY<br />
            YOUR<br />
            WORLD.
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            私たちのミッション
          </p>
        </div>
        
        <div class="space-y-6 text-gray-700 leading-relaxed">
          <p class="text-base md:text-lg">
            株式会社ジョイゾーは、DXと働き方の変化を通じて、お客様の世界をより楽しくすることを目指す企業です。
          </p>
          
          <p class="text-base md:text-lg">
            「ENJOY YOUR WORLD.」というキャッチコピーには、私たちの想いが込められています。
            テクノロジーの力で、一人ひとりが自分の世界を楽しみ、充実した人生を送ることができる社会を創りたい。
            それが私たちの願いです。
          </p>
          
          <p class="text-base md:text-lg">
            システム39をはじめとする私たちのサービスは、単なるツールではありません。
            お客様の業務効率化を支援し、より創造的な仕事に集中できる環境を提供することで、
            結果として「楽しさ」を生み出すことを目指しています。
          </p>
        </div>
        
        <!-- CTAボタン -->
        <div class="pt-8">
          <a 
            href="/about" 
            class="inline-flex items-center px-8 py-4 bg-main text-white font-bold rounded-lg hover:bg-secondary transition-colors duration-300 group"
          >
            <span>システム39の詳細を知る</span>
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- 右側: ビジュアル要素 -->
      <div class="relative">
        <div class="relative z-10">
          <!-- メインの円形要素 -->
          <div class="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-main to-secondary rounded-full flex items-center justify-center mx-auto">
            <div class="text-center text-white">
              <div class="text-4xl md:text-6xl font-bold font-english mb-4">39</div>
              <div class="text-lg md:text-xl opacity-90">システム</div>
            </div>
          </div>
          
          <!-- 装飾的な円形要素 -->
          <div class="absolute -top-8 -right-8 w-24 h-24 bg-accent rounded-full opacity-80"></div>
          <div class="absolute -bottom-12 -left-12 w-32 h-32 border-4 border-main rounded-full"></div>
          <div class="absolute top-1/2 -right-16 w-16 h-16 bg-main rounded-full opacity-60"></div>
        </div>
        
        <!-- 背景の装飾線 -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-20 left-10 w-32 h-px bg-gray-300 transform -rotate-45"></div>
          <div class="absolute bottom-32 right-20 w-24 h-px bg-gray-300 transform rotate-45"></div>
        </div>
      </div>
    </div>
  </div>
</section> 