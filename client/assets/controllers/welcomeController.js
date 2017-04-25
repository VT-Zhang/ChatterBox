app.controller('welcomeController', ['welcomeFactory','$scope','$location','$routeParams', function(welcomeFactory, $scope, $location, $routeParams) {
  $scope.index = function(){
    welcomeFactory.index(function(welcome_message){
      $scope.message = welcome_message;
    })
  }
  $scope.create = function(){
  	alert("Open your console!")
  	console.log("welcomeController create function")
  	console.log("$scope.user", $scope.user)
  	welcomeFactory.create($scope.user, function(response_data){
  		console.log("back inside welcome controller create method")
  		$scope.newUser = response_data.data.user
  	})
  }
  $scope.index();
}]);