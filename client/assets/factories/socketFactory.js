app.factory('socketFactory', ['$http','$rootScope', function($http, $rootScope) {

  function SocketFactory(){
      	var socket = io.connect();

        this.newMessage = function(){
            socket.emit('new_message', {refresh: "Refresh chat!"})
        }
        socket.on('refresh_chat', function(data){
            console.log(data.refresh);
            $rootScope.work();
        })

    }


  return new SocketFactory();
}]);
