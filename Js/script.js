import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "game-bfcdf.firebaseapp.com",
  databaseURL: "https://game-bfcdf-default-rtdb.firebaseio.com",
  projectId: "game-bfcdf",
  storageBucket: "game-bfcdf.appspot.com",
  messagingSenderId: "messagingbucket",
  appId: "appid",
  measurementId: "measurementid",
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop(); // 現在のページのファイル名を取得

  if (currentPath === "index.html") {
    setupPlayer1(); // プレイヤー1の設定を行う
  }
  if (currentPath === "edit.html") {
    setupPlayer2();
  }
  if (currentPath === "explain.html") {
    setupPlayer3();
  }
  if (currentPath === "edit2.html") {
    setupPlayer4();
  }
  if (currentPath === "explain2.html") {
    setupPlayer5();
  }
  if (currentPath === "button.html") {
    setupButtonPage();
  }
  if (currentPath === "result.html") {
    setupResultPage();
  }

  const role = new URLSearchParams(window.location.search).get("role");
  const playerRole = role || "player1";

  // プレイヤーの役割に応じた処理
  switch (playerRole) {
    case "player1":
      setupPlayer1();
      break;
    case "player2":
      setupPlayer2();
      break;
    case "player3":
      setupPlayer3();
      break;
    case "player4":
      setupPlayer4();
      break;
    case "player5":
      setupPlayer5();
      break;
    default:
      console.error("Unknown player role");
  }

  // Firebaseのstateを監視して、ページ遷移する
  updatePage();
});

function setupPlayer1() {
  const submitButton = document.getElementById("submit-btn");
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      const theme = document.getElementById("theme-input").value;
      set(ref(database, "game/theme"), { theme: theme })
        .then(() => {
          set(ref(database, "game/state"), { page: "edit.html" });
        })
        .catch((error) => {
          console.error("Error writing data:", error);
        });
    });
  }
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
   <body>
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
   <body>
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
}

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

function setupPlayer3() {
  const exBtn1 = document.getElementById("submit-explanation1");
  if (exBtn1) {
    exBtn1.addEventListener("click", () => {
      const explanation1 = document.getElementById("explanation-input").value;
      set(ref(database, "game/explanation1"), { explanation1: explanation1 })
        .then(() => {
          set(ref(database, "game/state"), { page: "edit2.html" });
        })
        .catch((error) => {
          console.error("Error writing explanation:", error);
        });
    });
  }
}

function setupPlayer4() {
  const runButton2 = document.getElementById("run-btn2");
  const goToExplainButton2 = document.getElementById("go-to-explain2");

  if (runButton2 && goToExplainButton2) {
    runButton2.addEventListener("click", runSketch2);

    goToExplainButton2.addEventListener("click", () => {
      const sketch2 = document.getElementById("code2").value;
      set(ref(database, "game/sketch2"), { sketch2: sketch2 })
        .then(() => {
          set(ref(database, "game/state"), { page: "explain2.html" });
        })
        .catch((error) => {
          console.error("Error writing sketch2:", error);
        });
    });
  }
}

function setupPlayer5() {
  const exBtn2 = document.getElementById("submit-explanation2");
  if (exBtn2) {
    exBtn2.addEventListener("click", () => {
      const explanation2 = document.getElementById("explanation-input").value;
      set(ref(database, "game/explanation2"), { explanation2: explanation2 })
        .then(() => {
          set(ref(database, "game/state"), { page: "button.html" });
        })
        .catch((error) => {
          console.error("Error writing explanation2:", error);
        });
    });
  }
}

function setupButtonPage() {
  const goToResultButton = document.getElementById("go-to-result");

  if (goToResultButton) {
    goToResultButton.addEventListener("click", () => {
      set(ref(database, "game/state"), { page: "result.html" }).catch(
        (error) => {
          console.error("Error setting final state:", error);
        }
      );
    });
  }
}

// result.htmlのボタンが押された時の処理
function setupResultPage() {
  const finish = document.getElementById("finish");

  if (finish) {
    finish.addEventListener("click", () => {
      // Firebaseにstateとしてindex.htmlを設定
      set(ref(database, "game/state"), { page: "index.html" }).catch(
        (error) => {
          console.error("Error setting state to index:", error);
        }
      );
    });
  }
}

// Runボタンのクリック時にスケッチを実行
function runSketch() {
  const code1 = document.getElementById("code1").value;
  const sketchFrame = document.getElementById("sketch-frame");

  if (sketchFrame) {
    // iframeの内容をリセットするために、新しいiframeを作成する
    const newFrame = document.createElement("iframe");
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
<body>
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

function runSketch2() {
  const code2 = document.getElementById("code2").value;
  const sketchFrame = document.getElementById("sketch-frame");

  if (sketchFrame) {
    const newFrame = document.createElement("iframe");
    sketchFrame.parentNode.replaceChild(newFrame, sketchFrame);

    const newDoc = newFrame.contentDocument || newFrame.contentWindow.document;
    const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
</head>
<body>
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

function updatePage() {
  const stateRef = ref(database, "game/state");
  onValue(stateRef, (snapshot) => {
    const state = snapshot.val();
    const currentPath = window.location.pathname.split("/").pop(); // ここでcurrentPathを定義
    if (state && state.page && state.page !== currentPath) {
      // ページが異なっていたら、指定されたページに遷移
      window.location.href = state.page;
    }
  });
}
