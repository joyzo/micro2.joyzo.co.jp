// スムーズスクロール機能
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#header') as HTMLElement;
  
  // ヘッダーの初期状態を非表示に設定
  if (header) {
    header.style.transform = 'translateY(-100%)';
  }
  
  // スクロール位置に応じてヘッダーの表示/非表示を制御
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
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
  
  // ページ枠の縦幅ブロック毎にフィットしたスクロール着地
  let isScrolling = false;
  
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    e.preventDefault();
    isScrolling = true;
    
    const sections = document.querySelectorAll('section[id]');
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    let targetSection = null;
    
    if (e.deltaY > 0) {
      // 下スクロール
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop > currentScroll + windowHeight / 2) {
          targetSection = section;
          break;
        }
      }
    } else {
      // 上スクロール
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop < currentScroll - windowHeight / 2) {
          targetSection = section;
          break;
        }
      }
    }
    
    if (targetSection) {
      const headerHeight = header?.offsetHeight || 0;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    // スクロール完了後にフラグをリセット
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }, { passive: false });
  
  // キーボードナビゲーション
  window.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    const sections = document.querySelectorAll('section[id]');
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    let targetSection = null;
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      isScrolling = true;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop > currentScroll + windowHeight / 2) {
          targetSection = section;
          break;
        }
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      isScrolling = true;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop < currentScroll - windowHeight / 2) {
          targetSection = section;
          break;
        }
      }
    }
    
    if (targetSection) {
      const headerHeight = header?.offsetHeight || 0;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });
}); 