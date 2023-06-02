const Comment = require("./Comments");

const saveComment = async (req, res) => {
  console.log("controller Comment", req.body);
  console.log("req.body.authorId ", req.body.authorId);
  console.log("req.body.postId ", req.body.postId);

  if (req.body.authorId && req.body.postId) {
    await new Comment({
      text: req.body.text,
      authorId: req.body.authorId,
      postId: req.body.postId,
      date: Date.now(),
    }).save();
    res.status(200).send(true);
  }
};

module.exports = {
  saveComment,
};
