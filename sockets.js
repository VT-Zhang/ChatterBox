module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        console.log("Sockets are enabled on this application!");
        console.log(socket.id);
    });
}
