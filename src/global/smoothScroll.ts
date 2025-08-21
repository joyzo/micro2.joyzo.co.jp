// スムーズスクロール機能
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#header') as HTMLElement;
  
  // ヘッダーの初期状態を非表示に設定
  if (header) {
    header.style.transform = 'translateY(-100%)';
  }
  
  // Lenisが有効な場合は、通常のスクロールイベントを無効化して競合を避ける
  if ((window as any).lenis) {
    // Lenisが有効な場合のヘッダー制御
    (window as any).lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      if (scroll > window.innerHeight * 0.5) {
        if (header) {
          header.style.transform = 'translateY(0)';
        }
      } else {
        if (header) {
          header.style.transform = 'translateY(-100%)';
        }
      }
    });
  } else {
    // Lenisが無効な場合のみ通常のスクロールイベントを使用
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > window.innerHeight * 0.5) {
        // ファーストビューを過ぎたらヘッダーを表示
        if (header) {
          header.style.transform = 'translateY(0)';
        }
      } else {
        // ファーストビューではヘッダーを非表示
        if (header) {
          header.style.transform = 'translateY(-100%)';
        }
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // ヘッダーのナビゲーションリンクにスムーズスクロールを追加
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (!targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // ヘッダーの高さを考慮してスクロール位置を調整
      const headerHeight = header?.offsetHeight || 0;
      const targetPosition = (targetElement as HTMLElement).offsetTop - headerHeight;
      
      // Lenisが有効な場合はLenisを使用、そうでなければ通常のスムーススクロール
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetPosition, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}); 