app.factory('welcomeFactory', ['$http', function($http) {
  var welcome_message = "Welcome to the simple Mean project set up."
  function WelcomeFactory(){
  	console.log("welcome factory instantiated")
	  this.index = function(callback){
	    callback(welcome_message)
	  }
	  this.create = function(newUser, callback){
	  	console.log("inside factory create")
	  	console.log("newUser:", newUser)
	  	alert("entering backend console!")
	  	$http.post('/users', newUser).then(function(response_data){
	  		console.log("inside factory create http callback")
	  		console.log(response_data)
	  		callback(response_data)
	  	})
	  }
  }
  return new WelcomeFactory();
}]);