var scanner;

window.w69b.qr.decoding.setWorkerUrl("public/barcode.js/w69b.qrcode.decodeworker.min.js");
if (navigator.mediaDevices && !window.navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
  scanner = new window.w69b.qr.ui.ContinuousScanner();
  scanner.setDecodedCallback(function(result) {
    console.log(result);
    // 成功後要做什麼
    // result是qrcode的內容（可能要印出來看看）
  });
  scanner.render(document.getElementById("scanner"));
} else {
  console.log("Sorry, native web camera streaming (getUserMedia) is not supported by this browser...");
  // 這邊要和典祐確認一下是要放iOS的部分？
}
