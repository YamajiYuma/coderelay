// ボタンが押された際に最終結果ページに移動
document.addEventListener("DOMContentLoaded", () => {
  const resultButton = document.getElementById("go-to-result");
  if (resultButton) {
    resultButton.addEventListener("click", () => {
      window.location.href = "result.html";
    });
  }
});
