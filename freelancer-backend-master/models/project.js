const mongoose = require("mongoose");
const ProjectSchema = mongoose.Schema({
  project_name: { type: String ,required:true,minLength:10},
  budget: { type: Number },
  description:{type:String,required:true,minLength:30},
  state:{type:String, default:"pending"}
},{timestamps:true});
module.exports = mongoose.model("Project", ProjectSchema);
