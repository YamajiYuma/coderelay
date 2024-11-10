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

setupPlayer4();

const explain2Element = document.querySelector(".explain2");
// explanation2を表示
onValue(ref(database, "game/explanation2"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.explanation2) {
    explain2Element.textContent = `説明2: ${data.explanation2}`;
  }
});

// プレイヤー4の設定
function setupPlayer4() {
  const runButton2 = document.getElementById("run-btn2");
  const goToExplainButton2 = document.getElementById("go-to-explain2");

  if (runButton2 && goToExplainButton2) {
    runButton2.addEventListener("click", runSketch2);

    goToExplainButton2.addEventListener("click", () => {
      const sketch2 = document.getElementById("code2").value;
      set(ref(database, "game/sketch2"), { sketch2: sketch2 })
        .then(() => {
          window.location.href = "explain2.html"; // ページ遷移
        })
        .catch((error) => {
          console.error("Error writing sketch2:", error);
        });
    });
  }
}

function runSketch2() {
  const code2 = document.getElementById("code2").value;
  const sketchFrame = document.getElementById("sketch-frame");

  if (sketchFrame) {
    const newFrame = document.createElement("iframe");
    newFrame.id = "sketch-frame";
    sketchFrame.parentNode.replaceChild(newFrame, sketchFrame);

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
${code2}
</script>
</body>
</html>`;
    newDoc.open();
    newDoc.write(htmlContent);
    newDoc.close();
  }
}

// textareaでtabキーを入力できるようにする（タブ＝半角スペース×2）
document.getElementById('code2').addEventListener('keydown', (ev) => {
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
