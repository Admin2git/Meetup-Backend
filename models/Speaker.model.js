// models/Speaker.js
const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "", // Optional image URL
  },
});

const Speaker = mongoose.model("Speaker", speakerSchema);
module.exports = Speaker;
