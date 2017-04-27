var mongoose = require('mongoose');
var User = mongoose.model('User')
var Message = mongoose.model('Message')
var Channel = mongoose.model('Channel')
var Conversation = mongoose.model('Conversation')

function MessagesController(){
    this.create = function(req, res){
        if(req.body.type == "channel"){
            req.body.type = null;
            Channel.findOne({_id: req.params.id}, function(err, channel){
                if(err){return res.json({errors: err.errors})}
                Message.create(req.body, function(err, message){
                    if(err){return res.json({errors: err.errors})}
                    message._channel = req.params.id;
                    channel.messages.push(message._id);
                    message.save(function(err){
                        if(err){return res.json({errors: err.errors})}
                        channel.save(function(err){
                            if(err){return res.json({errors: err.errors})}
                            else{
                                return res.json({errors: {errors: {message: "Message added!"}}})
                            }
                        })
                    })
                })
            })
        }
        else if(req.body.type == "conversation"){
            req.body.type = null;
            Conversation.findOne({_id: req.params.id}, function(err, conversation){
                if(err){return res.json({errors: err.errors})}
                Message.create(req.body, function(err, message){
                    message._conversation = req.params.id;
                    conversation.messages.push(message._id);
                    message.save(function(err){
                        if(err){return res.json({errors: err.errors})}
                        conversation.save(function(err){
                            if(err){return res.json({errors: err.errors})}
                            else{
                                return res.json({errors: {errors: {message: "Message added!"}}})
                            }
                        })
                    })
                })
            })
        }
    }

    this.destroy = function(req, res){
        Message.remove({_id: req.params.id}, function(err, message){
            if(err){return res.json({errors: err.errors})}
            else{return res.json({errors: {errors: {message: "Message deleted!"}}})}
        })
    }
}
module.exports = new MessagesController();
