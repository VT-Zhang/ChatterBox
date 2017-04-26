app.factory('socketFactory', ['$http', function($http) {

  function SocketFactory(){
      	var socket = io.connect();

        this.newMessage = function(){
            socket.emit('new_message', {refresh: "Refresh chat!"})
        }
        socket.on('refresh_chat', function(data){
            console.log(data.refresh);
        })

    }


  return new SocketFactory();
}]);
