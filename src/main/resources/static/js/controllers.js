angular.module("chatApp").controller("ChatCtrl", function($scope, $window, ChatService) {
    $scope.message = '';
    $scope.messages = [];

    $scope.send = function() {
        ChatService.send($scope.message);
        //$scope.message = '';
    };

    ChatService.listen(function(message) {
        $scope.messages.push(message);
        // todo: scroll to bottom
    });
});