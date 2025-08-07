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
  id="contact-section"
  class="min-h-screen flex items-center bg-main py-20"
>
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white font-english mb-6">
        CONTACT
      </h2>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-300">お問い合わせ</p>
    </div>
    
    <div class="max-w-4xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- 左側: お問い合わせ情報 -->
        <div class="space-y-8">
          <div class="bg-white bg-opacity-10 p-8 rounded-2xl text-white">
            <h3 class="text-2xl font-bold mb-6">お気軽にお問い合わせください</h3>
            <p class="text-gray-300 leading-relaxed mb-6">
              システム39についてのご質問や、DX推進に関するご相談など、
              お気軽にお問い合わせください。専門スタッフが丁寧にお答えいたします。
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-bold">メール</p>
                  <p class="text-gray-300">info@joyzo.co.jp</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-bold">電話</p>
                  <p class="text-gray-300">03-1234-5678</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-bold">所在地</p>
                  <p class="text-gray-300">東京都渋谷区</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white bg-opacity-10 p-8 rounded-2xl text-white">
            <h3 class="text-2xl font-bold mb-6">営業時間</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>平日</span>
                <span>9:00 - 18:00</span>
              </div>
              <div class="flex justify-between">
                <span>土日祝</span>
                <span>休業</span>
              </div>
            </div>
            <p class="text-sm text-gray-300 mt-4">
              ※お急ぎの場合は、お電話にてお問い合わせください。
            </p>
          </div>
        </div>
        
        <!-- 右側: お問い合わせフォーム -->
        <div class="bg-white p-8 rounded-2xl">
          <h3 class="text-2xl font-bold text-main mb-6">お問い合わせフォーム</h3>
          
          <!-- kintone連携フォーム -->
          <form 
            action="https://your-kintone-domain.cybozu.com/k/v1/record.json"
            method="POST"
            class="space-y-6"
          >
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                会社名 <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="株式会社サンプル"
              />
            </div>
            
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                お名前 <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="山田 太郎"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス <span class="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="example@company.com"
              />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                電話番号
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="03-1234-5678"
              />
            </div>
            
            <div>
              <label for="inquiry_type" class="block text-sm font-medium text-gray-700 mb-2">
                お問い合わせ種別 <span class="text-red-500">*</span>
              </label>
              <select
                id="inquiry_type"
                name="inquiry_type"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
              >
                <option value="">選択してください</option>
                <option value="system39">システム39について</option>
                <option value="dx_consultation">DX推進相談</option>
                <option value="partnership">パートナーシップ</option>
                <option value="recruitment">採用について</option>
                <option value="other">その他</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                お問い合わせ内容 <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="お問い合わせ内容を詳しくお聞かせください。"
              ></textarea>
            </div>
            
            <div class="pt-4">
              <button
                type="submit"
                class="w-full bg-main text-white font-bold py-4 px-6 rounded-lg hover:bg-secondary transition-colors duration-300"
              >
                送信する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section> 