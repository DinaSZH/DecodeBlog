const Categories = require("./Categories");

const getAllCategories = async (req, res) => {
  const data = await Categories.find();
  res.send({ data });
};

module.exports = { getAllCategories };
