var mongoose = require('mongoose');
var validators = require('mongoose-validators')
var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
    _user1: {type: Schema.Types.ObjectId, ref: "User"},
    _user2: {type: Schema.Types.ObjectId, ref: "User"},
    messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
}, {timestamps: true})

mongoose.model('Conversation', ConversationSchema);
