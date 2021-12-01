const mongoose = require("mongoose");
const categrySchema = mongoose.Schema({
  category_id: { type: String },
  category_name: { type: String },
  parent_categry: { type: String },
  child_categry: { type: String },
});
module.exports = mongoose.models("category", categrySchema);
