var mongoose = require('mongoose');
var User = mongoose.model('User')
var Message = mongoose.model('Message')
var Channel = mongoose.model('Channel')
var Conversation = mongoose.model('Conversation')
var bcrypt = require('bcrypt');

function UsersController(){
    this.getAll = function(req, res){
        User.findOne({_id: req.params.id})
        .populate('channels')
        .populate('conversations')
        .exec(function(err, user){
            if(err){return res.json({errors: err.errors})}
            Conversation.find({})
            .populate('_user1')
            .populate('_user2')
            .populate('messages')
            .exec(function(err, conversations){
                if(err){return res.json({errors: err.errors})}
                Channel.find({})
                .populate('_owner')
                .populate('members')
                .populate('messages')
                .exec(function(err, channels){
                    if(err){return res.json({errors: err.errors})}
                    User.find({})
                    .where('_id')
                    .ne(req.params.id)
                    .exec(function(err, otherU){
                        if(err){return res.json({errors: err.errors})}
                        else{
                            return res.json({user: user, conversations: conversations, channels: channels, otherUsers: otherU})
                        }
                    })
                })
            })
        })
    }
  this.create = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){return res.json({errors: err.errors})}
        if(!user){
            if(req.body.password != req.body.password_confirm){
                return res.json({errors: {errors: {message: "Passwords don't match!!"}}})
            }
            else{
                if(req.body.password){
                    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
                }
            }
            User.create(req.body, function(err, newUser){
                if(err){return res.json({errors: err.errors})}
                else{return res.json(newUser)}
            })
        }
        else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                return res.json(user);
            }
            else{
                return res.json({errors: {errors: {message: "Invalid password!!"}}})
            }
        }
    })
  };
  this.remove = function(req, res){
      User.remove({_id: req.params.id}, function(err, user){
          if(err){return res.json({errors: err.errors})}
          else{return res.json({errors: {errors: {message: "Succesfully removed!!"}}})}
      })
  }
  this.update = function(req, res){
      User.findOne({_id: req.params.id}, function(err, user){
          if(err){return res.json({errors: err.errors})}
          user.user_name = req.body.user_name;
          if(req.body.password != req.body.password_confirm){
              return res.json({errors: {errors: {message: "Passwords don't match!!"}}})
          }
          if(req.body.password){
              req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
          }
          user.password = req.body.password;
          user.email = req.body.email;
          user.save(function(err, updatedUser){
              if(err){return res.json({errors: err.errors})}
              else{return res.json({errors: {errors: {message: "User updated succesfully!"}}})}
          })
      })
  }
  this.show = function(req, res){
      User.findOne({_id: req.params.id}, function(err, user){
          if(err){return res.json({errors: err.errors})}
          else{return res.json(user)}
      })
  }
}

module.exports = new UsersController();
