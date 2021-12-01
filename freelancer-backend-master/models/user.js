const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    userName:{type:String, required: true}, 
    Email:{type:String,required:true , unique:true},
    Phone:{type: Number, min: 10 },
    Password:{type:String, required: true },
    Rating: { type: String },
   typeUser: { type: String,default:"user"},
    firstName:{type: String, required: true},
     lastName:{type: String, required: true},
    whatDo:{type: String, required: true,minLength:10},
     Description:{type: String, required: true,minLength:100},
     Language:{type: String, required: true},
    dateOfBirth:{type:Date,required:true},
    linkAcount:{type: String, required: true},
    Address:{type: String, required: true},
    City:{type: String, required: true},
    State:{type: String, required: true},
    zipCode:{type: String, required: true},
    Country:{type: String, required: true},
})
module.exports = mongoose.model('users', UserSchema) 



