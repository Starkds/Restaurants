const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
name :{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true,
},
work:{
    type:String,
    enum:["chef","waiter","owner","manager"],
},
mobile:{
    type:Number,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
address:{
    type:String,
    required:true,
},
salary:{
    type:Number,
    required:true,
}
})


const User = mongoose.model('User', userSchema);


module.exports = User;