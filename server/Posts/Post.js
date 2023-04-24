const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("post", Post);
