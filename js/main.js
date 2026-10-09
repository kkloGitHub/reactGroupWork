// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // 1. 手機漢堡包選單切換
  if (hamburgerBtn && mobileMenu) {
    // 與 css/global.css 的 @media (max-width: 768px) 手機斷點保持一致
    const MOBILE_BREAKPOINT = 768;
    const desktopQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`);

    // 無障礙標記：讓輔助工具知道按鈕控制的是哪個選單
    hamburgerBtn.setAttribute('aria-controls', 'mobile-menu');
    hamburgerBtn.setAttribute('aria-expanded', 'false');

    const setMenuState = (isOpen) => {
      mobileMenu.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    };

    const closeMobileMenu = () => setMenuState(false);

    // (1) 點擊漢堡按鈕開關選單
    hamburgerBtn.addEventListener('click', () => {
      setMenuState(!mobileMenu.classList.contains('active'));
    });

    // (2) 點擊選單以外的任何地方就自動關閉
    document.addEventListener('click', (event) => {
      if (!mobileMenu.classList.contains('active')) return;
      if (mobileMenu.contains(event.target) || hamburgerBtn.contains(event.target)) return;
      closeMobileMenu();
    });

    // (3) 按下 Esc 鍵關閉選單
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !mobileMenu.classList.contains('active')) return;
      closeMobileMenu();
      hamburgerBtn.focus();
    });

    // (4) 點選選單內的連結後立即關閉 (不必等頁面跳轉)
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // (5) 視窗拉寬回桌機版時自動關閉，避免選單卡在畫面上
    const handleDesktopChange = (event) => {
      if (event.matches) closeMobileMenu();
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleDesktopChange);
    } else {
      desktopQuery.addListener(handleDesktopChange); // 相容舊版 Safari
    }

    // 載入時若已是桌機寬度，確保選單維持關閉
    if (desktopQuery.matches) closeMobileMenu();
  }

  // 2. 明暗模式切換與記憶
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  }

  // 無障礙：讓輔助科技知道目前是「深色模式 / 明亮模式」（配合 HTML 的 aria-pressed）
  const syncThemeState = () => {
    if (!themeToggleBtn) return;
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    themeToggleBtn.setAttribute('title', isDark ? '切換為明亮模式' : '切換為深色模式');
  };
  syncThemeState();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      syncThemeState();
    });
  }
});