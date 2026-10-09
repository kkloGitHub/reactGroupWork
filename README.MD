# 🏪 88便利店 (88 CONVENIENCE) - 商業形象與電商前端專案

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen?style=flat-square&logo=github)](https://kklogithub.github.io/reactGroupWork/)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Markup-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/zh-TW/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Custom%20Properties%20%7C%20Grid%20%7C%20Flexbox-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/zh-TW/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript)

> 🌐 **線上體驗網址**：[https://kklogithub.github.io/reactGroupWork/](https://kklogithub.github.io/reactGroupWork/)  
> 本專案為前端網站開發人員認證課程之學期商業實作專案。全站堅持**零第三方前端框架（Zero Framework Dependency）**，純粹以原生 **HTML5、CSS3 與輕量 Vanilla JavaScript** 打造包含 15+ 個獨立頁面、兼具流暢微互動與無障礙設計的現代化便利商店品牌電商網站。

---

## 📌 目錄 (Table of Contents)

1. [專案理念與品牌定位](#-專案理念與品牌定位)
2. [核心功能與互動亮點](#-核心功能與互動亮點)
3. [技術走向與關鍵切版技巧解析](#-技術走向與關鍵切版技巧解析)
4. [專案目錄結構](#-專案目錄結構)
5. [頁面架構與清單一覽 (15+ 頁面)](#-頁面架構與清單一覽)
6. [色彩系統與視覺規範](#-色彩系統與視覺規範)
7. [本機執行與部署說明](#-本機執行與部署說明)

---

## 💡 專案理念與品牌定位

「**88便利店**」取名自雙重無限循環符號（$\infty$ 與 $88$），代表「**24 小時守候、無限便利、永續日常**」的品牌核心精神。

有別於過度依賴肥大前端框架的現代專案，本專案回歸前端切版基本功，探討如何僅透過現代 CSS3 規範（CSS Variables, CSS Grid, Flexbox, Pseudo-classes）與語意化 HTML 達成高品質的商業級網站，確保極致的載入效能、優秀的 SEO 友善度與極低的維護成本。

---

## ✨ 核心功能與互動亮點

* 🌓 **全站雙色主題切換 (Dark / Light Mode)**：基於 CSS 自訂變數與 `localStorage` 本地存儲，提供流暢的明暗切換體驗，跨頁面保持使用偏好。
* 📱 **完全響應式佈局 (Mobile-First RWD)**：全站組件無縫相容手機、平板與桌機，在行動裝置上自動轉為抽屜式漢堡選單（Hamburger Drawer）。
* 📖 **純 CSS 擬真線上特刊 (Zero-JS E-Catalog)**：採用業界經典的 **Radio Button Hack** 技巧，完全不使用 JavaScript 即達成 8 頁 DM 順暢翻頁與頁碼狀態同步。
* 🎁 **物理減速幸運轉盤 (Daily Lucky Wheel)**：結合 JavaScript 隨機扇區計算與 CSS `cubic-bezier()` 緩動貝茲曲線，呈現極致逼真的抽獎減速體驗。
* 🛹 **原生水平滾動捕捉 (CSS Scroll Snap)**：首頁推薦商品列採用 `scroll-snap-type: x mandatory`，在手機滑動與桌機滾動時具備原生 App 般的卡片貼合吸附感。
* 🗂️ **語意化折疊手風琴 (Native FAQ Accordion)**：常見問題使用 HTML5 原生 `<details>` 與 `<summary>` 標籤，落實無障礙標準與純 CSS 箭頭旋轉動態。

---

## 🛠️ 技術走向與關鍵切版技巧解析

### 1. 全域 CSS 自訂變數與深淺主題切換 (Theme Architecture)

透過在 `:root` 與 `[data-theme="dark"]` 選擇器宣告語意化色彩變數，避免將硬編碼（Hard-coded）色碼分散在各檔案中：

```css
/* ccs/global.css 色彩架構 */
:root {
  --color-light-sea-green-600: #15b7a6; /* 品牌主色 */
  --color-apricot-cream-500: #ff9d00;   /* 品牌副色/強調 */
  --color-grapefruit-pink-500: #fe010a; /* 警示/價格紅 */

  /* 語意化配置：明亮模式 */
  --bg-main: #e8fcfa;
  --bg-card: #ffffff;
  --text-main: #04201d;
  --primary: var(--color-light-sea-green-600);
}

[data-theme="dark"] {
  /* 語意化配置：暗黑模式 */
  --bg-main: #04201d;
  --bg-card: #0b5b53;
  --text-main: #e8fcfa;
  --primary: #1be4d0;
}
```

搭配 `js/main.js` 中的 10 行原生代碼，達成狀態持久化：
```javascript
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
});
```

---

### 2. 純 CSS 實現線上型錄翻頁：Radio Button Hack

在 `ecatalog.html` 中，捨棄笨重的輪播套件，利用 HTML 原生單選框（Radio）的互斥性與 CSS 通用兄弟選擇器（`~`）實現狀態機切換：

* **HTML 結構解耦**：將 `<input type="radio">` 集中放置於頂部，按鈕則改用 `<label for="...">` 包裝，實現遠端觸發點擊。
* **CSS 選擇器穿透**：
  ```css
  /* 當特定 Radio 被勾選時，僅顯示對應序號的 DM 圖片與導覽按鈕群組 */
  #page-1:checked ~ .ecatalog-image .dm-img-1,
  #page-2:checked ~ .ecatalog-image .dm-img-2 {
    display: block;
  }

  #page-1:checked ~ .ecatalog-controls .nav-1,
  #page-2:checked ~ .ecatalog-controls .nav-2 {
    display: flex;
  }
  ```
* **效益**：零 JS 開銷、無重繪跳動（Flickering）、完全由瀏覽器原生樣式引擎計算。

---

### 3. 幸運轉盤的貝茲曲線物理緩動 (`cubic-bezier`)

`lottery.html` 的轉盤並非單純直線旋轉，而是精準結合了 CSS3 轉場過渡與數學角度計算：

* **CSS 動態屬性**：
  ```css
  .lottery-wheel {
    transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  }
  ```
  `cubic-bezier(0.17, 0.67, 0.12, 0.99)` 提供了「起步極速旋轉、中段持續慣性、尾段平順減速至煞停」的物理級擬真感。
* **角度運算邏輯**：
  每次點擊時計算當前累積角度，強制疊加 $360^\circ \times 5 = 1800^\circ$（基礎保底 5 圈），再加上目標獎項（便當 $45^\circ$、謝謝惠顧 $135^\circ$、飲料 $225^\circ$）之偏移差額，避免轉盤逆轉問題。

---

### 4. 滾動吸附體驗：CSS Scroll Snap

在首頁的熱門推薦商品列中，不使用複雜的 Touch Event 監聽，純靠 CSS 原生規格實現手機輪播滑動體驗：

```css
.scroll-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory; /* 啟動 X 軸強制對齊 */
}

.scroll-card {
  scroll-snap-align: start; /* 卡片滾動停止時自動貼齊起點 */
}
```

---

## 📂 專案目錄結構

```text
reactGroupWork/
├── css/
│   ├── global.css        # 全域色彩變數、Reset、Navbar、Footer 與主題切換
│   ├── home.css          # 首頁專屬排版 (Hero Banner、Category Grid、推薦滾動)
│   ├── product.css       # 商品列表與內頁通用排版樣式
│   ├── ecatalog.css      # 線上 DM 專屬樣式 (Radio Button Hack 核心)
│   ├── lottery.css       # 抽獎轉盤動畫與佈局
│   └── others.css        # 輔助頁面專用樣式
├── js/
│   ├── main.js           # 全站共用邏輯 (深淺色切換記憶、漢堡選單 Toggle)
│   └── lottery.js        # 幸運轉盤扇區計算、防連點狀態控制
├── images/               # 專案圖檔資源 (Logo、Favicon、DM特刊圖、商品照)
├── index.html            # 品牌首頁
├── about.html            # 品牌故事與理念
├── stores.html           # 門市查詢與地圖佔位
├── faq.html              # 常見問題 (HTML5 <details> 手風琴)
├── contact.html          # 客服與顧客反饋表單
├── fresh-food.html       # 鮮食便當專區
├── cafe-drinks.html      # 現煮咖啡與飲品專區
├── snacks.html           # 零食與泡麵大賞
├── ecatalog.html         # 線上雙週 DM 特刊 (純 CSS 翻頁)
├── lottery.html          # 每日抽抽樂 幸運轉盤
├── cart.html             # 我的購物車與金額試算
├── login.html            # 會員登入 / 註冊入口
├── member.html           # 會員中心 (虛擬會員卡條碼與點數)
├── join-us.html          # 人才招募
├── returnpolicy.html     # 消費者保障與退換貨政策
├── privacy.html          # 隱私權政策
└── README.md             # 專案技術文件
```

---

## 📑 頁面架構與清單一覽

全站共包含 **16+ 個功能齊全的靜態頁面**，依據功能模組劃分：

| 模組分類 | 頁面檔案 | 主要功能與視覺重點 |
| :--- | :--- | :--- |
| **首頁與形象** | `index.html` | 品牌形象 Hero、快速分類入口、CSS Scroll Snap 熱門推薦商品 |
| | `about.html` | 品牌歷程、使命宣言與企業永續 (ESG) 圖文排版 |
| | `stores.html` | 門市查詢雙欄佈局 (Flexbox 清單滾動 + 地圖展示區) |
| **商品型錄** | `fresh-food.html` | 鮮食便當商品網格展示 (CSS Grid) |
| | `cafe-drinks.html` | 現煮咖啡與特調飲品目錄 |
| | `snacks.html` | 零食、泡麵與進口食品列表 |
| | `ecatalog.html` | 8 頁線上特刊 (Radio Button Hack 純 CSS 翻頁) |
| | `product-detail-*.html` | 各品項獨立詳情頁 (左圖右文 RWD、加價購與滿額免運提示) |
| **會員與電商** | `cart.html` | 購物車商品條目、單價總計試算與結帳引導按鈕 |
| | `login.html` | 會員登入與註冊切換表單 (置中卡片式排版) |
| | `member.html` | 電子會員卡、模擬條碼產生區塊與累積點數卡片 |
| **促銷與娛樂** | `promotions.html` | 本期促銷活動卡片清單 |
| | `lottery.html` | 每日抽抽樂 幸運轉盤 (4 扇區物理緩動動畫) |
| **顧客服務與規範**| `faq.html` | HTML5 原生 `<details>` 手風琴常見問題中心 |
| | `contact.html` | 顧客意見反饋表單與問題分類選單 |
| | `join-us.html` | 企業人才招募說明 |
| | `returnpolicy.html` | 消費者保障與退換貨說明文件 |
| | `privacy.html` | 隱私權政策與個資保護條款 |

---

## 🎨 色彩系統與視覺規範

本專案採用兼具現代感與親和力的「湖水綠 × 活力杏桃橘」雙主色搭配：

* 🟢 **Light Sea Green (主色)**：`#15b7a6` / `#1be4d0` —— 代表清新、安心、全天候營業的信賴感。
* 🟠 **Apricot Cream (副色/活動)**：`#ff9d00` / `#ffd899` —— 代表鮮食出爐的溫度、活力與折扣亮點。
* 🔴 **Grapefruit Pink (強烈對比)**：`#fe010a` —— 用於價格標示、熱門 Badge 與指針焦點。
* 🔤 **標準字體**：`Noto Sans TC` (Google Fonts 載入 400, 500, 700 字重)。
* 🔣 **視覺圖標**：`Google Material Symbols Outlined` 向量字型圖標系統。

---

## 🚀 本機執行與部署說明

### 1. 本機預覽 (Local Development)
由於專案為純前端靜態架構，無須安裝 Node.js 或執行任何 `npm install`：
1. 將專案 Clone 至本機：
   ```bash
   git clone https://github.com/kklogithub/reactGroupWork.git
   ```
2. 使用 VS Code 開啟資料夾。
3. 安裝 VS Code 擴充套件 **Live Server**，在 `index.html` 上按右鍵選擇 **「Open with Live Server」** 即可於 `http://127.0.0.1:5500` 本機熱重載預覽。

### 2. GitHub Pages 自動化部屬
專案已完全相容 GitHub Pages：
* 分支源設為 `main` 分支根目錄 (`/root`)。
* 程式碼推送到 GitHub (`git push origin main`) 時，GitHub Actions 將於 1~2 分鐘內自動重新建置並發布至公開網址。

---

## 👥 開發團隊與致謝

* **專案名稱**：88便利店 (88 CONVENIENCE) Web Project
* **修習課程**：前端網站開發人員認證課程 (Frontend Web Developer Certification Program)
* **版權聲明**：© 2026 88便利店 版權所有. 本專案僅供學術教學與技術展示使用。