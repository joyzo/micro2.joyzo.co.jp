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
  class="py-20 flex items-center bg-main"
  style="z-index: 3;"
>
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- 左側: ビジュアル要素（左右反転） -->
      <div class="relative order-1">
        <div class="relative z-10">
          <!-- メインの円形要素（写真を配置） -->
          <div class="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center mx-auto overflow-hidden">
            <img 
              src="/src/images/top/recruit_001.jpg" 
              alt="私たちのミッション" 
              class="w-full h-full object-cover rounded-full"
            />
          </div>
          

        </div>
        
        <!-- 背景の装飾線 -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-20 left-10 w-32 h-0.5 bg-white opacity-30"></div>
          <div class="absolute bottom-32 right-10 w-24 h-0.5 bg-white opacity-30"></div>
          <div class="absolute top-1/2 left-1/4 w-16 h-0.5 bg-white opacity-20"></div>
        </div>
      </div>
      
      <!-- 右側: テキストコンテンツ（左右反転） -->
      <div class="space-y-8 order-2">
        <div class="space-y-4">
          <h1 class="font-bold text-white leading-tight tracking-tight" style="font-size: clamp(3rem, 8vw, 7.5rem);">
            <span class="whitespace-nowrap">私たちの</span><br />
            <span class="whitespace-nowrap">ミッション</span>
          </h1>
          <p class="font-light text-gray-200 leading-relaxed font-english" style="font-size: clamp(1.5rem, 4vw, 3.75rem);">
            <span class="whitespace-nowrap">ENJOY YOUR WORLD.</span>
          </p>
        </div>
        
        <div class="space-y-6 text-gray-200 leading-relaxed">
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
            href="/company" 
            class="inline-flex items-center px-8 py-4 bg-white text-main font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 group"
          >
            <span>会社概要を見る</span>
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section> 