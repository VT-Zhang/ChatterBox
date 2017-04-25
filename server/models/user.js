var mongoose = require('mongoose');
var validators = require('mongoose-validators')
var Schema = mongoose.Schema;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
	dd='0'+dd
}
if(mm<10) {
	mm='0'+mm
}
yyyy -= 18

var isOldEnough = mm+'/'+dd+'/'+yyyy;

var UserSchema = new mongoose.Schema({
	first_name: {type: String, required: "Your first name is required!", minlength: 1},
    last_name: {type: String, required: "Your last name is required!", minlength: 1},
	user_name: {type: String, required: "You must have a user name!!", minlenght: 3},
	channels: [{type: Schema.Types.ObjectId, ref: "Channel"}],
	conversations: [{type: Schema.Types.ObjectId, ref: "Conversation"}],
    email: {type: String, required: "Your email is required!", minlength: 1, unique: true,
            validate: validators.isEmail()
        },
    password: {
     type: String,
     required: "A password is required!!",
     minlength: 8,
     validate: {
       validator: function( value ) {
         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
       },
       message: "Password failed validation, you must have at least 1 number, uppercase and special character"
     }
   },
   birthday: {type: Date, required: "You birthday is required!!", validate: validators.isBefore("You must be 18 or older!", [isOldEnough])}
}, {timestamps: true})


mongoose.model('User', UserSchema); //For more information, research mongoose schemas
