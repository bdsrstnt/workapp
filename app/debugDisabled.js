angular.module("workApp")
.config(['$logProvider', function($logProvider){
        $logProvider.debugEnabled(false);
}]);