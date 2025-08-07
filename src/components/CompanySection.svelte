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
  id="company-section"
  class="min-h-screen flex items-center bg-white py-20"
>
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-main font-english mb-6">
        COMPANY
      </h2>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-600">会社概要</p>
    </div>
    
    <div class="max-w-4xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- 左側: 会社情報 -->
        <div class="space-y-8">
          <div class="bg-light p-8 rounded-2xl">
            <h3 class="text-2xl font-bold text-main mb-6">基本情報</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-start border-b border-gray-200 pb-3">
                <span class="font-medium text-gray-700">社名</span>
                <span class="text-right">株式会社ジョイゾー</span>
              </div>
              <div class="flex justify-between items-start border-b border-gray-200 pb-3">
                <span class="font-medium text-gray-700">設立</span>
                <span class="text-right">2019年4月</span>
              </div>
              <div class="flex justify-between items-start border-b border-gray-200 pb-3">
                <span class="font-medium text-gray-700">資本金</span>
                <span class="text-right">1,000万円</span>
              </div>
              <div class="flex justify-between items-start border-b border-gray-200 pb-3">
                <span class="font-medium text-gray-700">代表者</span>
                <span class="text-right">代表取締役 四宮 大輔</span>
              </div>
              <div class="flex justify-between items-start border-b border-gray-200 pb-3">
                <span class="font-medium text-gray-700">事業内容</span>
                <span class="text-right">システム開発・DX支援</span>
              </div>
            </div>
          </div>
          
          <div class="bg-light p-8 rounded-2xl">
            <h3 class="text-2xl font-bold text-main mb-6">アクセス</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-start border-b border-gray-200 pb-3">
                <span class="font-medium text-gray-700">所在地</span>
                <span class="text-right">東京都渋谷区</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="font-medium text-gray-700">最寄り駅</span>
                <span class="text-right">渋谷駅</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右側: 会社の特徴 -->
        <div class="space-y-8">
          <div class="bg-gradient-to-br from-main to-secondary p-8 rounded-2xl text-white">
            <h3 class="text-2xl font-bold mb-6">私たちの特徴</h3>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 class="font-bold mb-2">DX推進の専門性</h4>
                  <p class="text-sm opacity-90">最新のテクノロジーを活用し、お客様の業務改革を支援します。</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 class="font-bold mb-2">働き方改革の実践</h4>
                  <p class="text-sm opacity-90">自社でも働き方改革を実践し、そのノウハウをお客様に提供します。</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 class="font-bold mb-2">地域貢献への取り組み</h4>
                  <p class="text-sm opacity-90">地域社会とのつながりを大切にし、社会貢献活動にも積極的に取り組んでいます。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-accent p-8 rounded-2xl text-white">
            <h3 class="text-2xl font-bold mb-6">代表メッセージ</h3>
            <p class="text-sm leading-relaxed mb-4">
              「ENJOY YOUR WORLD.」という想いのもと、私たちはお客様の世界をより楽しくすることを目指しています。
              テクノロジーの力で、一人ひとりが自分の世界を楽しみ、充実した人生を送ることができる社会を創りたい。
              それが私たちの願いです。
            </p>
            <div class="text-right">
              <p class="font-bold">代表取締役 四宮 大輔</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 