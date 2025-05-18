const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  date_time: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Comment", commentSchema);
