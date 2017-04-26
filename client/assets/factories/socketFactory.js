app.factory('socketFactory', ['$http', function($http) {

  function SocketFactory(){
  	var socket = io.connect();
    socket.emit('test', {message: "trying"})
    socket.on('success', function(data){
        console.log(data.message);
    })

  return new SocketFactory();
}]);
