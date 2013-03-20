var socket = io.connect();

// WebSocketでの接続
socket.on('connect', function(msg) {
    console.log("connect");
    $('#connectId').html('あなたの接続ID::' + socket.socket.transport.sessid);
    $('#type').html('接続方式::' + socket.socket.transport.name);
});

// メッセージを受けたとき
socket.on('message', function(msg) {
    // メッセージを画面に表示する
    console.log(msg.value);
    if (typeof msg.value.temperature != undefined) {
        $('#receiveMsg').prepend('気温: ' + msg.value.temperature + '℃<br>');
    } else {
        $('#receiveMsg').prepend(msg.value + '<br>');
    }
});

// メッセージを送る
function SendMsg() {
    var msg = $('#message').val();
    // メッセージを送信する
    socket.emit('message', { value: msg });
    $('#message').val('');
}

// 切断する
function DisConnect() {
    var msg = socket.socket.transport.sessid + "は切断しました。";
    // メッセージを送信する
    socket.emit('message', { value: msg });
    // socketを切断する
    socket.disconnect();
}
