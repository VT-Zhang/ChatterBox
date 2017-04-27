app.factory('socketFactory', ['$http','$rootScope', function($http, $rootScope) {

  function SocketFactory(){
      	var socket = io.connect();

        socket.emit('newUser', {user: $rootScope.user.user_name})

        socket.on("showNotification", function(data){
            $rootScope.showNotification(data.user);
        })

        this.newMessage = function(id, type){
            socket.emit('new_message', {type: type, id: id})
        }
        socket.on('refresh_chat', function(data){
            console.log(data.type);
            if(data.type == "channel"){
                $rootScope.loadChannel(data.id)
            }
            else{
                $rootScope.loadConversation(data.id)
            }

        })

    }


  return new SocketFactory();
}]);
