var mongoose = require('mongoose');
var validators = require('mongoose-validators')
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    _owner: {type: Schema.Types.ObjectId, ref: "User"},
    members: [{type: Schema.Types.ObjectId, ref: "User"}],
    topic: {type: String, required: "You must provide a topic for discussion"},
    messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
}, {timestamps: true})

mongoose.model('Channel', ChannelSchema);
