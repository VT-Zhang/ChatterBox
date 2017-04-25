app.factory('chatterFactory', ['$http', function($http) {

  function ChatterFactory(){
  	var socket = io.connect();

    this.getAll = function(callback){
        $http.get('/users')
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.createUser = function(newUser, callback){
        $http.post('/users', newUser)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.showUser = function(id, callback){
        $http.get("/users/"+id)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.removeUser = function(id, callback){
        $http.delete('/users/'+id)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.updateUser = function(id, callback){
        $http.put('/users/'+id)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.createMessage = function(id, newMessage, callback){
        $http.post('/users/'+id+'/messages', newMessage)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.deleteMessage = function(id, callback){
        $http.delete('/messages/'+id)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.createConversations = function(id, newConversation, callback){
        $http.post('/users/'+id+'/conversations', newConversation)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.createChannel = function(newChannel, callback){
        $http.post('/channels/', newChannel)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.joinChannel = function(user_id, channel_id, callback){
        $http.post('/users/'+user_id+'/channels/'+channel_id)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.leaveChannel = function(user_id, channel_id, callback){
        $http.put('/users/'+user_id+'/channels/'+channel_id)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }

    this.destroyChannel = function(user_id, channel_id, callback){
        $http.delete('/users/'+user_id+'/channels/'+channel_id)
        .then(function(returned_data){
            if(typeof(callback) == "function"){
                callback(returned_data.data);
            }
        })
        .catch(function(err){console.log(err);})
    }


  }
  return new ChatterFactory();
}]);
