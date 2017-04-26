app.factory('socketFactory', ['$http', function($http) {

  function SocketFactory(){
  	var socket = io.connect();

  return new SocketFactory();
}]);
