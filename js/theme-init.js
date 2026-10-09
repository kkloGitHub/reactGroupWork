// js/theme-init.js
// 明暗模式「友善設定」：
//   1. 使用者尚未手動選擇前，預設跟隨作業系統的深色模式偏好（prefers-color-scheme）
//   2. 必須在畫面首次繪製前執行（因此放在 <head>），避免亮 → 暗的閃爍
//   3. 若瀏覽器停用 / 封鎖 localStorage，仍能正常顯示（以 try / catch 保護）
(function () {
  var root = document.documentElement;
  try {
    var saved = window.localStorage.getItem('theme');
    var prefersDark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
  } catch (e) {
    root.setAttribute('data-theme', 'light');
  }
})();
