<script lang="ts">
  import { onMount } from "svelte";
  import RecruitInfoGraphics from "./RecruitInfoGraphics.svelte";

  let isVisible = false;
  let showContent = false;
  let activeTab = 'new-graduate-se';
  let heroSection: HTMLElement;
  let contentSection: HTMLElement;
  
  // 各セクションのアニメーション状態
  let companySectionVisible = false;
  let workStyleSectionVisible = false;
  let atmosphereSectionVisible = false;
  let casualInterviewSectionVisible = false;
  let recruitInfoSectionVisible = false;

  function setActiveTab(tab: string) {
    activeTab = tab;
  }

  onMount(() => {
    // ヒーローセクションは自動表示（より早めに表示）
    setTimeout(() => {
      isVisible = true;
    }, 100);

    // 各セクション用のIntersection Observer
    const createSectionObserver = (callback: () => void) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback();
            }
          });
        },
        { 
          threshold: 0.2, // 20%がビューポートに入ったときに発動
          rootMargin: '0px 0px -50px 0px' // 下部50px手前で発動
        }
      );
    };

    // 会社紹介セクション（より早めに発動）
    const companyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showContent = true;
          }
        });
      },
      { 
        threshold: 0, // 要素が少しでもビューポートに入ったら発動
        rootMargin: '0px 0px 50px 0px' // 下部50px手前で発動（より早め）
      }
    );

    // 働き方の魅力セクション（後半セクション用）
    const workStyleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            workStyleSectionVisible = true;
          }
        });
      },
      { 
        threshold: 0.1, // 10%で発動（モバイル対応）
        rootMargin: '0px 0px -50px 0px' // 下部50px手前で発動
      }
    );

    // 社内の雰囲気セクション（後半セクション用）
    const atmosphereObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            atmosphereSectionVisible = true;
          }
        });
      },
      { 
        threshold: 0.1, // 10%で発動（モバイル対応）
        rootMargin: '0px 0px -50px 0px' // 下部50px手前で発動
      }
    );

    // カジュアル面談セクション（後半セクション用）
    const casualInterviewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            casualInterviewSectionVisible = true;
          }
        });
      },
      { 
        threshold: 0.1, // 10%で発動（モバイル対応）
        rootMargin: '0px 0px -50px 0px' // 下部50px手前で発動
      }
    );

    // 採用情報セクション（後半セクション用）
    const recruitInfoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            recruitInfoSectionVisible = true;
          }
        });
      },
      { 
        threshold: 0.1, // 10%で発動（モバイル対応）
        rootMargin: '0px 0px -50px 0px' // 下部50px手前で発動
      }
    );

    // 各セクションを監視
    if (contentSection) {
      companyObserver.observe(contentSection);
    }

    const workStyleSection = document.querySelector('.work-style-section');
    if (workStyleSection) {
      workStyleObserver.observe(workStyleSection);
    }

    const atmosphereSection = document.querySelector('.atmosphere-section');
    if (atmosphereSection) {
      atmosphereObserver.observe(atmosphereSection);
    }

    const casualInterviewSection = document.querySelector('.casual-interview-section');
    if (casualInterviewSection) {
      casualInterviewObserver.observe(casualInterviewSection);
    }

    const recruitInfoSection = document.querySelector('.recruit-info-section');
    if (recruitInfoSection) {
      recruitInfoObserver.observe(recruitInfoSection);
    }

    return () => {
      companyObserver.disconnect();
      workStyleObserver.disconnect();
      atmosphereObserver.disconnect();
      casualInterviewObserver.disconnect();
      recruitInfoObserver.disconnect();
    };
  });
</script>

<!-- ヒーローセクション -->
<section
  bind:this={heroSection}
  class="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
>
  <!-- 背景画像 -->
  <div class="absolute inset-0">
    <img
      src="/images/top/image_001.jpg"
      alt="JOYZOの社員たち"
      class="h-full w-full object-cover opacity-40"
    />
  </div>

  <!-- メインコンテンツ -->
  <div class="relative z-10 mx-auto max-w-6xl px-6 md:px-4 text-center text-white">
    <!-- メインタイトル -->
    <div class="mb-16">
      <h1
        class="tracking-tighter md:text-8xl lg:text-9xl mb-8 font-heading text-6xl font-black leading-[0.9] md:leading-tight"
        style="letter-spacing: -0.05em;"
      >
        <span
          class="transition-all duration-500"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          RECRUIT
        </span>
      </h1>

      <div class="mb-8">
        <h2
          class="mb-4 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
          style="letter-spacing: -0.08em;"
        >
          <span
            class="transition-all delay-200 duration-700"
            class:opacity-100={isVisible}
            class:opacity-0={!isVisible}
            class:translate-y-0={isVisible}
            class:translate-y-8={!isVisible}
          >
            お客様と共に『価値』を創るプロフェッショナルへ。
          </span>
        </h2>
      </div>

      <p
        class="mx-auto max-w-4xl text-xl font-light leading-relaxed text-gray-300 md:text-2xl"
      >
        <span
          class="delay-400 transition-all duration-700"
          class:opacity-100={isVisible}
          class:opacity-0={!isVisible}
          class:translate-y-0={isVisible}
          class:translate-y-8={!isVisible}
        >
          仕事を楽しむ姿でチームを活気づけ、社会を変える。<br />
          そんな働き方をしてみませんか？
        </span>
      </p>
    </div>
  </div>
