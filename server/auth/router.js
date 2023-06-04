const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signUp, signIn, signOut } = require("./controller");

router.post("/api/signup", signUp);
router.post(
  "/api/signin",
  passport.authenticate("local", { failureRedirect: "/login?error=1" }),
  signIn
);
router.get("/api/signout", signOut);
router.get("/api/auth/github", passport.authenticate("github"), (req, res) => {
  res.redirect("/profile/" + req.user._id);
});

module.exports = router;
