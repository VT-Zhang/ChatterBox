var mongoose = require('mongoose');
var User = mongoose.model('User')
var Message = mongoose.model('Message')
var Channel = mongoose.model('Channel')
var Conversation = mongoose.model('Conversation')

function ConversationsController(){
    this.create = function(req, res){
        Conversation.findOne({_user1: req.params.id, _user2: req.body._user1}, function(err, conversation1){
            if(err){return res.json({errors: err.errors})}
            if(!conversation1){
                Conversation.findOne({_user1: req.body._user1, _user2: req.params.id}, function(err, conversation2){
                    if(err){return res.json({errors: err.errors})}
                    if(!conversation2){
                        req.body._user2 = req.params.id
                        Conversation.create(req.body, function(err, newConversation){
                            User.findOne({_id: req.body._user1}, function(err, user1){
                                user1.conversations.push(newConversation)
                                user1.save(function(err){
                                    if(err){return res.json({errors: err.errors})}
                                })
                            })
                            User.findOne({_id: req.body._user2}, function(err, user2){
                                user2.conversations.push(newConversation)
                                user2.save(function(err){
                                    if(err){return res.json({errors: err.errors})}
                                })
                            })
                            if(err){return res.json({errors: err.errors})}
                            else{
                                return res.json(newConversation);
                            }
                        })
                    }
                    else {
                        return res.json(conversation2)
                    }
                })
            }
            else{
                return res.json(conversation1);
            }
        })
    }

    this.show = function(req, res){
        Conversation.findOne({_id: req.params.id})
        .populate('_user1')
        .populate('_user2')
        .populate('messages')
        .exec(function(err, conversation){
            if(err){return res.json({errors: err.errors})}
            Message.find({_conversation: req.params.id})
            .populate('_user')
            .exec(function(err, messages){
                if(err){return res.json({errors: err.errors})}
                else{
                    return res.json({conversation: conversation, messages: messages})
                }
            })
        })
    }
}
module.exports = new ConversationsController();
