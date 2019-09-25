const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PaymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    //database name
    ref: "users"
  },
  cardtype: {
    type: String
    // required: true
  },
  cardnum: {
    type: String
    // required: true
  },
  expiration: {
    type: String
    // required: true
  },
  code: {
    type: String
    // required: true
  },
  status: {
    type: String
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
