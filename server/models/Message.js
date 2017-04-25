var mongoose = require('mongoose');
var validators = require('mongoose-validators')
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    _channel: {type: Schema.Types.ObjectId, ref: "Channel"},
    _conversation: {type: Schema.Types.ObjectId, ref: "Conversation"},
    _user: {type: Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: "You must provide a message"},
})

mongoose.model('Message', MessageSchema);
