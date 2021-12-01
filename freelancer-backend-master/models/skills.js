const mongoose = require("mongoose");
const skillSchema = {
  project_worked: { type: String },
  skill_name:{type:String},
  skill_parent:{type: mongoose.Schema.Types.ObjectId},
  skill_child:{type: mongoose.Schema.Types.ObjectId}
};
module.exports = mongoose.models("skills", skillSchema);
   


