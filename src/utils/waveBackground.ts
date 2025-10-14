// wave_background.ts

/**
 * 画面全体に波のアニメーション背景を生成・管理するクラス。
 * 上部と下部に2つのSVGグループを配置し、
 * CSSアニメーションによるフワフワした動きと、
 * スクロール量に追従する滑らかなSVG形状変化（Lerp処理）を組み合わせます。
 */
class WaveBackground {
  // Lerp (線形補間) のための変数と設定
  private currentScrollOffset: number = 0;
  // 補間係数 (値が小さいほど滑らかに変化) - より反応を明確にするため調整
  private readonly LERP_FACTOR: number = 0.12;
  private isTicking: boolean = false;

  // DOM要素を保持するプロパティ (初期化時に代入されるため、definite assignment assertion '!' を使用)
  private wavePaths: SVGPathElement[] = [];
  private topWavePaths: SVGPathElement[] = [];
  
  // 下部グループ（既存）
  private wave1!: SVGPathElement;
  private wave2!: SVGPathElement;
  private wave3!: SVGPathElement;
  
  // 上部グループ（新規追加）
  private topWave1!: SVGPathElement;
  private topWave2!: SVGPathElement;
  private topWave3!: SVGPathElement;

  constructor() {
      // コンストラクタでの初期化は最低限に抑え、init() でDOM操作を実行します。
  }

  /**
   * 必要なCSSスタイルとキーフレームをドキュメントヘッドに挿入します。
   */
  private _injectStyles(): void {
      const style = document.createElement('style');
      style.textContent = `
          /* 1. 波の背景レイヤー全体の設定 */
          .wave-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100vh;
              z-index: -1;
              overflow: hidden;
              background-color: #e6f0ff; 
          }

          /* 2. SVGのアニメーション定義 (フワフワした動き) - パフォーマンス最適化 */
          @keyframes wave-move-slow {
              0% { transform: translate3d(4%, 3%, 0) rotate(0deg); }
              50% { transform: translate3d(-1.5%, -3%, 0) rotate(1deg); }
              100% { transform: translate3d(4%, 3%, 0) rotate(0deg); }
          }

          @keyframes wave-move-medium {
              0% { transform: translate3d(-1.5%, -3%, 0) rotate(-0.5deg); }
              50% { transform: translate3d(4%, 3%, 0) rotate(0.5deg); }
              100% { transform: translate3d(-1.5%, -3%, 0) rotate(-0.5deg); }
          }

          @keyframes wave-move-fast {
              0% { transform: translate3d(6%, 6%, 0) rotate(0.8deg); }
              50% { transform: translate3d(-3%, -3%, 0) rotate(-0.8deg); }
              100% { transform: translate3d(6%, 6%, 0) rotate(0.8deg); }
          }

          /* 上部グループ用のアニメーション（逆方向） */
          @keyframes wave-move-slow-reverse {
              0% { transform: translate3d(-4%, -3%, 0) rotate(0deg); }
              50% { transform: translate3d(1.5%, 3%, 0) rotate(-1deg); }
              100% { transform: translate3d(-4%, -3%, 0) rotate(0deg); }
          }

          @keyframes wave-move-medium-reverse {
              0% { transform: translate3d(1.5%, 3%, 0) rotate(0.5deg); }
              50% { transform: translate3d(-4%, -3%, 0) rotate(-0.5deg); }
              100% { transform: translate3d(1.5%, 3%, 0) rotate(0.5deg); }
          }

          @keyframes wave-move-fast-reverse {
              0% { transform: translate3d(-6%, -6%, 0) rotate(-0.8deg); }
              50% { transform: translate3d(3%, 3%, 0) rotate(0.8deg); }
              100% { transform: translate3d(-6%, -6%, 0) rotate(-0.8deg); }
          }

          /* SVGのスタイル - 2つのグループに対応 */
          .wave-svg {
              position: absolute;
              left: -50vw; /* 画面幅の50%分左にずらして端が絶対に見えないように */
              width: 250%; /* 画面幅の2.5倍にしてより十分な余白を確保 */
              min-width: 10000px; /* 横幅をさらに拡張して小さい画面でも安全 */
              min-height: 150vh;
              will-change: transform;
              backface-visibility: hidden;
              transform-style: preserve-3d;
          }

          /* 下部グループ */
          .wave-svg-bottom {
              bottom: -200vh; /* さらに下に配置して画面からはみ出す */
              left: auto; /* 左側の位置を自動調整 */
              right: -90vw; /* 下部グループをより右にずらす */
              height: 100vh; /* 高さを調整 */
              transform: rotate(23deg); /* 23度回転 */
              transform-origin: right bottom; /* 右下を基準点にして回転 */
              top: auto; /* 上部位置を自動調整 */
          }

          /* 上部グループ */
          .wave-svg-top {
              top: -20vh; /* 画面上部からはみ出るように配置 */
              left: -70vw; /* 上部グループをもっと左にずらす */
              height: 120vh;
              transform: none; /* パス形状で左右反転済み */
              transform-origin: center;
          }

          /* パスの共通スタイルとパフォーマンス最適化 */
          .wave-path {
              opacity: 0.7; 
              will-change: transform, d;
              animation-iteration-count: infinite;
              animation-timing-function: ease-in-out;
              transform-origin: center;
          }

          /* 下部グループの個別設定 */
          #wave1 {
              fill: rgba(30, 144, 255, 0.25);
              animation-name: wave-move-slow;
              animation-duration: 40s; 
          }

          #wave2 {
              fill: rgba(30, 144, 255, 0.35);
              animation-name: wave-move-medium;
              animation-duration: 35s; 
          }

          #wave3 {
              fill: rgba(30, 144, 255, 0.45);
              animation-name: wave-move-fast;
              animation-duration: 30s; 
          }

          /* 上部グループの個別設定（より控えめな動き） */
          #topWave1 {
              fill: rgba(70, 130, 180, 0.15);
              animation-name: wave-move-slow-reverse;
              animation-duration: 60s; /* よりゆっくり */
          }

          #topWave2 {
              fill: rgba(70, 130, 180, 0.25);
              animation-name: wave-move-medium-reverse;
              animation-duration: 55s; /* よりゆっくり */
          }

          #topWave3 {
              fill: rgba(70, 130, 180, 0.35);
              animation-name: wave-move-fast-reverse;
              animation-duration: 50s; /* よりゆっくり */
          }
      `;
      document.head.appendChild(style);
  }

