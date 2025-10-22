<script lang="ts">
  import { onMount } from "svelte";

  // プロフェッショナリズムデータ
  const professionalisms = [
    {
      id: 1,
      title: "ハローワールド",
      alphabet: "HELLOWORLD",
      message: "楽しむから、変わる",
      description: "好奇心を持って、新しいことを試す"
    },
    {
      id: 2,
      title: "メタメセン",
      alphabet: "METAMESEN",
      message: "高く見て深く読む",
      description: "違和感を見逃さず、俯瞰して考える"
    },
    {
      id: 3,
      title: "フッカラー",
      alphabet: "FOOKALER",
      message: "試して、変えて、前に行け",
      description: "迷ったら素早く動き、柔軟に軌道修正する"
    },
    {
      id: 4,
      title: "モクテキーパー",
      alphabet: "MOKUTEKEEPER",
      message: "問い続けろ、行動の理由を",
      description: "目的を問い続け、手段の目的化を避ける"
    },
    {
      id: 5,
      title: "リスぺリレー",
      alphabet: "RESPERELAY",
      message: "信頼はひとりでは作れない",
      description: "信じる、だから信じられる"
    },
    {
      id: 6,
      title: "ギブレルヤツ",
      alphabet: "GIVERELYATSU",
      message: "見返りなんて、いらない",
      description: "仲間と与え合い、助け合う関係を築く"
    },
    {
      id: 7,
      title: "ジブンジク",
      alphabet: "JIBUNJIKU",
      message: "選んだ道が自分をつくる",
      description: "判断基準を明確にし、自分で決める"
    },
    {
      id: 8,
      title: "カラダシホン",
      alphabet: "KARADASHIHON",
      message: "メンテしてこそ動ける",
      description: "健康を先手でケアする"
    },
    {
      id: 9,
      title: "アイテメガネ",
      alphabet: "AITEMEGANE",
      message: "尊重し合うから、新しい可能性がみつかる",
      description: "相手の価値観を尊重する"
    }
  ];

  // 6面体の各面に表示する内容を管理
  let cubeFaces: any[] = [];
  let currentRotation = { x: -15, y: 45 }; // 斜め俯瞰の角度からスタート
  let isRotating = false;
  let autoRotate = true;
  let autoRotateInterval: any;
  let visibleItems: any[] = []; // 現在表示されている6個のアイテム
  let hiddenItems: any[] = []; // 残りの3個のアイテム

  // ドラッグ操作の管理
  let isDragging = false;
  let lastMousePosition = { x: 0, y: 0 };
  let touchStartTime = 0;
  let touchStartPosition = { x: 0, y: 0 };

  // 面の選択状態管理
  let selectedFaceIndex: number | null = null;
  let isFaceRotating = false;

  // 9個のプロフェッショナリズムを6面に分散配置（1面1個）
  function initializeCubeFaces() {
    // 最初の6個を表示用に、残り3個を隠し用に分ける
    visibleItems = [...professionalisms.slice(0, 6)];
    hiddenItems = [...professionalisms.slice(6, 9)];
    
    const faces = [];
    for (let i = 0; i < 6; i++) {
      faces.push({
        id: i,
        item: visibleItems[i],
        rotation: getFaceRotation(i)
      });
    }
    cubeFaces = faces;
  }

  // ランダムに入れ替え
  function shuffleItems() {
    if (hiddenItems.length === 0) return;
    
    // ランダムに1-3個の面を選択して入れ替え
    const shuffleCount = Math.floor(Math.random() * 3) + 1;
    const facesToShuffle: number[] = [];
    
    for (let i = 0; i < shuffleCount; i++) {
      const randomFaceIndex = Math.floor(Math.random() * 6);
      if (!facesToShuffle.includes(randomFaceIndex)) {
        facesToShuffle.push(randomFaceIndex);
      }
    }
    
    // 選択された面のアイテムを隠しアイテムと入れ替え
    facesToShuffle.forEach(faceIndex => {
      const currentItem = cubeFaces[faceIndex].item;
      const randomHiddenIndex = Math.floor(Math.random() * hiddenItems.length);
      const newItem = hiddenItems[randomHiddenIndex];
      
      // 入れ替え実行
      hiddenItems[randomHiddenIndex] = currentItem;
      cubeFaces[faceIndex].item = newItem;
    });
    
    // 配列を更新
    cubeFaces = [...cubeFaces];
  }

  // 各面の回転角度を計算
  function getFaceRotation(faceIndex: number) {
    const rotations = [
      { x: 0, y: 0 },      // 前面
      { x: 0, y: 90 },     // 右面
      { x: 0, y: 180 },    // 後面
      { x: 0, y: 270 },    // 左面
      { x: 90, y: 0 },     // 上面
      { x: -90, y: 0 }     // 下面
    ];
    return rotations[faceIndex];
  }

  // キューブを回転（文字が逆さまにならないように制約を追加）
  function rotateCube(direction: string) {
    if (isRotating || isDragging) return;
    isRotating = true;

    let newRotation = { ...currentRotation };

    switch (direction) {
      case 'left':
        newRotation.y -= 90;
        break;
      case 'right':
        newRotation.y += 90;
        break;
      case 'up':
        newRotation.x += 90;
        break;
      case 'down':
        newRotation.x -= 90;
        break;
    }

    // 文字が逆さまになる角度を避ける（x軸は-45度から45度の範囲に制限）
    if (newRotation.x > 45) newRotation.x = 45;
    if (newRotation.x < -45) newRotation.x = -45;

    currentRotation = newRotation;

    setTimeout(() => {
      isRotating = false;
      // 回転後にランダムに入れ替え
      shuffleItems();
    }, 1000);
  }

  // キューブクリックで回転
  function handleCubeClick() {
    if (isRotating || isDragging || isFaceRotating) return;
    
    // 選択状態をリセット
    selectedFaceIndex = null;
    
    const directions = ['left', 'right', 'up', 'down'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    if (randomDirection) {
      rotateCube(randomDirection);
    }
  }

  // 面をクリックして詳細表示
  function handleFaceClick(faceIndex: number, event: Event) {
    event.stopPropagation(); // キューブ全体のクリックイベントを防ぐ
    
    if (isRotating || isDragging || isFaceRotating) return;
    
    // 同じ面が既に選択されている場合は詳細を閉じる
    if (selectedFaceIndex === faceIndex) {
      selectedFaceIndex = null;
      return;
    }
    
    // 選択された面を正面に回転
    selectedFaceIndex = faceIndex;
    rotateToFace(faceIndex);
  }

  // タッチ開始（タップとドラッグを区別）
  function handleTouchStart(event: TouchEvent) {
    touchStartTime = Date.now();
    const touch = event.touches[0];
    touchStartPosition = { x: touch.clientX, y: touch.clientY };
    lastMousePosition = { x: touch.clientX, y: touch.clientY };
  }

  // タッチ終了（タップ判定）
  function handleTouchEnd(event: TouchEvent, faceIndex?: number) {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;
    
    // タップ判定（200ms以内で移動距離が小さい場合）
    if (touchDuration < 200) {
      const touch = event.changedTouches[0];
      const moveDistance = Math.sqrt(
        Math.pow(touch.clientX - touchStartPosition.x, 2) + 
        Math.pow(touch.clientY - touchStartPosition.y, 2)
      );
      
      // 移動距離が10px以内ならタップと判定
      if (moveDistance < 10) {
        event.preventDefault();
        event.stopPropagation();
        
        if (faceIndex !== undefined) {
          // 面のタップ
          handleFaceClick(faceIndex, event);
        } else {
          // キューブ全体のタップ
          handleCubeClick();
        }
        return;
      }
    }
    
    // ドラッグ終了処理
    handleDragEnd();
  }

  // 指定された面を正面に回転
  function rotateToFace(faceIndex: number) {
    if (isFaceRotating) return;
    isFaceRotating = true;
    
    // 各面の正面角度を計算
    const faceRotations = [
      { x: 0, y: 0 },      // 前面
      { x: 0, y: -90 },    // 右面
      { x: 0, y: -180 },   // 後面
      { x: 0, y: -270 },   // 左面
      { x: -90, y: 0 },    // 上面
      { x: 90, y: 0 }      // 下面
    ];
    
    const targetRotation = faceRotations[faceIndex];
    
    // 現在の回転から目標回転にスムーズに移動
    if (targetRotation) {
      currentRotation = targetRotation;
    }
    
    setTimeout(() => {
      isFaceRotating = false;
      
      // 正面表示後、3秒後に斜めの状態に戻す
      setTimeout(() => {
        if (selectedFaceIndex === faceIndex && !isRotating && !isDragging && !isFaceRotating) {
          // 斜め俯瞰の角度に戻す
          currentRotation = { x: -15, y: 45 };
          
          // 自動回転を再開
          if (autoRotate) {
            startAutoRotate();
          }
        }
      }, 3000);
    }, 800);
  }

  // ドラッグ開始
  function handleDragStart(event: MouseEvent | TouchEvent) {
    if (isRotating || isFaceRotating) return;
    
    // タッチイベントの場合はタップ判定のため、ドラッグ開始を遅延
    if ('touches' in event) {
      // タッチ開始時の処理は handleTouchStart で行う
      return;
    }
    
    isDragging = true;
    
    // 自動回転を一時停止
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
    
    // マウス位置を取得
    const clientX = event.clientX;
    const clientY = event.clientY;
    
    lastMousePosition = { x: clientX, y: clientY };
    
    // イベントのデフォルト動作を防ぐ
    event.preventDefault();
  }

  // ドラッグ開始（タッチ用）
  function handleTouchDragStart(event: TouchEvent) {
    if (isRotating || isFaceRotating) return;
    
    // 少し遅延してからドラッグ開始判定
    setTimeout(() => {
      if (Date.now() - touchStartTime > 100) { // 100ms以上経過したらドラッグと判定
        isDragging = true;
        
        // 自動回転を一時停止
        if (autoRotateInterval) {
          clearInterval(autoRotateInterval);
        }
      }
    }, 100);
  }

  // ドラッグ中
  function handleDragMove(event: MouseEvent | TouchEvent) {
    if (!isDragging) return;
    
    const clientX = 'touches' in event ? event.touches[0]?.clientX || 0 : event.clientX;
    const clientY = 'touches' in event ? event.touches[0]?.clientY || 0 : event.clientY;
    
    // 移動量を計算
    const deltaX = clientX - lastMousePosition.x;
    const deltaY = clientY - lastMousePosition.y;
    
    // 回転量を計算（感度調整） - 現在の回転位置を基準に移動量を加算
    const sensitivity = 1.5; // 感度を上げる
    const rotationY = currentRotation.y + deltaX * sensitivity;
    const rotationX = currentRotation.x - deltaY * sensitivity;
    
    // 文字が逆さまになる角度を避ける（x軸は-45度から45度の範囲に制限）
    let newRotationX = rotationX;
    if (newRotationX > 45) newRotationX = 45;
    if (newRotationX < -45) newRotationX = -45;
    
    currentRotation = { x: newRotationX, y: rotationY };
    lastMousePosition = { x: clientX, y: clientY };
    
    event.preventDefault();
  }

  // ドラッグ終了
  function handleDragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // 選択状態をリセット（ドラッグ操作後は斜めの状態に戻す）
    selectedFaceIndex = null;
    
    // 自動回転を再開
    if (autoRotate) {
      startAutoRotate();
    }
  }

  // 自動回転
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      if (!isRotating && autoRotate && !isDragging && !isFaceRotating) {
        const directions = ['left', 'right', 'up', 'down'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        if (randomDirection) {
          rotateCube(randomDirection);
        }
      }
    }, 5000); // 少し間隔を長くして、入れ替えを楽しめるように
  }

  // 自動回転を停止/開始
  function toggleAutoRotate() {
    autoRotate = !autoRotate;
    if (autoRotate) {
      startAutoRotate();
    } else {
      clearInterval(autoRotateInterval);
    }
  }

  onMount(() => {
    initializeCubeFaces();
    startAutoRotate();
    
    // グローバルイベントリスナーを追加
    const handleGlobalMouseMove = (e: MouseEvent) => handleDragMove(e);
    const handleGlobalMouseUp = () => handleDragEnd();
    const handleGlobalTouchMove = (e: TouchEvent) => handleDragMove(e);
    const handleGlobalTouchEnd = () => handleDragEnd();
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      if (autoRotateInterval) clearInterval(autoRotateInterval);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  });
</script>

