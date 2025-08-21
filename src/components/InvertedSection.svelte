<script>
  import { onMount } from 'svelte';
  
  let isVisible = false;
  let sectionElement;
  
  let currentShapeIndex = 0;
  let shapeInterval;
  
  onMount(() => {
    // 形状の自動切り替え
    shapeInterval = setInterval(() => {
      currentShapeIndex = (currentShapeIndex + 1) % 5;
      console.log('Shape changed to:', currentShapeIndex + 1);
    }, 2000);
    
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
      if (shapeInterval) {
        clearInterval(shapeInterval);
      }
    };
  });
</script>

<section 
  bind:this={sectionElement}
  id="inverted-section"
  class="h-screen flex items-center bg-light"
  style="z-index: 3;"
>
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- 右側: テキストコンテンツ（左右反転） -->
      <div class="space-y-8 order-2 lg:order-1">
        <div class="space-y-4">
          <h1 
            class="font-bold text-main leading-tight tracking-tighter font-english transform transition-all duration-1000 ease-out"
            style="
              font-size: clamp(5rem, 15vw, 15rem); 
              letter-spacing: -0.1em;
              transform: translateX({isVisible ? 0 : '100vw'}) scale({isVisible ? 1 : 0.8});
              opacity: {isVisible ? 1 : 0};
            "
          >
            <span class="whitespace-nowrap">Our Mission</span>
          </h1>
          <p 
            class="font-light text-gray-600 leading-relaxed transform transition-all duration-1000 ease-out delay-300"
            style="
              font-size: clamp(1.5rem, 4vw, 3rem);
              transform: translateX({isVisible ? 0 : '100vw'}) scale({isVisible ? 1 : 0.9});
              opacity: {isVisible ? 1 : 0};
            "
          >
            <span class="whitespace-nowrap">私たちのミッション</span>
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
            href="/company" 
            class="inline-flex items-center px-8 py-4 bg-main text-white font-bold rounded-lg hover:bg-secondary transition-colors duration-300 group"
          >
            <span>会社概要を見る</span>
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- 左側: ビジュアル要素（左右反転） -->
      <div class="relative order-1 lg:order-2">
        <div class="relative z-10">
          <!-- アニメーション付き形状マスク（SVG clipPath使用） -->
          <div class="w-80 h-80 md:w-96 md:h-96 mx-auto relative">
            <div 
              class="w-full h-full overflow-hidden transition-all duration-1000 ease-in-out"
              class:shape-1={currentShapeIndex === 0}
              class:shape-2={currentShapeIndex === 1}
              class:shape-3={currentShapeIndex === 2}
              class:shape-4={currentShapeIndex === 3}
              class:shape-5={currentShapeIndex === 4}
            >
              <img 
                src="/src/images/top/recruit_001.jpg" 
                alt="私たちのミッション" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- SVG定義 -->
            <svg width="0" height="0" class="absolute">
              <defs>
                <clipPath id="shape-1" clipPathUnits="objectBoundingBox">
                  <path d="M0.05,0.4 Q0.25,0.2 0.45,0.15 Q0.65,0.1 0.8,0.2 Q0.9,0.35 0.85,0.55 Q0.8,0.75 0.65,0.85 Q0.5,0.9 0.35,0.85 Q0.2,0.8 0.1,0.65 Q0.05,0.5 0.05,0.35 Q0.05,0.4 0.05,0.4 Z" />
                </clipPath>
                <clipPath id="shape-2" clipPathUnits="objectBoundingBox">
                  <path d="M0.1,0.3 Q0.3,0.15 0.5,0.1 Q0.7,0.15 0.85,0.3 Q0.95,0.5 0.9,0.7 Q0.8,0.85 0.6,0.9 Q0.4,0.85 0.25,0.75 Q0.15,0.6 0.1,0.45 Q0.1,0.3 0.1,0.3 Z" />
                </clipPath>
                <clipPath id="shape-3" clipPathUnits="objectBoundingBox">
                  <path d="M0.15,0.25 Q0.35,0.1 0.55,0.08 Q0.75,0.12 0.9,0.25 Q0.95,0.45 0.9,0.65 Q0.8,0.8 0.6,0.85 Q0.4,0.8 0.25,0.7 Q0.15,0.55 0.15,0.4 Q0.15,0.25 0.15,0.25 Z" />
                </clipPath>
                <clipPath id="shape-4" clipPathUnits="objectBoundingBox">
                  <path d="M0.2,0.2 Q0.4,0.08 0.6,0.1 Q0.8,0.18 0.9,0.35 Q0.95,0.55 0.9,0.75 Q0.8,0.9 0.6,0.95 Q0.4,0.9 0.2,0.8 Q0.15,0.6 0.15,0.4 Q0.15,0.2 0.2,0.2 Z" />
                </clipPath>
                <clipPath id="shape-5" clipPathUnits="objectBoundingBox">
                  <path d="M0.05,0.45 Q0.25,0.3 0.45,0.25 Q0.65,0.3 0.8,0.45 Q0.85,0.65 0.8,0.85 Q0.7,1 0.5,1 Q0.3,1 0.15,0.9 Q0.05,0.75 0.05,0.55 Q0.05,0.45 0.05,0.45 Z" />
                </clipPath>
              </defs>
            </svg>
          </div>
          
          <!-- 説明テキスト -->
          <div class="mt-4 text-center space-y-2">
            <p class="text-sm text-gray-600 font-mono">
              アニメーション形状変化
            </p>
            <p class="text-xs text-gray-500">
              現在の形状: <span class="text-main font-bold">形状{currentShapeIndex + 1}</span>
            </p>
            <p class="text-xs text-gray-400">
              2秒間隔で自動変化
            </p>
            <p class="text-xs text-blue-500 font-medium">
              💡 形状が自動でアニメーションします！
            </p>
            
            <!-- 形状インジケーター -->
            <div class="flex justify-center gap-2 mt-3">
              {#each Array(5) as _, i}
                <div 
                  class="w-3 h-3 rounded-full transition-all duration-300 {i === currentShapeIndex ? 'bg-main scale-125' : 'bg-gray-300'}"
                  title="形状{i + 1}"
                ></div>
              {/each}
            </div>
          </div>
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

<style>
  .shape-1 { clip-path: url(#shape-1); }
  .shape-2 { clip-path: url(#shape-2); }
  .shape-3 { clip-path: url(#shape-3); }
  .shape-4 { clip-path: url(#shape-4); }
  .shape-5 { clip-path: url(#shape-5); }
</style> 