  /**
   * SVG要素を作成し、bodyの末尾に追加します。
   * 上部と下部に2つのSVGグループを作成します。
   */
  private _createSvgMarkup(): void {
      const container = document.createElement('div');
      container.className = 'wave-container';
      container.id = 'waveContainer';

      // 下部グループのSVG（右側に寄せた形状に対応）
      const bottomSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      bottomSvg.setAttribute('class', 'wave-svg wave-svg-bottom');
      bottomSvg.setAttribute('viewBox', '0 0 3000 500'); // 横幅を1.5倍に拡張（2000→3000）
      bottomSvg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

      // 下部グループの波のデータ（右側に寄せた形状、1.5倍に拡大）
      const bottomWaves: { id: string; initialD: string }[] = [
          { id: 'wave1', initialD: "M1200,450 C 1500,300 1800,480 2100,300 S2400,200 3000,150 C 2700, 700 1800, 700 1200, 450 Z" },
          { id: 'wave2', initialD: "M1050,400 C 1350,250 1650,400 1950,250 S2250,100 2850,50 C 2550, 650 1650, 650 1050, 400 Z" },
          { id: 'wave3', initialD: "M900,350 C 1200,200 1500,350 1800,200 S2100,0 2700,0 C 2400, 600 1500, 600 900, 350 Z" }
      ];

      this.wavePaths = bottomWaves.map(wave => {
          const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
          path.setAttribute('id', wave.id);
          path.setAttribute('class', 'wave-path');
          path.setAttribute('d', wave.initialD);
          bottomSvg.appendChild(path);
          return path as SVGPathElement;
      });

      // 上部グループのSVG（異なる形状とパターン）
      const topSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      topSvg.setAttribute('class', 'wave-svg wave-svg-top');
      topSvg.setAttribute('viewBox', '0 0 2250 500'); // 横幅を1.5倍に拡張（1500→2250）
      topSvg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

      // 上部グループの波のデータ（左右反転した形状、1.5倍に拡大）
      const topWaves: { id: string; initialD: string }[] = [
          { id: 'topWave1', initialD: "M2250,0 C 2100,120 1800,30 1500,80 S1050,150 450,120 C 750, 0 1650, 0 2250, 0 Z" },
          { id: 'topWave2', initialD: "M2250,30 C 2025,180 1650,60 1350,110 S900,200 300,170 C 600, 30 1500, 30 2250, 30 Z" },
          { id: 'topWave3', initialD: "M2250,60 C 1950,240 1500,90 1200,140 S750,250 150,220 C 450, 60 1350, 60 2250, 60 Z" }
      ];

      this.topWavePaths = topWaves.map(wave => {
          const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
          path.setAttribute('id', wave.id);
          path.setAttribute('class', 'wave-path');
          path.setAttribute('d', wave.initialD);
          topSvg.appendChild(path);
          return path as SVGPathElement;
      });

      // コンテナに両方のSVGを追加
      container.appendChild(topSvg);
      container.appendChild(bottomSvg);
      document.body.appendChild(container);

      // 要素参照のセットアップ
      this.wave1 = this.wavePaths.find(p => p.id === 'wave1')!;
      this.wave2 = this.wavePaths.find(p => p.id === 'wave2')!;
      this.wave3 = this.wavePaths.find(p => p.id === 'wave3')!;
      
      this.topWave1 = this.topWavePaths.find(p => p.id === 'topWave1')!;
      this.topWave2 = this.topWavePaths.find(p => p.id === 'topWave2')!;
      this.topWave3 = this.topWavePaths.find(p => p.id === 'topWave3')!;
  }

