const express = require("express");
const router = express.Router();
const { upload } = require("./multer");
const { createPost, editPost, deletePost } = require("./controller");
const { isAuth } = require("../auth/middlewares");

router.post("/api/posts/new", isAuth, upload.single("image"), createPost);
router.post("/api/posts/edit", isAuth, upload.single("image"), editPost);
router.delete("/api/posts/:id", isAuth, deletePost);

module.exports = router;
