const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema for client
const ClientSchema = new Schema({
  plateNum: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Client = mongoose.model("clients", ClientSchema);
