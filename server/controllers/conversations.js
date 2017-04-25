var mongoose = require('mongoose');
var User = mongoose.model('User')
var Message = mongoose.model('Message')
var Channel = mongoose.model('Channel')
var Conversation = mongoose.model('Conversation')

function ConversationsController(){
    this.create = function(req, res){
        User.find({}, function(err, users){
            if(err){return res.json({errors: err.errors})}
            User.findOne({_id: req.params.id}, function(err, user){
                for(var i = 0; i < users.length; i++){
                    Conversation.create(req.body, function(err, conversation){
                        if(err){return res.json({errors: err.errors})}
                        conversation._user2 = users[i];
                        conversation.save(function(err){
                            if(err){return res.json({errors: err.errors})}
                            users[i].conversations.push(conversation)
                            users[i].save(function(err){
                                if(err){return res.json({errors: err.errors})}
                            })
                            user.conversations.push(conversation);
                        })
                    })
                }
                user.save(function(err){
                    if(err){return res.json({errors: err.errors})}
                    else{return res.json({errors: {errors: {message: "New conversations created!"}}})}
                })
            })
        })
    }
}
module.exports = new ConversationsController();
