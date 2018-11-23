
// 发送弹幕的方法
function send() {
    let value = $txt.value;
    let time = video.currentTime;
    let color = $color.value;
    let fontSize = $range.value;
    let obj = { value, time, color, fontSize };
    // 添加弹幕数据
    // canvasBarrage.add(obj);
    // 把添加的弹幕数据发给ws服务端
    // 由ws服务端拿到后添加到redis数据库中
    ws.send(JSON.stringify(obj));
    $txt.value = '';
}

// 点击按钮发送弹幕
$btn.onclick = send;
// 回车发送弹幕
$txt.addEventListener('keyup', e => {
    let key = e.keyCode;
    key === 13 && send();
});
