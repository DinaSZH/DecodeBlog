const express = require("express");
const router = express.Router();
const Categories = require("../Categories/Categories");
const User = require("../auth/User");
const Post = require("../Posts/Post");
const Comment = require("../Comment/Comments");

router.get("/", async (req, res) => {
  const options = {};
  const categories = await Categories.findOne({ key: req.query.category });
  if (categories) {
    options.category = categories._id;
    res.locals.category = req.query.category;
  }
  let page = 0;
  const limit = 3;
  if (req.query.page && req.query.page > 0) {
    page = req.query.page;
  }

  if (req.query.search && req.query.search.length > 0) {
    options.$or = [
      {
        title: new RegExp(req.query.search, "i"),
      },
    ];

    res.locals.search = req.query.search;
  }
  const totalPosts = await Post.count(options);
  const allCategories = await Categories.find();
  const posts = await Post.find(options)
    .limit(limit)
    .skip(page * limit)
    .populate("category")
    .populate("author");
  res.render("index", {
    categories: allCategories,
    user: req.user ? req.user : {},
    posts,
    pages: Math.ceil(totalPosts / limit),
  });
});

router.get("/profile/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find().populate("category").populate("author");
  if (user) {
    res.render("myProfile", {
      user: user,
      loginUser: req.user,
      posts,
    });
  } else {
    res.redirect("/not-found");
  }
});

router.get("/detail/:id", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.id }).populate(
    "authorId"
  );
  console.log(comments);
  const post = await Post.findById(req.params.id)
    .populate("category")
    .populate("author");
  const allCategories = await Categories.find();

  res.render("detail", {
    categories: allCategories,
    post: post,
    user: req.user ? req.user : {},
    comments: comments,
  });
});

router.get("/newBlog", async (req, res) => {
  const allCategories = await Categories.find();
  res.render("newBlog", {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});

router.get("/edit/:id", async (req, res) => {
  const allCategories = await Categories.find();
  const post = await Post.findById(req.params.id);
  res.render("editBlog", {
    categories: allCategories,
    user: req.user ? req.user : {},
    post,
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
