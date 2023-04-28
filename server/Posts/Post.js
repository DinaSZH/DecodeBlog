const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: String,
  category: { type: Schema.Types.ObjectId, ref: "category" },
  description: String,
  image: String,
  author: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("post", PostSchema);
