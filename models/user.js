var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name : {type:String, required:true},
    email : {type:String, required:true, unique:true, trim:true, match: /@/},
    age: {type:Number, min:18, max:45},
    address:{
        city:String,
        state:String,
        PIN: String
    }
}, {timestamps:true});
var User = mongoose.model('User', userSchema);
module.exports= User;