document.addEventListener('DOMContentLoaded', function () {
  // LIFF初期化
  liff.init({ liffId: "YOUR_LIFF_ID" })
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    })
    .catch((err) => console.error(err));

  // 画面遷移の処理
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', function () {
      const nextScreen = option.getAttribute('data-next');
      const text = option.getAttribute('data-text');

      if (nextScreen) {
        document.querySelectorAll('.screen').forEach(screen => screen.style.display = 'none');
        document.getElementById(nextScreen).style.display = 'block';
      }

      if (text) {
        sendTextMessage(text);
      }
    });
  });

  // メッセージ送信
  function sendTextMessage(text) {
    liff.sendMessages([{
      type: 'text',
      text: text
    }]).then(() => {
      liff.closeWindow();
    }).catch((err) => {
      console.error('Error sending message: ', err);
    });
  }
});
