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

// すべての結果を表示する
// データベースからデータを取得し、要素に表示する処理
const themeElement = document.querySelector(".theme");
const explain1Element = document.querySelector(".explain1");
const explain2Element = document.querySelector(".explain2");
const previewFrame1 = document.getElementById("preview-frame-1");
const previewFrame3 = document.getElementById("preview-frame-2");

// themeを表示
onValue(ref(database, "game/theme"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.theme) {
    themeElement.textContent = `お題: ${data.theme}`;
  }
});

// sketch1を表示
onValue(ref(database, "game/sketch1"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.sketch1) {
    const doc =
      previewFrame1.contentDocument || previewFrame1.contentWindow.document;
    const htmlContent = `
 <!DOCTYPE html>
 <html lang="ja">
 <head>
 <meta charset="UTF-8">
 <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
 </head>
 <body style="margin:0">
 <script>
 ${data.sketch1}
 </script>
 </body>
 </html>`;
    doc.open();
    doc.write(htmlContent);
    doc.close();
  }
});

// explanation1を表示
onValue(ref(database, "game/explanation1"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.explanation1) {
    explain1Element.textContent = `説明1: ${data.explanation1}`;
  }
});

// sketch2を表示
onValue(ref(database, "game/sketch2"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.sketch2) {
    const doc =
      previewFrame3.contentDocument || previewFrame3.contentWindow.document;
    const htmlContent = `
 <!DOCTYPE html>
 <html lang="ja">
 <head>
 <meta charset="UTF-8">
 <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
 </head>
 <body style="margin:0">
 <script>
 ${data.sketch2}
 </script>
 </body>
 </html>`;
    doc.open();
    doc.write(htmlContent);
    doc.close();
  }
});

// explanation2を表示
onValue(ref(database, "game/explanation2"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.explanation2) {
    explain2Element.textContent = `説明2: ${data.explanation2}`;
  }
});

setupResultPage();
// result.htmlのボタンが押された時の処理
function setupResultPage() {
  const finish = document.getElementById("finish");

  if (finish) {
    finish.addEventListener("click", () => {
      // Firebaseにstateとしてindex.htmlを設定
      set(ref(database, "game/state"), { page: "index.html" })
        .then(() => {
          window.location.href = "index.html"; // ページ遷移
        })
        .catch((error) => {
          console.error("Error setting state to index:", error);
        });
    });
  }
}
