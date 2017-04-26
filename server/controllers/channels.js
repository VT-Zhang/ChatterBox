var mongoose = require('mongoose');
var User = mongoose.model('User')
var Message = mongoose.model('Message')
var Channel = mongoose.model('Channel')
var Conversation = mongoose.model('Conversation')

function ChannelsController(){
    this.create = function(req, res){
        Channel.create(req.body, function(err, channel){
            if(err){return res.json({errors: err.errors})}
            else{return res.json({channel: channel})}
        })
    }
    this.join = function(req, res){
        User.findOne({_id: req.params.user_id}, function(err, user){
            if(err){return res.json({errors: err.errors})}
            Channel.findOne({_id: req.params.id}, function(err, channel){
                if(err){return res.json({errors: err.errors})}
                channel.members.push(user);
                channel.save(function(err){
                    if(err){return res.json({errors: err.errors})}
                    user.channels.push(channel)
                    user.save(function(err){
                        if(err){return res.json({errors: err.errors})}
                        else{
                            return res.json({errors: {errors: {message: `${user.user_name} joined the channel!`}}})
                        }
                    })

                })
            })
        })
    }
    this.destroy = function(req, res){
        if(req.params.user_id != _owner){
            return res.json({errors: {errors: {message: "Insufficient privileges to delete this channel!"}}})
        }
        else{
            Channel.remove({_id: req.params.id}, function(req, res){
                if(err){return res.json({errors: err.errors})}
                else{
                    return res.json({errors: {errors: {message: "Channel deleted!"}}})
                }
            })
        }
    }
    this.leave = function(req, res){
        User.findOne({_id: req.params.user_id}, function(err, user){
            if(err){return res.json({errors: err.errors})}
            Channel.findOne({_id: req.params.id}, function(err, channel){
                if(err){return res.json({errors: err.errors})}
                var idx = channel.members.indexOf(user._id);
                channel.members.splice(idx, 1);
                channel.save(function(err){
                    if(err){return res.json({errors: err.errors})}
                    var idx2 = user.channels.indexOf(channel._id)
                    user.channels.splice(idx2, 1)
                    user.save(function(err){
                        if(err){return res.json({errors: err.errors})}
                        else{
                            return res.json({errors: {errors: {message: `${user.user_name} left the channel!`}}})
                        }
                    })

                })
            })
        })
    }
}
module.exports = new ChannelsController();
