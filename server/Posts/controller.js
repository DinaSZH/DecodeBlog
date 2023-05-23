const Post = require("./Post");
const fs = require("fs");
const path = require("path");
const createPost = async (req, res) => {
  if (
    req.file &&
    req.body.title.length > 2 &&
    req.body.category.length > 2 &&
    req.body.description.length > 2
  ) {
    await new Post({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: `/images/posts/${req.file.filename}`,
      author: req.user._id,
    }).save();
    res.redirect(`/profile/${req.user._id}`);
  } else {
    res.redirect("new?error=1");
  }
};

const editPost = async (req, res) => {
  if (
    req.file &&
    req.body.title.length > 2 &&
    req.body.category.length > 2 &&
    req.body.description.length > 2
  ) {
    const blogs = await Post.findById(req.body.id);
    fs.unlinkSync(path.join(__dirname + "../../../public/" + blogs.image));
    blogs.title = req.body.title;
    blogs.category = req.body.category;
    blogs.description = req.body.description;
    blogs.image = `/images/posts/${req.file.filename}`;
    blogs.author = req.user._id;
    blogs.save();

    res.redirect("/profile/" + req.user._id);
  } else {
    res.redirect(`/edit/${req.body.id}?error=1`);
  }
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    if (fs.existsSync(path.join(__dirname + "../../../public" + post.image))) {
      fs.unlinkSync(path.join(__dirname + "../../../public" + post.image));
    }

    await Post.deleteOne({ _id: req.params.id });
    res.status(200).send("ok");
  } else {
    res.status(404).send("Not found");
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
};