</section>

<!-- メインコンテンツセクション -->
<section bind:this={contentSection} class="bg-white py-20">
  <div class="mx-auto max-w-6xl px-6 md:px-4">
    <!-- 会社紹介セクション -->
    <div class="mb-20">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- テキストコンテンツ -->
        <div>
          <h3
            class="mb-8 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
          >
            <span
              class="delay-600 transition-all duration-700"
              class:opacity-100={showContent}
              class:opacity-0={!showContent}
              class:translate-y-0={showContent}
              class:translate-y-8={!showContent}
            >
              JOYZOってこんな会社です
            </span>
          </h3>

          <div class="mb-8">
            <p class="mb-4 font-heading text-2xl font-bold text-gray-800">
              <span
                class="transition-all delay-700 duration-700"
                class:opacity-100={showContent}
                class:opacity-0={!showContent}
                class:translate-y-0={showContent}
                class:translate-y-8={!showContent}
              >
                世界の隅々まで、エンジニアリングの楽しさを届ける。
              </span>
            </p>
          </div>

          <div class="space-y-6 text-lg leading-relaxed text-gray-700">
            <p
              class="delay-800 transition-all duration-700"
              class:opacity-100={showContent}
              class:opacity-0={!showContent}
              class:translate-y-0={showContent}
              class:translate-y-8={!showContent}
            >
              ジョイゾーは、サイボウズ社が提供する業務アプリケーションの開発プラットフォーム『kintone』を活用したシステム開発、サービス提供を手がける会社です。<br
              />
              2011年のkintoneリリースと同時にkintone専業SIを事業とし、サイボウズ社のオフィシャルパートナーとして様々な開発や導入を支援しています。
            </p>

            <p
              class="delay-900 transition-all duration-700"
              class:opacity-100={showContent}
              class:opacity-0={!showContent}
              class:translate-y-0={showContent}
              class:translate-y-8={!showContent}
            >
              ジョイゾーの代表的な開発サービス「システム39」は、kintoneを使用したお客様の目の前で業務システムを作り上げていく「対面開発」という手法をどこよりも先に取り入れ、これまで1,750件以上の豊富な対応経験を持っているトップベンダーとして活動しています。
            </p>
          </div>
        </div>

        <!-- 画像 -->
        <div class="relative">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images/photo_39_03.jpg"
              alt="チームワークでシステム開発に取り組む様子"
              class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <!-- オーバーレイ効果 -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 数字からみたジョイゾー -->
    <div class="mb-20">
      <div class="mx-auto max-w-6xl">
        <RecruitInfoGraphics client:load />
      </div>
    </div>

    <!-- 働き方の魅力 -->
    <div class="work-style-section mb-20">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- 画像 -->
        <div class="relative order-2 lg:order-1">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images/office/joy-office-001.jpg"
              alt="JOYZOの働き方 - 快適なオフィス環境"
              class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <!-- オーバーレイ効果 -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        </div>

        <!-- テキストコンテンツ -->
        <div class="order-1 lg:order-2">
          <h3
            class="mb-8 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
          >
            <span
              class="transition-all delay-300 duration-700"
              class:opacity-100={workStyleSectionVisible}
              class:opacity-0={!workStyleSectionVisible}
              class:translate-y-0={workStyleSectionVisible}
              class:translate-y-8={!workStyleSectionVisible}
            >
              JOYZOの働き方の魅力
            </span>
          </h3>

          <div class="space-y-10 text-lg leading-relaxed text-gray-700">
            <div class="pl-6 border-l-2 border-blue-200">
              <h4 class="mb-5 font-heading text-xl font-bold text-gray-800">
                <span
                  class="delay-400 transition-all duration-700"
                  class:opacity-100={workStyleSectionVisible}
                  class:opacity-0={!workStyleSectionVisible}
                  class:translate-y-0={workStyleSectionVisible}
                  class:translate-y-8={!workStyleSectionVisible}
                >
                  一気通貫で携わるシステム開発
                </span>
              </h4>
              <p
                class="delay-400 transition-all duration-700"
                class:opacity-100={workStyleSectionVisible}
                class:opacity-0={!workStyleSectionVisible}
                class:translate-y-0={workStyleSectionVisible}
                class:translate-y-8={!workStyleSectionVisible}
              >
                JOYZOでは"下請け案件"は一切受けていません。お客様との"直接取引案件"のみなので、受注から開発、納品まですべての工程に関わることができます。またサブスクリプションモデルの自社サービスも行っていますので、SI開発だけでなくWebサービス開発にも携わることができます。<br
                />
                お客様に価値を届ける。その一点でシステム開発の上流から下流、そしてビジネスサイドまで一気通貫で携わることが可能です。
              </p>
            </div>

            <div class="pl-6 border-l-2 border-green-200">
              <h4 class="mb-5 font-heading text-xl font-bold text-gray-800">
                <span
                  class="delay-500 transition-all duration-700"
                  class:opacity-100={workStyleSectionVisible}
                  class:opacity-0={!workStyleSectionVisible}
                  class:translate-y-0={workStyleSectionVisible}
                  class:translate-y-8={!workStyleSectionVisible}
                >
                  多様なライフスタイルに寄り添う働き方
                </span>
              </h4>
              <p
                class="delay-500 transition-all duration-700"
                class:opacity-100={workStyleSectionVisible}
                class:opacity-0={!workStyleSectionVisible}
                class:translate-y-0={workStyleSectionVisible}
                class:translate-y-8={!workStyleSectionVisible}
              >
                またジョイゾーでは、リアルとリモートの良さを活かした柔軟な働き方を実践しています。東京オフィスを中心に対面での信頼関係を大切にしつつ、リモートワークもオプションとして選択可能です。<br
                />
                当社では、全国各地でフルリモート勤務するメンバーやワーキングマザー・ファザーをはじめ、多様なライフスタイルを持つメンバーが活躍しています。<br
                />
                社員一人ひとりの成長をベースに、ライフスタイルに寄り添う多様で柔軟な働き方を実現できる環境を一緒に作りあげられる、そんな環境です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 社内の雰囲気 -->
    <div class="atmosphere-section mb-20">
      <div class="mx-auto max-w-6xl">
        <h3
          class="mb-8 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
        >
          <span
            class="delay-300 transition-all duration-700"
            class:opacity-100={atmosphereSectionVisible}
            class:opacity-0={!atmosphereSectionVisible}
            class:translate-y-0={atmosphereSectionVisible}
            class:translate-y-8={!atmosphereSectionVisible}
          >
            社内の雰囲気
          </span>
        </h3>

        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <!-- テキストコンテンツ -->
          <div>
        <div class="space-y-10 text-lg leading-relaxed text-gray-700">
          <div class="pl-6 border-l-2 border-gray-300">
            <h4 class="mb-5 font-heading text-xl font-bold text-gray-800">
              <span
                class="delay-400 transition-all duration-700"
                class:opacity-100={atmosphereSectionVisible}
                class:opacity-0={!atmosphereSectionVisible}
                class:translate-y-0={atmosphereSectionVisible}
                class:translate-y-8={!atmosphereSectionVisible}
              >
                自律と成長を大切にする組織創り
              </span>
            </h4>
            <p
                class="delay-400 transition-all duration-700"
            class:opacity-100={atmosphereSectionVisible}
            class:opacity-0={!atmosphereSectionVisible}
            class:translate-y-0={atmosphereSectionVisible}
            class:translate-y-8={!atmosphereSectionVisible}
          >
            「ENJOY YOUR WORLD.」を経営理念として掲げる当社では、何よりもメンバーの「自律と成長」を大切にした組織創りを進めています。<br
            />
            また当社では働くメンバー同士がお互いの「成長し楽しく働く」を理解し合う相互理解が重要だと考えています。
          </p>
          </div>

          <div class="pl-6 border-l-2 border-gray-400">
            <h4 class="mb-5 font-heading text-xl font-bold text-gray-800">
              <span
                class="delay-500 transition-all duration-700"
                class:opacity-100={atmosphereSectionVisible}
                class:opacity-0={!atmosphereSectionVisible}
                class:translate-y-0={atmosphereSectionVisible}
                class:translate-y-8={!atmosphereSectionVisible}
              >
                プロとして認め合える環境づくり
              </span>
            </h4>
            <p
                class="delay-500 transition-all duration-700"
            class:opacity-100={atmosphereSectionVisible}
            class:opacity-0={!atmosphereSectionVisible}
            class:translate-y-0={atmosphereSectionVisible}
            class:translate-y-8={!atmosphereSectionVisible}
          >
            そして、相互理解を実現する為にまず必要なのは「一人一人の自律」と「成長したい意欲」。メンバー各々が自身の責任を全うし、自身を磨き続けること。<br
            />
            互いをプロとして認め合える環境をみんなで創ることで、コミュニケーションは自然と活発になり、相互理解が深まって共感し合いながら楽しく働くことができます。
          </p>
          </div>
            </div>
          </div>

          <!-- 画像 -->
          <div class="relative">
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/recruit_002.jpg"
                alt="JOYZOの社内の雰囲気"
                class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <!-- オーバーレイ効果 -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- カジュアル面談 -->
    <div class="casual-interview-section mb-20">
      <div class="mx-auto max-w-6xl">
        <h3
          class="mb-8 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
        >
          <span
            class="delay-300 transition-all duration-700"
            class:opacity-100={casualInterviewSectionVisible}
            class:opacity-0={!casualInterviewSectionVisible}
            class:translate-y-0={casualInterviewSectionVisible}
            class:translate-y-8={!casualInterviewSectionVisible}
          >
            カジュアル面談
          </span>
        </h3>

        <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <!-- テキストコンテンツ -->
          <div class="space-y-6 text-lg leading-relaxed text-gray-700">
            <p
              class="delay-400 transition-all duration-700"
              class:opacity-100={casualInterviewSectionVisible}
              class:opacity-0={!casualInterviewSectionVisible}
              class:translate-y-0={casualInterviewSectionVisible}
              class:translate-y-8={!casualInterviewSectionVisible}
            >
              弊社では、応募を検討されている方に向けて、気軽にご参加いただけるカジュアル面談を実施しています。<br
              />
              面談では、JOYZOの事業内容や働き方について詳しくお話しし、あなたのキャリアプランや希望についてもお聞かせください。
            </p>
          </div>

          <!-- 画像 -->
          <div class="relative">
            <div class="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/casual-interview.jpg"
                alt="JOYZOのカジュアル面談の様子"
                class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <!-- オーバーレイ効果 -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wantedly CTA バナー 1 -->
    <div class="wantedly-cta-section mb-20">
      <div 
        class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-xl transition-all duration-700 delay-600"
        class:opacity-100={casualInterviewSectionVisible}
        class:opacity-0={!casualInterviewSectionVisible}
        class:translate-y-0={casualInterviewSectionVisible}
        class:translate-y-8={!casualInterviewSectionVisible}
      >
        <div class="relative z-10">
          <h3 class="mb-4 text-2xl font-bold md:text-3xl">
            ジョイゾーで働く仲間を探しています
          </h3>
          <p class="mb-6 text-lg opacity-90">
            実際の社員の声や会社の雰囲気をWantedlyでチェック！
          </p>
          <a
            href="https://www.wantedly.com/companies/joyzo/stories"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
          >
            Wantedlyで見る
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- 採用情報 -->
    <div class="recruit-info-section mb-20">
      <h3
        class="mb-12 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
      >
        <span
          class="delay-300 transition-all duration-700"
          class:opacity-100={recruitInfoSectionVisible}
          class:opacity-0={!recruitInfoSectionVisible}
          class:translate-y-0={recruitInfoSectionVisible}
          class:translate-y-8={!recruitInfoSectionVisible}
        >
          募集要項
        </span>
      </h3>

      <!-- タブナビゲーション -->
      <div class="mx-auto max-w-6xl">
        <div class="mb-8">
          <!-- デスクトップ用のタブレイアウト -->
          <div class="hidden md:flex flex-wrap justify-start gap-1 border-b border-gray-200">
            <button
              class="px-6 py-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-start gap-2 rounded-t-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'new-graduate-se'}
              class:text-gray-800={activeTab === 'new-graduate-se'}
              class:bg-blue-50={activeTab === 'new-graduate-se'}
              on:click={() => setActiveTab('new-graduate-se')}
            >
              <span class="inline-block px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #2563eb;">新卒採用</span>
              <span class="text-left text-base">システム39エンジニア</span>
            </button>
            <button
              class="px-6 py-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-start gap-2 rounded-t-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'mid-career-se'}
              class:text-gray-800={activeTab === 'mid-career-se'}
              class:bg-green-50={activeTab === 'mid-career-se'}
              on:click={() => setActiveTab('mid-career-se')}
            >
              <span class="inline-block px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #16a34a;">中途採用</span>
              <span class="text-left text-base">システム39エンジニア</span>
            </button>
            <button
              class="px-6 py-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-start gap-2 rounded-t-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'mid-career-kintone'}
              class:text-gray-800={activeTab === 'mid-career-kintone'}
              class:bg-green-50={activeTab === 'mid-career-kintone'}
              on:click={() => setActiveTab('mid-career-kintone')}
            >
              <span class="inline-block px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #16a34a;">中途採用</span>
              <span class="text-left text-base">kintoneカスタマイズ開発エンジニア</span>
            </button>
            <button
              class="px-6 py-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-start gap-2 rounded-t-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'mid-career-cs'}
              class:text-gray-800={activeTab === 'mid-career-cs'}
              class:bg-green-50={activeTab === 'mid-career-cs'}
              on:click={() => setActiveTab('mid-career-cs')}
            >
              <span class="inline-block px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #16a34a;">中途採用</span>
              <span class="text-left text-base">カスタマーサポート</span>
            </button>
          </div>

          <!-- モバイル用の2段組ボタンメニュー -->
          <div class="md:hidden grid grid-cols-2 gap-3">
            <button
              class="p-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-2 rounded-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'new-graduate-se'}
              class:text-gray-800={activeTab === 'new-graduate-se'}
              class:bg-blue-50={activeTab === 'new-graduate-se'}
              on:click={() => setActiveTab('new-graduate-se')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #2563eb;">新卒採用</span>
              <span class="text-center text-sm">システム39エンジニア</span>
            </button>
            <button
              class="p-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-2 rounded-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'mid-career-se'}
              class:text-gray-800={activeTab === 'mid-career-se'}
              class:bg-green-50={activeTab === 'mid-career-se'}
              on:click={() => setActiveTab('mid-career-se')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #16a34a;">中途採用</span>
              <span class="text-center text-sm">システム39エンジニア</span>
            </button>
            <button
              class="p-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-2 rounded-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'mid-career-kintone'}
              class:text-gray-800={activeTab === 'mid-career-kintone'}
              class:bg-green-50={activeTab === 'mid-career-kintone'}
              on:click={() => setActiveTab('mid-career-kintone')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #16a34a;">中途採用</span>
              <span class="text-center text-sm">kintoneカスタマイズ開発エンジニア</span>
            </button>
            <button
              class="p-4 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 border-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-2 rounded-lg hover:shadow-sm cursor-pointer"
              class:border-gray-800={activeTab === 'mid-career-cs'}
              class:text-gray-800={activeTab === 'mid-career-cs'}
              class:bg-green-50={activeTab === 'mid-career-cs'}
              on:click={() => setActiveTab('mid-career-cs')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white rounded-full shadow-sm" style="background-color: #16a34a;">中途採用</span>
              <span class="text-center text-sm">カスタマーサポート</span>
            </button>
          </div>
        </div>

        <!-- タブコンテンツ -->
        <div class="mx-auto max-w-6xl">
          <!-- 新卒採用 システム39エンジニア -->
          {#if activeTab === 'new-graduate-se'}
            <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500">
              <h4 class="mb-6 font-heading text-3xl font-bold text-gray-800 flex flex-col items-start gap-2">
                <span class="inline-block px-3 py-1 text-sm font-bold text-white rounded" style="background-color: #2563eb;">新卒採用</span>
                <span>システム39エンジニア</span>
              </h4>

          <div class="mb-6 space-y-4 text-gray-700">
            <p>
                  弊社の対面開発サービス「システム39」をご担当いただきます。<br>
                  2時間×3回のお打ち合わせの中で、お客様の現状と業務のお悩みを丁寧なカウンセリングを通してお伺いしたうえで、kintoneでお客様の目の前で業務システムを作り上げ、課題解決と事業の成長につなげています。<br>
                  <br>
                  この手法は弊社が先駆けとして10年前より提供を始め、これまでに対応件数1500件以上という豊富な経験を誇っています。<br>
                  直接お客様に関わることができ、さまざまな業界や業種のシステムの知識・経験を積むことができます。<br>
                  <br>
                  その他、自社サービス（Joboco、ジョイゾーオリジナルkintoneプラグイン）各種サポート業務についても行っていただきます。
            </p>
          </div>

              <!-- 応募資格 -->
              <div class="mb-8">
                <h5 class="mb-3 font-bold text-gray-800">応募資格</h5>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li>
                    • <strong>チームワークを大切にし、顧客、社員と一緒に楽しく働くことに喜びを感じられる方</strong>
                  </li>
                  <li>• <strong>IT/エンジニアリングの力を信じ、ジョイゾーならではの新たな価値を追求したい方</strong></li>
                  <li>• <strong>学歴不問</strong></li>
                  <li>• <strong>2026年3月に卒業（修了）見込みで、2026年4月に入社が可能な方</strong></li>
                </ul>
              </div>

              <!-- その他の情報 -->
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <h5 class="mb-3 font-bold text-gray-800">雇用区分</h5>
                  <p class="text-sm text-gray-700"><strong>正社員</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">給与</h5>
                  <ul class="text-sm text-gray-700">
                    <li><strong>月給：22万円〜</strong></li>
                    <li><strong>昇給：年1回</strong></li>
                    <li><strong>賞与：年1回（決算賞与）</strong></li>
                    <li><strong>試用期間：6ヶ月</strong>（条件などは変わりません）</li>
                  </ul>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">採用人数</h5>
                  <p class="text-sm text-gray-700"><strong>若干名</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">選考プロセス</h5>
                  <ul class="text-sm text-gray-700">
                    <li><strong>STEP1：書類選考</strong></li>
                    <li><strong>STEP2：個別面接・小論文</strong></li>
                    <li><strong>STEP3：内定</strong></li>
                    <li><strong>試用期間：6ヶ月</strong>（条件などは変わりません）</li>
                  </ul>
                  <p class="text-sm text-gray-700">※個別面接は複数回実施します<br>※上記は変更となる可能性もございます。</p>
                </div>

                <div>
                  <h5 class="mb-3 font-bold text-gray-800">勤務地</h5>
                  <p class="text-sm text-gray-700">
                    <strong>勤務地詳細：</strong><br>
                    <strong>東京都江東区東陽4-10-4東陽町SHビル７階</strong><br>
                    ※派遣・常駐はありません。<br>
                    <br>
                    <strong>アクセス：</strong><br>
                    <strong>メトロ東西線「東陽町」駅より徒歩3分</strong>
                  </p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">勤務時間</h5>
                  <p class="text-sm text-gray-700"><strong>9:00〜18:00</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">待遇・福利厚生</h5>
                  <p class="text-sm text-gray-700">
                    <strong>保険：</strong><br>
                    <strong>各種社会保険完備</strong><br>
                    <br>
                    <strong>諸手当：</strong><br>
                    <strong>交通費一律支給<br>リモートワーク手当<br>住宅手当<br>ワーケーション手当</strong><br>
                    <br>
                    <strong>福利厚生：</strong><br>
                    <strong>社員旅行<br>図書購入補助</strong>
                  </p>
                </div>
              </div>

              <div class="mt-8 text-center">
                <a
                  href="https://joyzo.form.kintoneapp.com/public/5885214b168fb12a984fa301ff2dbf7d433b0715c7ecf849a6d5128771d7eeae#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center rounded-lg bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
                >
                  応募する
                </a>
              </div>
            </div>
          {/if}

          <!-- 中途採用 システム39エンジニア -->
          {#if activeTab === 'mid-career-se'}
            <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500">
              <h4 class="mb-6 font-heading text-3xl font-bold text-gray-800 flex flex-col items-start gap-2">
                <span class="inline-block px-3 py-1 text-sm font-bold text-white rounded" style="background-color: #16a34a;">中途採用</span>
                <span>システム39エンジニア</span>
              </h4>

              <div class="mb-6 space-y-4 text-gray-700">
                <p>
                  弊社の対面開発サービス「システム39」をご担当いただきます。<br>
                  2時間×3回のお打ち合わせの中で、お客様の現状と業務のお悩みを丁寧なカウンセリングを通してお伺いしたうえで、kintoneでお客様の目の前で業務システムを作り上げ、課題解決と事業の成長につなげています。<br>
                  <br>
                  この手法は弊社が先駆けとして10年前より提供を始め、これまでに対応件数1500件以上という豊富な経験を誇っています。<br>
                  直接お客様に関わることができ、さまざまな業界や業種のシステムの知識・経験を積むことができます。<br>
                  <br>
                  その他、自社サービス（Joboco、ジョイゾーオリジナルkintoneプラグイン）各種サポート業務についても行っていただきます。
                </p>
              </div>

              <!-- 応募資格 -->
              <div class="mb-8">
                <h5 class="mb-3 font-bold text-gray-800">応募資格</h5>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li>
                    • <strong>チームワークを大切にし、顧客、社員と一緒に楽しく働くことに喜びを感じられる方</strong>
                  </li>
                  <li>• <strong>情報システム担当としての３年以上の経験</strong></li>
                  <li>• <strong>受託開発のプロジェクトマネジメント経験</strong></li>
                </ul>
                <p class="text-sm text-gray-700">※kintoneアプリデザインスペシャリスト資格保持者優遇</p>
              </div>

              <!-- その他の情報 -->
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <h5 class="mb-3 font-bold text-gray-800">雇用区分</h5>
                  <p class="text-sm text-gray-700"><strong>正社員</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">給与</h5>
                  <p class="text-sm text-gray-700">
                    <strong>350万円〜600万円</strong><br>
                    ※ご経験・スキルを考慮して決定いたします。<br>
                    <br>
                    <strong>給与体系：年俸制</strong><br>
                    <strong>給与改定：随時</strong><br>
                    <strong>賞与：年1回（決算賞与）</strong><br>
                    <strong>試用期間：6ヶ月（条件などは変わりません）</strong>
                  </p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">採用人数</h5>
                  <p class="text-sm text-gray-700"><strong>若干名</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">選考プロセス</h5>
                  <p class="text-sm text-gray-700">
                    <strong>STEP1：書類選考</strong><br>
                    <strong>STEP2：個別面接（複数回実施することもあります）</strong><br>
                    <strong>STEP3：内定</strong><br>
                    ※上記は変更となる可能性もございます。
                  </p>
                </div>

                <div>
                  <h5 class="mb-3 font-bold text-gray-800">勤務地</h5>
                  <p class="text-sm text-gray-700">
                    <strong>勤務地詳細：</strong><br>
                    <strong>東京都江東区東陽4-10-4東陽町SHビル７階</strong><br>
                    ※派遣・常駐はありません。<br>
                    <br>
                    <strong>アクセス：</strong><br>
                    <strong>メトロ東西線「東陽町」駅より徒歩3分</strong>
                  </p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">勤務時間</h5>
                  <p class="text-sm text-gray-700"><strong>9:00〜18:00</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">待遇・福利厚生</h5>
                  <p class="text-sm text-gray-700">
                    <strong>保険：</strong><br>
                    <strong>各種社会保険完備</strong><br>
                    <br>
                    <strong>諸手当：</strong><br>
                    <strong>交通費一律支給<br>リモートワーク手当<br>住宅手当<br>ワーケーション手当</strong><br>
                    <br>
                    <strong>福利厚生：</strong><br>
                    <strong>社員旅行<br>図書購入補助</strong>
                  </p>
                </div>
              </div>

          <div class="mt-8 text-center">
            <a
                  href="https://form.kintoneapp.com/public/form/show/f00000d8477cf27e1146169e5b2fb38d8e0fc13bb34d4f490f8f87365fd4b8e6#/"
              target="_blank"
              rel="noopener noreferrer"
                  class="inline-flex items-center rounded-lg bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
            >
              応募する
            </a>
          </div>
        </div>
          {/if}

          <!-- 中途採用 kintoneカスタマイズ開発エンジニア -->
          {#if activeTab === 'mid-career-kintone'}
            <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500">
              <h4 class="mb-6 font-heading text-3xl font-bold text-gray-800 flex flex-col items-start gap-2">
                <span class="inline-block px-3 py-1 text-sm font-bold text-white rounded" style="background-color: #16a34a;">中途採用</span>
                <span>kintoneカスタマイズ開発エンジニア</span>
              </h4>

              <div class="mb-6 space-y-4 text-gray-700">
                <p>
                  JavaScriptを使い、kintoneを基盤としたシステム開発や自社で提供しているkintoneプラグインの開発を行っていただきます。<br>
                  kintone以外にもAWSのサービス(Lambda、API Gateway、AWS IoT)を使った開発にも多数関わっていただきます。
                </p>
              </div>

              <!-- 応募資格 -->
              <div class="mb-8">
                <h5 class="mb-3 font-bold text-gray-800">応募資格</h5>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li>
                    • <strong>チームワークを大切にし、顧客、社員と一緒に楽しく働くことに喜びを感じられる方</strong>
                  </li>
                  <li>• <strong>情報システム担当としての３年以上の経験</strong></li>
                  <li>• <strong>受託開発のプロジェクトマネジメント経験</strong></li>
                </ul>
                <p class="text-sm text-gray-700">※kintoneアプリデザインスペシャリスト資格保持者優遇</p>
              </div>

              <!-- その他の情報 -->
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <h5 class="mb-3 font-bold text-gray-800">雇用区分</h5>
                  <p class="text-sm text-gray-700"><strong>正社員</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">給与</h5>
                  <p class="text-sm text-gray-700">
                    <strong>350万円〜600万円</strong><br>
                    ※ご経験・スキルを考慮して決定いたします。<br>
                    <br>
                    <strong>給与体系：年俸制</strong><br>
                    <strong>給与改定：随時</strong><br>
                    <strong>賞与：年1回（決算賞与）</strong><br>
                    <strong>試用期間：6ヶ月（条件などは変わりません）</strong>
                  </p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">採用人数</h5>
                  <p class="text-sm text-gray-700"><strong>若干名</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">選考プロセス</h5>
                  <p class="text-sm text-gray-700">
                    <strong>STEP1：書類選考</strong><br>
                    <strong>STEP2：個別面接（複数回実施することもあります）</strong><br>
                    <strong>STEP3：内定</strong><br>
                    ※上記は変更となる可能性もございます。
                  </p>
                </div>

                <div>
                  <h5 class="mb-3 font-bold text-gray-800">勤務地</h5>
                  <p class="text-sm text-gray-700">
                    <strong>勤務地詳細：</strong><br>
                    <strong>東京都江東区東陽4-10-4東陽町SHビル７階</strong><br>
                    ※派遣・常駐はありません。<br>
                    <br>
                    <strong>アクセス：</strong><br>
                    <strong>メトロ東西線「東陽町」駅より徒歩3分</strong>
                  </p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">勤務時間</h5>
                  <p class="text-sm text-gray-700"><strong>9:00〜18:00</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">待遇・福利厚生</h5>
                  <p class="text-sm text-gray-700">
                    <strong>保険：</strong><br>
                    <strong>各種社会保険完備</strong><br>
                    <br>
                    <strong>諸手当：</strong><br>
                    <strong>交通費一律支給<br>リモートワーク手当<br>住宅手当<br>ワーケーション手当</strong><br>
                    <br>
                    <strong>福利厚生：</strong><br>
                    <strong>社員旅行<br>図書購入補助</strong>
                  </p>
                </div>
              </div>

              <div class="mt-8 text-center">
                <a
                  href="https://form.kintoneapp.com/public/form/show/f00000d8477cf27e1146169e5b2fb38d8e0fc13bb34d4f490f8f87365fd4b8e6#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center rounded-lg bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
                >
                  応募する
                </a>
              </div>
            </div>
          {/if}

          <!-- 中途採用 カスタマーサポート -->
          {#if activeTab === 'mid-career-cs'}
            <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500">
              <h4 class="mb-6 font-heading text-3xl font-bold text-gray-800 flex flex-col items-start gap-2">
                <span class="inline-block px-3 py-1 text-sm font-bold text-white rounded" style="background-color: #16a34a;">中途採用</span>
                <span>カスタマーサポート</span>
              </h4>

              <div class="mb-6 space-y-4 text-gray-700">
                <p>
                  kintoneプラグインや自社SaaS製品のサポート業務を行っていただきます。<br>
                  顧客からの問い合わせ対応と解決策の提供、ナレッジベースやブログ記事の執筆など顧客のビジネス成長を促す価値提供を行う業務です。
                </p>
              </div>

              <!-- 応募資格 -->
              <div class="mb-8">
                <h5 class="mb-3 font-bold text-gray-800">応募資格</h5>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li>
                    • <strong>チームワークを大切にし、顧客、社員と一緒に楽しく働くことに喜びを感じられる方</strong>
                  </li>
                  <li>• <strong>お客様との良好な関係構築を目指す方</strong></li>
                  <li>• <strong>技術的な課題に対して好奇心を持ち、新しい知識を積極的に学ぶ意欲がある方</strong></li>
                </ul>
              </div>

              <!-- その他の情報 -->
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <h5 class="mb-3 font-bold text-gray-800">雇用区分</h5>
                  <p class="text-sm text-gray-700"><strong>正社員</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">給与</h5>
                  <p class="text-sm text-gray-700">
                    <strong>380万円〜500万円</strong><br>
                    ※ご経験・スキルを考慮して決定いたします。<br>
                    <br>
                    <strong>給与体系：固定残業制</strong><br>
                    <strong>給与改定：随時</strong><br>
                    <strong>賞与：年1回（決算賞与）</strong><br>
                    <strong>試用期間：6ヶ月（条件などは変わりません）</strong>
                  </p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">採用人数</h5>
                  <p class="text-sm text-gray-700"><strong>若干名</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">選考プロセス</h5>
                  <p class="text-sm text-gray-700">
                    <strong>STEP1：書類選考</strong><br>
                    <strong>STEP2：個別面接（複数回実施することもあります）</strong><br>
                    <strong>STEP3：内定</strong><br>
                    ※上記は変更となる可能性もございます。
                  </p>
                </div>

                <div>
                  <h5 class="mb-3 font-bold text-gray-800">勤務地</h5>
                  <p class="text-sm text-gray-700">
                    <strong>勤務地詳細：</strong><br>
                    <strong>東京都江東区東陽4-10-4東陽町SHビル７階</strong><br>
                    ※派遣・常駐はありません。<br>
                    <br>
                    <strong>アクセス：</strong><br>
                    <strong>メトロ東西線「東陽町」駅より徒歩3分</strong>
                  </p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">勤務時間</h5>
                  <p class="text-sm text-gray-700"><strong>9:00〜18:00</strong></p>

                  <h5 class="mb-3 mt-4 font-bold text-gray-800">待遇・福利厚生</h5>
                  <p class="text-sm text-gray-700">
                    <strong>保険：</strong><br>
                    <strong>各種社会保険完備</strong><br>
                    <br>
                    <strong>諸手当：</strong><br>
                    <strong>交通費一律支給<br>リモートワーク手当<br>住宅手当<br>ワーケーション手当</strong><br>
                    <br>
                    <strong>福利厚生：</strong><br>
                    <strong>社員旅行<br>図書購入補助</strong>
                  </p>
                </div>
              </div>

              <div class="mt-8 text-center">
                <a
                  href="https://form.kintoneapp.com/public/form/show/f00000d8477cf27e1146169e5b2fb38d8e0fc13bb34d4f490f8f87365fd4b8e6#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center rounded-lg bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
                >
                  応募する
                </a>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Wantedly CTA バナー 2 -->
    <div class="wantedly-cta-section mb-20">
      <div 
        class="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 p-8 text-center text-white shadow-xl transition-all duration-700 delay-800"
        class:opacity-100={recruitInfoSectionVisible}
        class:opacity-0={!recruitInfoSectionVisible}
        class:translate-y-0={recruitInfoSectionVisible}
        class:translate-y-8={!recruitInfoSectionVisible}
      >
        <div class="relative z-10">
          <h3 class="mb-4 text-2xl font-bold md:text-3xl">
            あなたのキャリア、一緒に考えませんか？
          </h3>
          <p class="mb-6 text-lg opacity-90">
            社員のリアルな体験談や働く環境をWantedlyで詳しく見てみよう
          </p>
          <a
            href="https://www.wantedly.com/companies/joyzo/stories"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-green-600 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
          >
            Wantedlyで見る
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- CTAボタン -->
    <div class="mb-20">
      <div class="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <a
          href="https://form.kintoneapp.com/public/form/show/f00000d8477cf27e1146169e5b2fb38d8e0fc13bb34d4f490f8f87365fd4b8e6#/"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border-2 border-gray-800 px-12 py-5 text-lg font-semibold text-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
        >
          カジュアル面談に申し込む
        </a>
        <a
          href="/company"
          class="rounded-lg bg-gray-800 px-12 py-5 text-lg font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
        >
          会社概要を見る
        </a>
      </div>
    </div>
  </div>
</section>
