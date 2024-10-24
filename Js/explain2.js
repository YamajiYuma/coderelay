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

// sketch2を表示
const previewFrame2 = document.getElementById("preview-frame-2");
onValue(ref(database, "game/sketch2"), (snapshot) => {
  const data = snapshot.val();
  if (data && data.sketch2) {
    const doc =
      previewFrame2.contentDocument || previewFrame2.contentWindow.document;
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

setupPlayer5();
// プレイヤー5の設定
function setupPlayer5() {
  const exBtn2 = document.getElementById("submit-explanation2");
  if (exBtn2) {
    exBtn2.addEventListener("click", () => {
      const explanation2 = document.getElementById("explanation-input").value;
      set(ref(database, "game/explanation2"), { explanation2: explanation2 })
        .then(() => {
          window.location.href = "button.html"; // ページ遷移
        })
        .catch((error) => {
          console.error("Error writing explanation2:", error);
        });
    });
  }
}
