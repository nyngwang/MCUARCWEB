var scanner;
var pending = true;
var macid = "1234567";

window.w69b.qr.decoding.setWorkerUrl(
  "public/barcode.js/w69b.qrcode.decodeworker.min.js"
);
if (
  navigator.mediaDevices &&
  !window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
) {
  scanner = new window.w69b.qr.ui.ContinuousScanner();
  scanner.setDecodedCallback(function(result) {
    // 成功後要做什麼
    // result是qrcode的內容（可能要印出來看看）
    alert(result);
    try {
      handleQRCodeData(JSON.parse(result));
    } catch (err) {
      alert("請掃描本系統的QRCode！");
    }
  });
  scanner.render(document.getElementById("scanner"));
} else {
  console.log(
    "Sorry, native web camera streaming (getUserMedia) is not supported by this browser..."
  );
  // 這邊要和典祐確認一下是要放iOS的部分？
}

handleQRCodeData = qrcode_data => {
  if (pending) {
    pending = false;
    sendDataToServer(qrcode_data);
  }
};

sendDataToServer = qrcode_data => {
  let URL = `http://${qrcode_data.ip}/?key=${qrcode_data.key}&id=${
    document.getElementById("studentId").value
  }&macid=${macid}`;
  fetch(URL, {
    mode: 'cors',
    credentials: 'include'
  })
    .then(server_response => {
      var o = server_response.text();
      showServerResponseToast(o["_55"]);
      pending = true;
    })
    .catch(err => {
      alert(err.message);
      pending = true;
    });
};

showServerResponseToast = server_response => {
  switch (server_response) {
    case "Event1":
      alert("您不在這堂課程的名單中！");
      break;
    case "Event2":
      alert("點名成功！");
      break;
    case "Event3":
      alert("該學號已透過其他裝置點名！");
      break;
    case "Event4":
      alert("請勿替同學點名！");
      break;
    case "Event5":
      alert("已解鎖學號欄位！");
      break;
    case "Event6":
      alert("該QRCode已失效，請重新掃描！");
      break;
  }
};
