const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId },
  freelancer_id: { type: mongoose.Schema.Types.ObjectId },
  project_id: { type: mongoose.Schema.Types.ObjectId },
  payment_id: { type: mongoose.Schema.Types.ObjectId },
  skill_id: { type: mongoose.Schema.Types.ObjectId },
  post_id:{type: mongoose.Schema.Types.ObjectId}

});
module.exports = mongoose.models("jobs", jobsSchema);
