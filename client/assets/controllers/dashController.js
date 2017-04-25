app.controller('dashController', ['chatterFactory','$scope','$location','$routeParams','$cookies', function(chatterFactory, $scope, $location, $routeParams, $cookies) {

    $scope.errors = {};
    $scope.channels = {};
    $scope.conversations = {};
    var index = function(){
        if(!$cookies.get("user_id") || !$cookies.get("user_name")){
            $scope.showDash = false;
        }
        else{
            $scope.showDash = true;
        }
        chatterFactory.getAll(function(data){
            if(data.errors){
                $scope.errors = data.errors;
            }
            else {
                $scope.channels = data.channels;
                $scope.conversations = data.conversations;
            }
        })
    }
    index();

}]);
