const Post = require("./Post");
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
      image: `images/posts/${req.file.filename}`,
      author: req.user._id,
    }).save();
    res.redirect(`/profile/${req.user._id}`);
  } else {
    res.redirect("new?error=1");
  }
};

module.exports = {
  createPost,
};
