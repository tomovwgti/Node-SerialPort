$(function() {
    var socket = io.connect();

    // ノブの更新
    $('#knob').knob({
        'change' : function(value) {}
    });

    $('#switch').click(function() {
        var msg = new Object();
        if ($('#switch').attr('checked') === 'checked') {
            console.log('ON');
            msg.led = 'ON';
        } else {
            console.log('OFF');
            msg.led = 'OFF';
        }
        // メッセージを送信する
        socket.emit('message', { value: msg });
    });

    // WebSocketでの接続
    socket.on('connect', function(msg) {
        console.log("connect");
    });

    // メッセージを受けたとき
    socket.on('message', function(msg) {
        if (typeof msg.value.temp != undefined) {
            // ノブの更新
            $('#knob').val(msg.value.temp).trigger('change');
        }
        if (typeof msg.value.led != undefined) {
            // LEDの状態を反映
            if ( msg.value.led === 1) {
                $('#switch').attr('checked', 'checked');
            } else {
                $('#switch').removeAttr('checked');
            }
        }
    });

    // メッセージを送る
    function SendMsg() {
        var msg = $('#message').val();
        // メッセージを送信する
        socket.emit('message', { value: msg });
        $('#message').val('');
    }
});
