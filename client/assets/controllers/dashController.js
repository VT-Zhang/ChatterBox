app.controller('dashController', ['chatterFactory','$scope','$location','$routeParams','$cookies', function(chatterFactory, $scope, $location, $routeParams, $cookies) {

    $scope.errors = {};
    $scope.channels = {};
    $scope.users = {};
    var index = function(){
        if(!$cookies.get("user_id") || !$cookies.get("user_name")){
            $scope.showDash = false;
            $location.url('/')
        }
        else{
            $scope.showDash = true;
        }
        chatterFactory.getAll($cookies.get("user_id"), function(data){
            if(data.errors){
                $scope.errors = data.errors;
            }
            else {
                $scope.channels = data.channels;
                $scope.users = data.users;
            }
        })
    }
    index();

    $scope.newConversation = {};
    $scope.createConversation = function(id){
        $scope.newConversation._user1 = $cookies.get("user_id")
        chatterFactory.createConversation(id, $scope.newConversation, function(data){
            if(data.errors){
                $scope.errors = data.errors;
            }
        })
    }

    $scope.logout = function(){
        $cookies.remove("user_id")
        $cookies.remove("user_name")
        $location.url('/')
    }

}]);
