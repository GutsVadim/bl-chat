angular.module('chatApp').constant('WsConfig', {
    socketUrl: '/chat',
    brokerUrl: '/app/chat',
    messagesUrl: '/topic/message'
});