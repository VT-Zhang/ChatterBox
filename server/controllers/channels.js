var mongoose = require('mongoose');
var User = mongoose.model('User')
var Message = mongoose.model('Message')
var Channel = mongoose.model('Channel')
var Conversation = mongoose.model('Conversation')

function ChannelsController(){
    this.create = function(req, res){
        Channel.create(req.body, function(err, channel){
            if(err){return res.status(400).json(err)}
            else{return res.json({errors: {errors: {message: "Channel created!"}}})}
        })
    }
    this.join = function(req, res){
        User.findOne({_id: req.body._user}, function(err, user){
            if(err){return res.status(400).json(err)}
            Channel.findOne({_id: req.params.id}, function(err, channel){
                if(err){return res.status(400).json(err)}
                channel.members.push(user);
                channel.save(function(err){
                    if(err){return res.status(400).json(err)}
                    user.channels.push(channel)
                    user.save(function(err){
                        if(err){return res.status(400).json(err)}
                        else{
                            return res.json({errors: {errors: {message: `${user.user_name} joined the channel!`}}})
                        }
                    })

                })
            })
        })
    }
    this.destroy = function(req, res){
        if(req.params.user != _owner){
            return res.json({errors: {errors: {message: "Insufficient privileges to delete this channel!"}}})
        }
        else{
            Channel.remove({_id: req.params.id}, function(req, res){
                if(err){return res.status(400).json(err)}
                else{
                    return res.json({errors: {errors: {message: "Channel deleted!"}}})
                }
            })
        }
    }
    this.leave = function(req, res){
        User.findOne({_id: req.params.user}, function(err, user){
            if(err){return res.status(400).json(err)}
            Channel.findOne({_id: req.params.id}, function(err, channel){
                if(err){return res.status(400).json(err)}
                var idx = channel.members.indexOf(user._id);
                channel.members.splice(idx, 1);
                channel.save(function(err){
                    if(err){return res.status(400).json(err)}
                    var idx2 = user.channels.indexOf(channel._id)
                    user.channels.splice(idx2, 1)
                    user.save(function(err){
                        if(err){return res.status(400).json(err)}
                        else{
                            return res.json({errors: {errors: {message: `${user.user_name} left the channel!`}}})
                        }
                    })

                })
            })
        })
    }
}
