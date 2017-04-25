module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        console.log("WE ARE USING SOCKETS!");
        console.log(socket.id);
    });
}
