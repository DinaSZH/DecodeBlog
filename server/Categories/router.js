const express = require("express");
const router = express.Router();

const { getAllCategories } = require("./controller");

const writeDataCategorie = require("./seed");

router.get("/api/category", getAllCategories);

writeDataCategorie();

module.exports = router;