  /**
   * スクロール量に応じてパスの形状を更新します（Lerpで滑らかに）。
   * 2つのグループ（上部・下部）を独立して更新し、パフォーマンスを最適化します。
   * @param {number} scrollY - 現在のスクロール量
   */
  private _updateWaveShape(scrollY: number): void {
      // スクロール量に応じた目標オフセットを計算 (最大 150px まで変化、より強く反応)
      const targetScrollOffset: number = Math.min(scrollY * 0.25, 150); 

      // 線形補間 (Lerp) を使用して現在のオフセットを目標オフセットに近づける
      this.currentScrollOffset += (targetScrollOffset - this.currentScrollOffset) * this.LERP_FACTOR;

      const scrollOffset: number = this.currentScrollOffset; // 補間後の値を使用

      // 下部グループの形状更新（既存のパターン）
      this._updateBottomWaves(scrollOffset);
      
      // 上部グループの形状更新（逆方向の動き）
      this._updateTopWaves(scrollOffset);
  }

  /**
   * 下部グループの波の形状を更新します（右側に寄せた形状）
   * @param {number} scrollOffset - 補間後のスクロールオフセット
   */
  private _updateBottomWaves(scrollOffset: number): void {
      // #wave1 の形状を更新（右下に配置、スクロールで動きを明確に、1.5倍座標）
      const d1 = `M${1200 + scrollOffset * 0.6},${450 + scrollOffset * 1.0} 
                  C ${1500 + scrollOffset * 0.7},${300 + scrollOffset * 1.5} ${1800 + scrollOffset * 0.5},${480 + scrollOffset * 0.8} 
                  ${2100 + scrollOffset * 0.6},300 
                  S${2400 + scrollOffset * 0.5},200 ${3000 + scrollOffset * 0.7},${150 + scrollOffset * 2.0} 
                  C ${2700 + scrollOffset * 0.6}, 700 ${1800 + scrollOffset * 0.5}, 700 ${1200 + scrollOffset * 0.6}, ${450 + scrollOffset * 1.0} Z`;
      this.wave1.setAttribute('d', d1.replace(/\s+/g, ' ').trim());

      // #wave2 の形状を更新（1.5倍座標）
      const d2 = `M${1050 + scrollOffset * 0.7},${400 + scrollOffset * 0.8} 
                  C ${1350 + scrollOffset * 0.6},${250 + scrollOffset * 1.8} ${1650 + scrollOffset * 0.5},${400 + scrollOffset * 1.0} 
                  ${1950 + scrollOffset * 0.6},250 
                  S${2250 + scrollOffset * 0.5},100 ${2850 + scrollOffset * 0.6},${50 + scrollOffset * 1.6} 
                  C ${2550 + scrollOffset * 0.5}, 650 ${1650 + scrollOffset * 0.6}, 650 ${1050 + scrollOffset * 0.7}, ${400 + scrollOffset * 0.8} Z`;
      this.wave2.setAttribute('d', d2.replace(/\s+/g, ' ').trim());
      
      // #wave3 の形状を更新 (最も手前で大きく動く、1.5倍座標)
      const d3 = `M${900 + scrollOffset * 0.8},${350 + scrollOffset * 0.7} 
                  C ${1200 + scrollOffset * 0.5},${200 + scrollOffset * 1.6} ${1500 + scrollOffset * 0.6},${350 + scrollOffset * 1.2} 
                  ${1800 + scrollOffset * 0.5},200 
                  S${2100 + scrollOffset * 0.6},0 ${2700 + scrollOffset * 0.5},${0 + scrollOffset * 2.5} 
                  C ${2400 + scrollOffset * 0.6}, 600 ${1500 + scrollOffset * 0.5}, 600 ${900 + scrollOffset * 0.8}, ${350 + scrollOffset * 0.7} Z`;
      this.wave3.setAttribute('d', d3.replace(/\s+/g, ' ').trim());
  }

