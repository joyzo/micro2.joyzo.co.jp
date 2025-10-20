<script lang="ts">
  import { onMount } from 'svelte';

  // アニメーション時間
  const DURATION: number = 2000;

  interface PieData {
      value: number;
      color: string;
      label: string;
  }

  /**
   * 数値を目標値までカウントアップするアニメーション
   */
  const animateValue = (
      element: HTMLElement | null, 
      start: number, 
      end: number, 
      duration: number, 
      suffix: string = '', 
      decimalPlaces: number = 0
  ) => {
      if (!element) return;
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          
          let displayValue = (progress * (end - start) + start).toFixed(decimalPlaces);
          
          element.textContent = parseFloat(displayValue).toLocaleString('ja-JP', {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces
          }) + suffix;
          
          if (progress < 1) {
              window.requestAnimationFrame(step);
          } else {
              element.textContent = end.toLocaleString('ja-JP', {
                  minimumFractionDigits: decimalPlaces,
                  maximumFractionDigits: decimalPlaces
              }) + suffix;
          }
      };
      window.requestAnimationFrame(step);
  };

  /**
   * 円グラフのアニメーション
   */
  const animatePieChart = (svgElement: SVGElement, data: PieData[]) => {
      const centerX: number = 100;
      const centerY: number = 100;
      const radius: number = 90;
      let total: number = data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle: number = 0;
      let paths: SVGPathElement[] = [];

      data.forEach((item, index) => {
          const sliceAngle: number = (item.value / total) * 360;
          const startAngle: number = currentAngle;
          const endAngle: number = currentAngle + sliceAngle;

          // 角度をラジアンに変換
          const startRad: number = startAngle * Math.PI / 180;
          const endRad: number = endAngle * Math.PI / 180;

          const startX: number = centerX + radius * Math.cos(startRad);
          const startY: number = centerY + radius * Math.sin(startRad);
          const endX: number = centerX + radius * Math.cos(endRad);
          const endY: number = centerY + radius * Math.sin(endRad);

          const largeArcFlag: 0 | 1 = sliceAngle > 180 ? 1 : 0;
          const d: string = [
              `M ${centerX},${centerY}`,
              `L ${startX},${startY}`,
              `A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`,
              `Z`
          ].join(' ');

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', d);
          path.setAttribute('fill', item.color);
          path.classList.add('circle-chart-segment'); 
          svgElement.appendChild(path);
          paths.push(path);

          // ラベルを追加
          const midAngle: number = (startAngle + endAngle) / 2;
          const midRad: number = midAngle * Math.PI / 180;
          const labelRadius: number = radius * 0.7; // 円の中心から70%の位置にラベルを配置
          const labelX: number = centerX + labelRadius * Math.cos(midRad);
          const labelY: number = centerY + labelRadius * Math.sin(midRad);

          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', labelX.toString());
          text.setAttribute('y', labelY.toString());
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('dominant-baseline', 'middle');
          text.setAttribute('fill', 'white');
          text.setAttribute('font-size', '12');
          text.setAttribute('font-weight', 'bold');
          text.textContent = item.label;
          text.style.opacity = '0';
          svgElement.appendChild(text);

          currentAngle = endAngle;
      });

      // フェードインアニメーションを順次開始
      paths.forEach((path, index) => {
          setTimeout(() => {
              path.style.opacity = '1';
              // ラベルも同時にフェードイン
              const texts = svgElement.querySelectorAll('text');
              if (texts[index]) {
                  texts[index].style.opacity = '1';
              }
          }, index * 100 + 500); 
      });
  };


  const setupAnimations = () => {
      
      // 1. 創業年数 (15年)
      animateValue(document.getElementById('founding-years'), 0, 15, DURATION, '年');

      // 2. 業績成長率 (約20%) - 小数点なし
      animateValue(document.getElementById('growth-rate'), 0, 20, DURATION, '%', 0);

      // 3. 男女比
      animateValue(document.getElementById('gender-female'), 0, 66, DURATION, '%');
      animateValue(document.getElementById('gender-male'), 0, 34, DURATION, '%');
      
      const genderFemaleBar = document.getElementById('gender-female-bar') as HTMLElement | null;
      const genderMaleBar = document.getElementById('gender-male-bar') as HTMLElement | null;
      
      setTimeout(() => {
          if (genderFemaleBar) genderFemaleBar.style.width = '66%';
          if (genderMaleBar) genderMaleBar.style.width = '34%';
      }, 100);

      // 4. 中途新卒
      animateValue(document.getElementById('mid-career'), 0, 60, DURATION, '%');
      animateValue(document.getElementById('new-grad'), 0, 40, DURATION, '%');
      
      const midCareerBar = document.getElementById('mid-career-bar') as HTMLElement | null;
      const newGradBar = document.getElementById('new-grad-bar') as HTMLElement | null;
      
      setTimeout(() => {
          if (midCareerBar) midCareerBar.style.width = '60%';
          if (newGradBar) newGradBar.style.width = '40%';
      }, 100);

      // 5. 年齢構成 (円グラフ)
      const ageData: PieData[] = [
          { value: 48.3, color: 'var(--color-20s)', label: '20代' },
          { value: 10.3, color: 'var(--color-30s)', label: '30代' },
          { value: 31.0, color: 'var(--color-40s)', label: '40代' },
          { value: 10.3, color: 'var(--color-50s-plus)', label: '50代以上' },
      ];
      const agePieChartSvg = document.getElementById('age-pie-chart') as SVGElement | null;
      
      if (agePieChartSvg) {
          // DOM描画後にアニメーション開始
          setTimeout(() => {
              animatePieChart(agePieChartSvg, ageData);
          }, 500); 
      }

      // カードのフェードインアニメーションの遅延設定
      document.querySelectorAll('.info-card').forEach((card, index) => {
          (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
  };

  onMount(() => {
      setupAnimations();
  });

</script>

<!-- Tailwind CSSを仮定しているため、HTMLファイルからスタイルをインラインでSvelteの<style>に移動します -->
<div class="p-4 md:p-12">

  <div class="max-w-7xl mx-auto pt-8">
    
    <!-- 全体をくくる角丸枠 -->
    <div class="bg-white p-8 shadow-lg border border-gray-200" style="border-radius: 0.25em;">

      <!-- メイングリッドコンテナ (3列基調) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <!-- 1. 業績成長率 (約20%以上) - 最も大きくダイナミックに -->
          <div class="p-6 relative lg:col-span-2 flex flex-col justify-center items-center text-center" style="min-height: 300px; animation-delay: 0s;">
              <h3 class="text-3xl font-black tracking-wider text-gray-900 mb-6">業績成長率</h3>
              <div class="growth-container">
                  <!-- 20%の数字 -->
                  <div class="growth-value">
                      <span class="text-[12rem] font-extrabold tracking-tighter" id="growth-rate" style="color: var(--color-accent-purple); line-height: 1; letter-spacing: -0.05em;">0</span>
                      <span class="text-[12rem] font-extrabold tracking-tighter" style="color: var(--color-accent-purple); line-height: 1; letter-spacing: -0.05em; font-size: 0.6em;">%</span>
                  </div>
              </div>
              <p class="text-xl text-gray-500 mt-4">約20%以上（過去４年の平均）</p>
          </div>

          <!-- 2. 創業年数 (15年〜) - 小さめに -->
          <div class="p-6 relative flex flex-col justify-center text-center lg:col-span-1" style="animation-delay: 0.1s;">
              <h3 class="text-xl font-black tracking-wider" style="color: var(--color-primary-blue);">創業年数</h3>
              <div class="mt-4">
                  <span class="text-[10rem] font-black tracking-tighter" id="founding-years" style="color: var(--color-primary-blue); line-height: 1; letter-spacing: -0.05em;">0</span>
                  <span class="text-[10rem] font-black tracking-tighter" style="color: var(--color-primary-blue); line-height: 1; letter-spacing: -0.05em; font-size: 0.6em;">年</span>
              </div>
          </div>
          
          <!-- 3-5. 男女比、中途新卒、年齢構成を横並びで配置 -->
          <div class="p-6 relative lg:col-span-3 flex flex-col lg:flex-row gap-6" style="animation-delay: 0.2s;">
              
              <!-- 左側: 男女比と中途新卒を縦に並べる -->
              <div class="lg:w-1/2 flex flex-col gap-6">
                  
                  <!-- 男女比 -->
                  <div class="flex flex-col justify-center">
                      <h3 class="text-2xl font-black tracking-wider text-gray-900 mb-4">男女比</h3>
                      <div class="flex w-full h-16 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                          <!-- 女性 (66%) -->
                          <div id="gender-female-bar" class="flex items-center justify-center transition-all duration-1500 ease-out" style="width: 0%; background-color: var(--color-accent-purple);">
                              <span class="text-2xl font-black text-white whitespace-nowrap">
                                  <span class="text-lg">女性</span> <span id="gender-female">0</span>
                              </span>
                          </div>
                          <!-- 男性 (34%) -->
                          <div id="gender-male-bar" class="flex items-center justify-center transition-all duration-1500 ease-out" style="width: 0%; background-color: var(--color-primary-blue);">
                               <span class="text-2xl font-black text-white whitespace-nowrap">
                                   <span class="text-lg">男性</span> <span id="gender-male">0</span>
                               </span>
                          </div>
                      </div>
                  </div>

                  <!-- 中途新卒 -->
                  <div class="flex flex-col justify-center">
                      <h3 class="text-xl font-black tracking-wider text-gray-900 mb-4">中途/新卒</h3>
                      <div class="flex w-full h-12 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                          <!-- 中途 (60%) -->
                          <div id="mid-career-bar" class="flex items-center justify-center transition-all duration-1500 ease-out" style="width: 0%; background-color: var(--color-accent-purple);">
                              <span class="text-xl font-bold text-white whitespace-nowrap">
                                  <span class="text-sm">中途</span> <span id="mid-career">0</span>
                              </span>
                          </div>
                          <!-- 新卒 (40%) -->
                          <div id="new-grad-bar" class="flex items-center justify-center transition-all duration-1500 ease-out" style="width: 0%; background-color: var(--color-primary-blue);">
                               <span class="text-xl font-bold text-white whitespace-nowrap">
                                   <span class="text-sm">新卒</span> <span id="new-grad">0</span>
                               </span>
                          </div>
                      </div>
                  </div>
                  
              </div>

              <!-- 右側: 年齢構成 -->
              <div class="lg:w-1/2 flex flex-col items-center justify-center">
                  <h3 class="text-2xl font-black tracking-wider text-gray-900 mb-6">年齢構成</h3>
                  <div class="relative w-80 h-80">
                      <svg id="age-pie-chart" viewBox="0 0 200 200" class="w-full h-full"></svg>
                  </div>
              </div>
              
          </div>
          
      </div>
      
    </div>
  </div>
  
</div>

<style>
  /* カスタムカラーとフォント */
  :root {
      --color-primary-blue: #1C3FAA; /* 青ベースのコントラストカラー */
      --color-accent-cyan: #00E6E6; /* アクセントシアン */
      --color-accent-purple: #9D58FF; /* アクセントパープル */
      --color-dark-text: #1F2937;
      --color-gray-text: #6B7280;
      /* 年齢構成の色合いを調整し、円グラフのセグメントがよりはっきり見えるようにコントラストを確保 */
      --color-20s: #3B82F6; /* 青系 */
      --color-30s: #9333EA; /* 紫系 */
      --color-40s: #10B981; /* 緑系 */
      --color-50s-plus: #F59E0B; /* オレンジ系 */
  }

  /* フェードインアニメーション */
  @keyframes fadeIn {
      to {
          opacity: 1;
          transform: translateY(0);
      }
  }

  /* 業績成長率の動的な表現 */
  @keyframes dynamicGrowth {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
  }
  .growth-container {
      position: relative;
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .growth-value {
      z-index: 10;
      animation: dynamicGrowth 1s ease-out forwards;
  }

</style>
