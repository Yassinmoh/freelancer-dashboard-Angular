const mongoose = require("mongoose");
const paymentschema = {
  clinet_state: { type: String },
  depvolper_state: { type: String },
  work_state: { type: String },
  recive_state: { type: String },
  budget: { type: Number },
  payment_type:{type:String}
};
module.exports = mongoose.models("payment", paymentschema);
