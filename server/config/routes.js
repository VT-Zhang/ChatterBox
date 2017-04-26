var users = require('../controllers/users.js')
var messages = require('../controllers/messages.js')
var channels = require('../controllers/channels.js')
var conversations = require('../controllers/conversations.js')
module.exports = function(app){
	app.post('/users', users.create);
	app.get('/dash/:id', users.getAll);
	app.get('/users/:id', users.show);
	app.delete('/users/:id', users.remove);
	app.put('/users/:id', users.update);

	app.post('/users/:id/messages', messages.create);
	app.delete('/messages/:id', messages.destroy);

	app.get('/conversations/:id', conversations.show)
	app.post('/users/:id/conversations', conversations.create);

	app.post('/channels/', channels.create);
	app.get('/channels/:id', channels.show)
	app.post('/users/:user_id/channels/:id', channels.join);
	app.delete('/users/:user_id/channels/:id', channels.destroy);
	app.put('/users/:user_id/channels/:id', channels.leave);
}
