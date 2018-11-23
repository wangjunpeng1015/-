// app.js文件
const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 9999 }); // 创建ws服务
// 用来存储不同的socket实例，区分不同用户
let clients = [];
//用来存储全部用户的弹幕
let barrage = [
    { value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 5, color: 'red', speed: 1, fontSize: 22 },
    { value: '想快快长大，才能保护她', time: 10, color: '#00a1f5', speed: 1, fontSize: 30 },
    { value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 15 },
];
let user = 0;
// 监听连接
ws.on('connection', socket => {
    console.log(`用户${user++}加入`)
    clients.push(socket); // 把socket实例添加到数组

    // 发送给客户端，send方法传递的是字符串需要JSON.stringify
    // type为init是用来初始化弹幕数据的
    socket.send(JSON.stringify({
        type: 'init',
        data:barrage
    }));
    // 监听客户端发来的消息
    socket.on('message', data => {

        // 每个socket实例(用户)之间都可以发弹幕，并显示在对方的画布上
        // type为add表示此次操作为添加处理
        // 你可以打开两个index.html，分别发弹幕试试吧
        clients.forEach(sk => {
            sk.send(JSON.stringify({
                type: 'add',
                data: JSON.parse(data)
            }));
        });

    });
    // 当有socket实例断开与ws服务端的连接时
    // 重新更新一下clients数组，去掉断开的用户
    socket.on('close', () => {
        clients = clients.filter(client => client !== socket);
    });
});
