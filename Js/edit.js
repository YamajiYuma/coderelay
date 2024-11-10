import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyDc5rzCnl-H-Flkpu40kYD_nm3i1fy3T3s",
  authDomain: "game-bfcdf.firebaseapp.com",
  databaseURL: "https://game-bfcdf-default-rtdb.firebaseio.com",
  projectId: "game-bfcdf",
  storageBucket: "game-bfcdf.appspot.com",
  messagingSenderId: "582909486170",
  appId: "1:582909486170:web:cfb7a3d858860ef3fe2463",
  measurementId: "G-S61EG3L7B6",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

setupPlayer2();

const themeElement = document.querySelector(".theme");
// themeを表示
onValue(ref(database, "game/theme"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.theme) {
    themeElement.textContent = `お題: ${data.theme}`;
  }
});

// プレイヤー2の設定
function setupPlayer2() {
  const runButton = document.getElementById("run-btn");
  const goToExplainButton = document.getElementById("go-to-explain");

  if (runButton && goToExplainButton) {
    // Runボタンが押された時の処理
    runButton.addEventListener("click", runSketch);

    // 完了ボタンが押された時の処理
    goToExplainButton.addEventListener("click", () => {
      const sketch1 = document.getElementById("code1").value;
      if (sketch1) {
        // Firebaseにスケッチを保存し、次のページへ遷移
        set(ref(database, "game/sketch1"), { sketch1: sketch1 })
          .then(() => {
            return set(ref(database, "game/state"), { page: "explain.html" });
          })
          .then(() => {
            window.location.href = "explain.html"; // ページ遷移
          })
          .catch((error) => {
            console.error("Error writing sketch:", error);
          });
      } else {
        console.error("No sketch code provided");
      }
    });
  } else {
    console.error("run-btn or go-to-explain button not found");
  }
}

// Runボタンのクリック時にスケッチを実行
function runSketch() {
  const code1 = document.getElementById("code1").value;
  const sketchFrame = document.getElementById("sketch-frame");

  if (sketchFrame) {
    // iframeの内容をリセットするために、新しいiframeを作成する
    const newFrame = document.createElement("iframe");
    newFrame.id = "sketch-frame";
    sketchFrame.parentNode.replaceChild(newFrame, sketchFrame);

    // 新しいiframeにコンテンツを書き込む
    const newDoc = newFrame.contentDocument || newFrame.contentWindow.document;
    const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
</head>
<body style="margin:0">
<script>
${code1}
</script>
</body>
</html>`;
    newDoc.open();
    newDoc.write(htmlContent);
    newDoc.close();
  } else {
    console.error("sketch-frame element not found");
  }
}

// textareaでtabキーを入力できるようにする（タブ＝半角スペース×2）
document.getElementById('code1').addEventListener('keydown', (ev) => {
  if (ev.key !== 'Tab') return;
  
  ev.preventDefault();
  const text = ev.currentTarget;
  const start = text.selectionStart;
  const end = text.selectionEnd;
  text.value = '' + (text.value.substring(0, start)) + "  " + (text.value.substring(end));
  text.selectionStart = start + 2;
  text.selectionEnd = start + 2;
  return false;
});