<section class="professionalism-section py-24 bg-gray-50">
  <div class="mx-auto max-w-none sm:max-w-7xl px-4">
    <!-- セクションヘッダー -->
    <div class="mb-20 text-center">
      <h2 class="mb-6 font-english text-5xl font-black text-gray-900 md:text-6xl leading-[0.9] md:leading-[0.95]" style="letter-spacing: -0.05em;">
        PROFESSIONALISM
      </h2>
      <p class="text-xl text-gray-600">JOYZOのメンバーが大切にする価値観</p>
    </div>

    <!-- 3Dキューブコンテナ -->
    <div class="cube-container my-20" style="perspective: 1000px; perspective-origin: center center; -webkit-perspective: 1000px; -webkit-perspective-origin: center center;">
      <div class="cube-wrapper">
        <div 
          class="cube {isRotating ? 'rotating' : ''} {isDragging ? 'dragging' : ''} {isFaceRotating ? 'face-rotating' : ''}"
          style="transform: rotateX({currentRotation.x}deg) rotateY({currentRotation.y}deg); transform-style: preserve-3d; -webkit-transform-style: preserve-3d;"
          on:click={handleCubeClick}
          on:mousedown={handleDragStart}
          on:touchstart={handleTouchStart}
          on:touchmove={handleTouchDragStart}
          on:touchend={(e) => handleTouchEnd(e)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && handleCubeClick()}
        >
          {#each cubeFaces as face, faceIndex}
            <div 
              class="cube-face {selectedFaceIndex === faceIndex ? 'selected' : ''}"
              style="transform: rotateX({face.rotation.x}deg) rotateY({face.rotation.y}deg) translateZ(200px); backface-visibility: hidden; -webkit-backface-visibility: hidden;"
              on:click={(e) => handleFaceClick(faceIndex, e)}
              on:touchstart={handleTouchStart}
              on:touchend={(e) => handleTouchEnd(e, faceIndex)}
              role="button"
              tabindex="0"
              on:keydown={(e) => e.key === 'Enter' && handleFaceClick(faceIndex, e)}
            >
              <div class="face-content">
                <div class="professionalism-item">
                  <!-- 基本情報（常に表示） -->
                  <div class="basic-info">
                    <div class="mb-4 text-center">
                      <div class="text-2xl font-bold text-gray-900 mb-2" style="letter-spacing: -0.06em; white-space: nowrap;">
                        {face.item.title}
                      </div>
                      <div class="font-english text-lg font-black text-gray-700 tracking-wider">
                        {face.item.alphabet}
                      </div>
                    </div>
                    <!-- ID装飾 -->
                    <div class="id-decoration">
                      <span class="font-english font-black opacity-30 id-color-{faceIndex}" style="font-size: 12em;">
                        {face.item.id}
                      </span>
                    </div>
                  </div>
                  
                  <!-- 詳細情報（選択時のみ表示） -->
                  {#if selectedFaceIndex === faceIndex}
                    <div class="detailed-info animate-fade-in">
                      <!-- メインメッセージ -->
                      <h3 class="text-2xl font-bold text-gray-900 leading-tight mb-4 mt-4">
                        {face.item.message}
                      </h3>
                      
                      <!-- ディスクリプション -->
                      <p class="text-sm text-gray-700 leading-relaxed">
                        {face.item.description}
                      </p>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- ナビゲーションコントロール（非表示） -->
    <div class="mb-12 flex flex-col items-center space-y-6 hidden">
      <!-- 方向ボタン -->
      <div class="flex space-x-4">
        <button
          on:click={() => rotateCube('up')}
          class="cube-control-btn"
          disabled={isRotating}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
      </div>
      
      <div class="flex items-center space-x-4">
        <button
          on:click={() => rotateCube('left')}
          class="cube-control-btn"
          disabled={isRotating}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button
          on:click={toggleAutoRotate}
          class="auto-rotate-btn {autoRotate ? 'active' : ''}"
        >
          {autoRotate ? '⏸️' : '▶️'}
        </button>
        
        <button
          on:click={() => rotateCube('right')}
          class="cube-control-btn"
          disabled={isRotating}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <div class="flex space-x-4">
        <button
          on:click={() => rotateCube('down')}
          class="cube-control-btn"
          disabled={isRotating}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- フッター -->
    <div class="text-center">
      <p class="text-gray-600 mb-8">
        これらは私たちが日々の仕事で大切にしている価値観です。<br>
        一人ひとりがこれらのプロフェッショナリズムを胸に、お客様と共に価値あるシステムを創り上げています。
      </p>
      
      <!-- aboutjoyzoへの導線 -->
      <div class="inline-block">
        <a
          href="/aboutjoyzo"
          class="inline-flex items-center justify-center rounded-none bg-gray-800 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
        >
          ジョイゾーのことをもっと詳しく
          <svg
            class="ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .professionalism-section {
    /* background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); */
  }

  /* 3Dキューブスタイル */
  .cube-container {
    perspective: 1000px !important;
    perspective-origin: center center !important;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-perspective: 1000px !important;
    -webkit-perspective-origin: center center !important;
  }

  .cube-wrapper {
    position: relative;
    width: 360px;
    height: 360px;
  }

  .cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d !important;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: grab;
    user-select: none;
    touch-action: manipulation; /* モバイルでのタッチ操作を最適化 */
    -webkit-tap-highlight-color: transparent; /* iOS のタップハイライトを無効化 */
    -webkit-transform-style: preserve-3d !important;
  }

  .cube:hover {
    transform: scale(1.05);
  }

  .cube.rotating {
    cursor: wait;
  }

  .cube.dragging {
    cursor: grabbing;
    transition: none; /* ドラッグ中はtransitionを無効化 */
  }

  .cube.dragging:hover {
    transform: none; /* ドラッグ中はhoverエフェクトを無効化 */
  }

  .cube.face-rotating {
    cursor: wait;
  }

  .cube-face {
    position: absolute;
    width: 400px;
    height: 400px;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden !important;
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation; /* モバイルでのタッチ操作を最適化 */
    -webkit-tap-highlight-color: transparent; /* iOS のタップハイライトを無効化 */
    -webkit-backface-visibility: hidden !important;
  }

  /* 各面の色設定 */
  .cube-face:nth-child(1) { background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
  .cube-face:nth-child(2) { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
  .cube-face:nth-child(3) { background: linear-gradient(135deg, #45b7d1, #96c93d); }
  .cube-face:nth-child(4) { background: linear-gradient(135deg, #f093fb, #f5576c); }
  .cube-face:nth-child(5) { background: linear-gradient(135deg, #4facfe, #00f2fe); }
  .cube-face:nth-child(6) { background: linear-gradient(135deg, #43e97b, #38f9d7); }

  .cube-face:hover {
    transform: scale(1.05) translateZ(10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .cube-face.selected {
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 35px 70px rgba(0, 0, 0, 0.4);
    transform: scale(1.08) translateZ(15px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .face-content {
    padding: 40px;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .professionalism-item {
    padding: 24px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    max-width: 320px;
    width: 100%;
    backdrop-filter: blur(10px);
  }

  .basic-info {
    transition: all 0.3s ease;
    position: relative;
  }

  .id-decoration {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    pointer-events: none;
  }

  .detailed-info {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* コントロールボタン */
  .cube-control-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: white;
    border: 2px solid #e5e7eb;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .cube-control-btn:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #d1d5db;
    color: #374151;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .cube-control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .auto-rotate-btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border: none;
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .auto-rotate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }

  .auto-rotate-btn.active {
    background: linear-gradient(135deg, #ef4444, #f97316);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  .auto-rotate-btn.active:hover {
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
  }

  /* レスポンシブ対応 */
  @media (max-width: 768px) {
    .cube-container {
      height: 350px;
      perspective: 400px; /* モバイルではperspectiveを大幅に小さく */
    }

    .cube-wrapper {
      width: 250px;
      height: 250px;
    }

    .cube-face {
      width: 250px;
      height: 250px;
    }

    /* モバイル用のtranslateZを動的に調整 */
    .cube-face:nth-child(1) { 
      transform: rotateX(0deg) rotateY(0deg) translateZ(125px) !important; 
    }
    .cube-face:nth-child(2) { 
      transform: rotateX(0deg) rotateY(90deg) translateZ(125px) !important; 
    }
    .cube-face:nth-child(3) { 
      transform: rotateX(0deg) rotateY(180deg) translateZ(125px) !important; 
    }
    .cube-face:nth-child(4) { 
      transform: rotateX(0deg) rotateY(270deg) translateZ(125px) !important; 
    }
    .cube-face:nth-child(5) { 
      transform: rotateX(90deg) rotateY(0deg) translateZ(125px) !important; 
    }
    .cube-face:nth-child(6) { 
      transform: rotateX(-90deg) rotateY(0deg) translateZ(125px) !important; 
    }

    .face-content {
      padding: 16px;
      gap: 12px;
    }

    .professionalism-item {
      padding: 16px;
      max-width: 220px;
    }

    .professionalism-item h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }

    .professionalism-item .text-lg {
      font-size: 13px;
    }

    .professionalism-item .text-sm {
      font-size: 11px;
    }
  }

  /* 力強くかつ抑えめのトーンの色設定 */
  .cube-face:nth-child(1) { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); }
  .cube-face:nth-child(2) { background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); }
  .cube-face:nth-child(3) { background: linear-gradient(135deg, #7c2d12 0%, #9a3412 100%); }
  .cube-face:nth-child(4) { background: linear-gradient(135deg, #14532d 0%, #166534 100%); }
  .cube-face:nth-child(5) { background: linear-gradient(135deg, #a16207 0%, #ca8a04 100%); }
  .cube-face:nth-child(6) { background: linear-gradient(135deg, #7c2d12 0%, #dc2626 100%); }

  /* ID装飾の色設定（各面の背景色と同系色の薄め） */
  .id-color-0 { color: #64748b; } /* グレー系の薄め */
  .id-color-1 { color: #60a5fa; } /* ブルー系の薄め */
  .id-color-2 { color: #fb923c; } /* オレンジ系の薄め */
  .id-color-3 { color: #4ade80; } /* グリーン系の薄め */
  .id-color-4 { color: #fbbf24; } /* イエロー系の薄め */
  .id-color-5 { color: #f87171; } /* レッド系の薄め */
</style>
