// 创建CanvasBarrage实例
let ws = new WebSocket('ws://localhost:9999');

// 监听与ws服务端的连接
ws.onopen = function () {
    // 监听ws服务端发来的消息
    ws.onmessage = function (e) {
        let msg = JSON.parse(e.data); //e.data里是真正的数据
        // 判断如果type为init就初始化弹幕的数据
        if (msg.type === 'init') {
            // 创建CanvasBarrage实例
            canvasBarrage = new CanvasBarrage(canvas, video, { data: msg.data });
        } else if (msg.type === 'add') { // 添加弹幕数据
            canvasBarrage.add(msg.data);
        }
    }
};