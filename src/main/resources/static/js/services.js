angular.module("chatApp").factory("ChatService", function($q, WsConfig) {
    var socket;
    var stomp;
    var listener = $q.defer();

    var init = function() {
        socket = new SockJS(WsConfig.socketUrl);
        stomp = Stomp.over(socket);
        stomp.connect({}, listen);
    };

    var getMessage = function(message) {
        message = JSON.parse(message.body);

        message.sender = 'David';
        message.avatar = '/img/avatars/1.jpg';

        return message;
    }

    var listen = function() {
        stomp.subscribe(WsConfig.messagesUrl, function(data) {
            listener.notify(getMessage(data));
        });
    };

    var send = function(message) {
        stomp.send(WsConfig.brokerUrl, {
            priority: 9
        }, JSON.stringify({
            text: message
        }));
    };

    var addMessageListener = function(callback) {
        listener.promise.then(null, null, callback);
    };

    init();

    return {
        send: send,
        listen: addMessageListener
    }
});