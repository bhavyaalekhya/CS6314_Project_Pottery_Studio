// var mongoose = require('mongoose'),
// Schema = mongoose.Schema,
const mongoose =require('mongoose') ;
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
 username: String,
 email:String,
 password: String,
 phone:Number,
 address:String,
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
 };
 

module.exports= mongoose.model('User', UserSchema,'Users');