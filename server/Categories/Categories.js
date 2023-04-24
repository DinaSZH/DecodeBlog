const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  name: String,
  key: Number,
});

module.exports = mongoose.model("categories", CategoriesSchema);
