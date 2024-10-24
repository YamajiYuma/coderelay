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

setupPlayer1();

function setupPlayer1() {
  const submitButton = document.getElementById("submit-btn");
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      const theme = document.getElementById("theme-input").value;
      set(ref(database, "game/theme"), { theme: theme })
        .then(() => {
          window.location.href = "edit.html";
        })
        .catch((error) => {
          console.error("Error writing data:", error);
        });
    });
  }
}
