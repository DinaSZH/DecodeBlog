const express = require("express");
const router = express.Router();
const { upload } = require("./multer");
const { createPost } = require("./controller");
const { isAuth } = require("../auth/middlewares");

router.post("/api/new", isAuth, upload.single("image"), createPost);

module.exports = router;
