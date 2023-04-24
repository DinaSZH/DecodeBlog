const express = require("express");
const router = express.Router();
const Categories = require("../Categories/Categories");
const User = require("../auth/User");

router.get("/", async (req, res) => {
  const allCategories = await Categories.find();
  res.render("index", {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});

router.get("/profile/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.render("myProfile", {
      user: user,
      loginUser: req.user,
    });
  } else {
    res.redirect("/not-found");
  }
});

router.get("/myPost", async (req, res) => {
  const allCategories = await Categories.find();
  res.render("myPost", {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});

router.get("/newBlog", async (req, res) => {
  const allCategories = await Categories.find();
  res.render("newBlog", {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user ? req.user : {} });
});

router.get("/signUp", (req, res) => {
  res.render("signup", { user: req.user ? req.user : {} });
});

router.get("/not-found", (req, res) => {
  res.render("notFound");
});

module.exports = router;
