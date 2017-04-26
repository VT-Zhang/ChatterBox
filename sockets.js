var users = require('./server/controllers/users.js')
var messages = require('./server/controllers/messages.js')
var channels = require('./server/controllers/channels.js')
var conversations = require('./server/controllers/conversations.js')

module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        console.log("Sockets are enabled on this application!");
        console.log(socket.id);
        socket.on('new_message', function(data){
            console.log(data.refresh);
            io.emit('refresh_chat', {refresh: "Refresh chat!"})
        });
    });
}
