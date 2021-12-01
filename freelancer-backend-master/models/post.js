const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  post_name: { type: String ,required:true,minLength:10},
  description:{type:String,required:true,minLength:30},
  state:{type:String, default:"pending"},
  Url:{type:String,default:"#"},
  comment:{type:String}
},{timestamps:true});
module.exports = mongoose.model("post", PostSchema);