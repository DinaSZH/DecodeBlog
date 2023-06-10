const passport = require("passport");
const User = require("../auth/User");
//const User = require("../auth/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email })
        .then((user) => {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              return done(err);
            }
            if (result) {
              return done(null, user);
            }
          });
        })
        .catch((e) => {
          return done(e);
        });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: "b1dec5a2f8ac95710d40",
      clientSecret: "ca068784b2112350fa769ecf62b7ba62b4ce4a31",
      callbackURL: "http://localhost:8000/api/auth/github",
      scope: ["openid", "email", "profile"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.find({ githubId: profile.id });
      const newUser = await new User({
        githubId: profile.id,
        full_name: profile.username,
        // email: profile.emails[0].value,
      }).save();
      console.log(newUser);

      return done(null, newUser);
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user, err) => {
    done(err, user);
  });
});