  /**
   * 上部グループの波の形状を更新します（画面左端に中心を配置）
   * @param {number} scrollOffset - 補間後のスクロールオフセット
   */
  private _updateTopWaves(scrollOffset: number): void {
      // 上部グループは逆方向に動く（負の値を使用、より強く反応）
      const reverseOffset = -scrollOffset * 1.2;

      // #topWave1 の形状を更新（左右反転した形状、より強く反応、1.5倍座標）
      const d1 = `M2250,${0 + reverseOffset * 0.5} 
                  C 2100,${120 + reverseOffset * 0.8} 1800,${30 + reverseOffset * 1.0} 
                  1500,80 
                  S1050,150 450,${120 + reverseOffset * 0.4} 
                  C 750, 0 1650, 0 2250, ${0 + reverseOffset * 0.5} Z`;
      this.topWave1.setAttribute('d', d1.replace(/\s+/g, ' ').trim());

      // #topWave2 の形状を更新（1.5倍座標）
      const d2 = `M2250,${30 + reverseOffset * 0.6} 
                  C 2025,${180 + reverseOffset * 0.9} 1650,${60 + reverseOffset * 0.8} 
                  1350,110 
                  S900,200 300,${170 + reverseOffset * 0.5} 
                  C 600, 30 1500, 30 2250, ${30 + reverseOffset * 0.6} Z`;
      this.topWave2.setAttribute('d', d2.replace(/\s+/g, ' ').trim());
      
      // #topWave3 の形状を更新（1.5倍座標）
      const d3 = `M2250,${60 + reverseOffset * 0.7} 
                  C 1950,${240 + reverseOffset * 0.6} 1500,${90 + reverseOffset * 0.9} 
                  1200,140 
                  S750,250 150,${220 + reverseOffset * 0.3} 
                  C 450, 60 1350, 60 2250, ${60 + reverseOffset * 0.7} Z`;
      this.topWave3.setAttribute('d', d3.replace(/\s+/g, ' ').trim());
  }

  /**
   * requestAnimationFrame で実行されるメイン更新関数
   * パフォーマンス最適化のため、必要時のみ更新を実行します。
   */
  private _update = (): void => {
      const scrollY: number = window.scrollY;
      
      // 形状変化の実行
      this._updateWaveShape(scrollY);

      this.isTicking = false;
      
      // スクロールが停止した場合は更新を停止（パフォーマンス最適化）
      if (Math.abs(scrollY - this.lastScrollY) > 1) {
          this.lastScrollY = scrollY;
          this._requestTick(); // 継続的な更新を要求
      }
  }

  private lastScrollY: number = 0;

  /**
   * requestAnimationFrame を使用した更新ループ
   * パフォーマンス最適化のため、重複実行を防止します。
   */
  private _requestTick = (): void => {
      if (!this.isTicking) {
          // this._updateをthisでバインドされた関数として渡す
          requestAnimationFrame(this._update);
          this.isTicking = true;
      }
  }

  /**
   * スクロールイベントハンドラ
   * パフォーマンス最適化のため、throttle処理を実装します。
   */
  private _handleScroll = (): void => {
      // スクロールイベントの頻度を制限（60fps相当）
      if (!this.isTicking) {
          this._requestTick();
      }
  }

  /**
   * 背景アニメーションを初期化し、開始します。
   * 既存のサイトに組み込む際は、DOMContentLoaded後にこのメソッドを呼び出してください。
   */
  public init(): void {
      // 1. スタイルを挿入
      this._injectStyles();
      
      // 2. SVGマークアップを挿入
      this._createSvgMarkup();
      
      // 3. bodyにクラスを追加して背景を透明にする
      document.body.classList.add('wave-background-active');
      
      // 4. スクロールイベントリスナーを設定
      window.addEventListener('scroll', this._handleScroll);
      
      // 5. ページロード時の初期形状を設定し、アニメーションループを開始
      this._requestTick(); 
  }
}

// グローバルスコープでクラスを使用できるようにする
(window as any).WaveBackground = WaveBackground;
