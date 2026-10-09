// js/lottery.js
document.addEventListener('DOMContentLoaded', () => {
  const wheel = document.getElementById('lottery-wheel');
  const spinBtn = document.getElementById('lottery-btn');
  const resultText = document.querySelector('.lottery-results p');

  // 定義 4 象限的獎品與目標旋轉角度 (配合 lottery_BG.png)
  const prizes = [
    { name: '免費便當', angle: 45, message: '🎉 太幸運了！恭喜抽中【免費便當】一份！' },
    { name: '謝謝惠顧', angle: 135, message: '😢 差一點點！謝謝惠顧，明天再來試試手氣吧！' },
    { name: '免費飲料', angle: 225, message: '🎉 恭喜抽中【免費飲料】一杯！' },
    { name: '謝謝惠顧', angle: 315, message: '😢 謝謝惠顧！祝您下次把便當帶回家！' }
  ];

  let currentRotation = 0; // 記錄累積旋轉度數
  let isSpinning = false;  // 旋轉狀態旗標，防止連續點擊

  spinBtn.addEventListener('click', () => {
    // 1. 防止轉動中重複觸發
    if (isSpinning) return;
    isSpinning = true;
    // 無障礙：改用 aria-disabled（原本的 disabled 會讓鍵盤焦點在轉動期間被強制移除）
    spinBtn.setAttribute('aria-disabled', 'true');
    resultText.textContent = '轉盤飛速旋轉中... 祝您中大獎！';

    // 2. 隨機選出一個獎項
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    // 3. 計算新旋轉角度：每次至少轉 5 圈 (1800 度)，並補齊到獎項對應角度
    const extraRounds = 360 * 5;
    const nextRotation = currentRotation + extraRounds + ((selectedPrize.angle - (currentRotation % 360) + 360) % 360);

    // 4. 套用 CSS 旋轉
    currentRotation = nextRotation;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // 5. 等待 4 秒動畫結束後公佈結果並重置按鈕
    setTimeout(() => {
      isSpinning = false;
      spinBtn.setAttribute('aria-disabled', 'false');
      resultText.textContent = selectedPrize.message;
    }, 4000);
  });
});