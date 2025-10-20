<script lang="ts">
  import { onMount } from "svelte";
  import RecruitInfoGraphics from "./RecruitInfoGraphics.svelte";

  let isVisible = false;
  let showContent = false;
  let activeTab = 'new-graduate-se';

  function setActiveTab(tab: string) {
    activeTab = tab;
  }

  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 300);

    setTimeout(() => {
      showContent = true;
    }, 800);
  });
</script>

<!-- ヒーローセクション -->
<section
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
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
            class:translate-y-0={showContent}
            class:translate-y-8={!showContent}
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
          class:opacity-100={showContent}
          class:opacity-0={!showContent}
          class:translate-y-0={showContent}
          class:translate-y-8={!showContent}
        >
          仕事を楽しむ姿でチームを活気づけ、社会を変える。<br />
          そんな働き方をしてみませんか？
        </span>
      </p>
    </div>
  </div>
</section>

<!-- メインコンテンツセクション -->
<section class="bg-white py-20">
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

          <!-- ミッション -->
          <div
            class="mb-8 rounded-lg border-l-4 border-gray-800 bg-gray-50 p-6"
          >
            <h4 class="mb-3 font-heading text-lg font-bold text-gray-800">
              ミッション
            </h4>
            <p class="leading-relaxed text-gray-700">
              <span
                class="delay-750 transition-all duration-700"
                class:opacity-100={showContent}
                class:opacity-0={!showContent}
                class:translate-y-0={showContent}
                class:translate-y-8={!showContent}
              >
                人生を楽しくしたいと願っている人のために、その手段としてのエンジニアリングの可能性を示唆し、価値観の変化によって社会に新しい波を広げる。
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
              src="/images/office/joy-office-002.jpg"
              alt="世界の隅々までエンジニアリングの楽しさを届ける"
              class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <!-- オーバーレイ効果 -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
          <!-- 装飾的な要素 -->
          <div
            class="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gray-800 opacity-60"
          />
          <div
            class="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-gray-600 opacity-40"
          />
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
    <div class="mb-20">
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
          <!-- 装飾的な要素 -->
          <div
            class="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gray-800 opacity-60"
          />
          <div
            class="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-gray-600 opacity-40"
          />
        </div>

        <!-- テキストコンテンツ -->
        <div class="order-1 lg:order-2">
          <h3
            class="mb-8 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
          >
            <span
              class="transition-all delay-1300 duration-700"
              class:opacity-100={showContent}
              class:opacity-0={!showContent}
              class:translate-y-0={showContent}
              class:translate-y-8={!showContent}
            >
              JOYZOの働き方の魅力
            </span>
          </h3>

          <div class="space-y-6 text-lg leading-relaxed text-gray-700">
            <p
              class="delay-1400 transition-all duration-700"
              class:opacity-100={showContent}
              class:opacity-0={!showContent}
              class:translate-y-0={showContent}
              class:translate-y-8={!showContent}
            >
              JOYZOでは"下請け案件"は一切受けていません。お客様との"直接取引案件"のみなので、受注から開発、納品まですべての工程に関わることができます。またサブスクリプションモデルの自社サービスも行っていますので、SI開発だけでなくWebサービス開発にも携わることができます。
            </p>

            <p
              class="delay-1500 transition-all duration-700"
              class:opacity-100={showContent}
              class:opacity-0={!showContent}
              class:translate-y-0={showContent}
              class:translate-y-8={!showContent}
            >
              またジョイゾーでは、リアルとリモートの良さを活かした柔軟な働き方を実践しています。東京オフィスを中心に対面での信頼関係を大切にしつつ、リモートワークも自由に選択可能。<br
              />
              全国各地でフルリモート勤務するメンバーもおり、クラウドツールを活用してスムーズに連携しています。仕事だけでなく、ライフスタイルや大切にしたいことに合わせた働き方ができる環境です。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 社内の雰囲気 -->
    <div class="mb-20">
      <div class="mx-auto max-w-6xl">
        <h3
          class="mb-8 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
        >
          <span
            class="delay-1600 transition-all duration-700"
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
            class:translate-y-0={showContent}
            class:translate-y-8={!showContent}
          >
            社内の雰囲気
          </span>
        </h3>

        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <!-- テキストコンテンツ -->
          <div>
        <div class="space-y-6 text-lg leading-relaxed text-gray-700">
          <p
                class="delay-1700 transition-all duration-700"
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
            class:translate-y-0={showContent}
            class:translate-y-8={!showContent}
          >
            すべての案件が直接取引なので、社員は、お客様の顔が見える環境で、お客様の役に立っているという充実感を得ながら、生き生きと働いています。<br
            />
            受注から納品まで、一人に委ねられる領域は大きいのですが、社員同士が励まし合い、助け合い、楽しさを共有することで、社内には明るくアグレッシブなムードができ上がっています。
          </p>

          <p
                class="delay-1800 transition-all duration-700"
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
            class:translate-y-0={showContent}
            class:translate-y-8={!showContent}
          >
            また「ENJOY YOUR
            WORLD.」を経営理念として掲げる当社では、何よりもメンバーの「自律と成長」を大切にした組織づくりを進めています。<br
            />
            みんなが楽しく働けるように、当社では働くメンバー全員がお互いの「楽しく働く」を理解し合う相互理解が重要だと考えています。
          </p>
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
            <!-- 装飾的な要素 -->
            <div
              class="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gray-800 opacity-60"
            />
            <div
              class="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-gray-600 opacity-40"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- カジュアル面談 -->
    <div class="mb-20">
      <div class="mx-auto max-w-4xl">
        <h3
          class="mb-8 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
        >
          <span
            class="delay-1900 transition-all duration-700"
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
            class:translate-y-0={showContent}
            class:translate-y-8={!showContent}
          >
            カジュアル面談
          </span>
        </h3>

        <div class="space-y-6 text-lg leading-relaxed text-gray-700">
          <p
            class="delay-2000 transition-all duration-700"
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
            class:translate-y-0={showContent}
            class:translate-y-8={!showContent}
          >
            弊社では、応募を検討されている方に向けて、気軽にご参加いただけるカジュアル面談を実施しています。<br
            />
            面談では、JOYZOの事業内容や働き方について詳しくお話しし、あなたのキャリアプランや希望についてもお聞かせください。
          </p>
        </div>
      </div>
    </div>

    <!-- 採用情報 -->
    <div class="mb-20">
      <h3
        class="mb-12 font-heading text-3xl font-bold text-gray-800 md:text-4xl"
      >
        <span
          class="delay-2100 transition-all duration-700"
          class:opacity-100={showContent}
          class:opacity-0={!showContent}
          class:translate-y-0={showContent}
          class:translate-y-8={!showContent}
        >
          募集要項
        </span>
      </h3>

      <!-- タブナビゲーション -->
      <div class="mx-auto max-w-6xl">
        <div class="mb-8">
          <div class="flex flex-wrap justify-center gap-2 border-b border-gray-200">
            <button
              class="px-4 py-3 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-1"
              class:border-gray-800={activeTab === 'new-graduate-se'}
              class:text-gray-800={activeTab === 'new-graduate-se'}
              on:click={() => setActiveTab('new-graduate-se')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded">新卒採用</span>
              <span>システム39エンジニア</span>
            </button>
            <button
              class="px-4 py-3 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-1"
              class:border-gray-800={activeTab === 'mid-career-se'}
              class:text-gray-800={activeTab === 'mid-career-se'}
              on:click={() => setActiveTab('mid-career-se')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white bg-green-600 rounded">中途採用</span>
              <span>システム39エンジニア</span>
            </button>
            <button
              class="px-4 py-3 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-1"
              class:border-gray-800={activeTab === 'mid-career-kintone'}
              class:text-gray-800={activeTab === 'mid-career-kintone'}
              on:click={() => setActiveTab('mid-career-kintone')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white bg-green-600 rounded">中途採用</span>
              <span>kintoneカスタマイズ開発エンジニア</span>
            </button>
            <button
              class="px-4 py-3 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 flex flex-col items-center gap-1"
              class:border-gray-800={activeTab === 'mid-career-cs'}
              class:text-gray-800={activeTab === 'mid-career-cs'}
              on:click={() => setActiveTab('mid-career-cs')}
            >
              <span class="inline-block px-2 py-1 text-xs font-bold text-white bg-green-600 rounded">中途採用</span>
              <span>カスタマーサポート</span>
            </button>
          </div>
        </div>

        <!-- タブコンテンツ -->
        <div class="mx-auto max-w-6xl">
          <!-- 新卒採用 システム39エンジニア -->
          {#if activeTab === 'new-graduate-se'}
            <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500">
              <h4 class="mb-6 font-heading text-3xl font-bold text-gray-800 flex flex-col items-start gap-2">
                <span class="inline-block px-3 py-1 text-sm font-bold text-white bg-blue-600 rounded">新卒採用</span>
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
                <span class="inline-block px-3 py-1 text-sm font-bold text-white bg-green-600 rounded">中途採用</span>
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
                <span class="inline-block px-3 py-1 text-sm font-bold text-white bg-green-600 rounded">中途採用</span>
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
                <span class="inline-block px-3 py-1 text-sm font-bold text-white bg-green-600 rounded">中途採用</span>
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
