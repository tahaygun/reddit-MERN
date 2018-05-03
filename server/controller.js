const bodyparser = require("body-parser");
const expressValidator = require("express-validator");
const User = require("./models/User");
const Post = require("./models/Post");
var { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");

module.exports = function(app) {
  function authenticateUser(req, res, next) {
    if (req.session.user) return next();
    res.json({ error: true, message: "Not authenticated, please login!" });
  }
  const regValidation = [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email should be an email address"),
    check("firstname")
      .not()
      .isEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("Name should be at least 2 letters")
      .matches(/^([A-z]|\s)+$/)
      .withMessage("Name cannot have numbers"),
    check("lastname")
      .not()
      .isEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name should be at least 2 letters"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is required")
      .isLength({ min: 2 })
      .withMessage("Username should be at least 2 letters"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters"),
    check(
      "password_con",
      "Password confirmation  is required or should be the same as password"
    ).custom(function(value, { req }) {
      if (value !== req.body.password) {
        throw new Error("Password don't match");
      }
      return value;
    }),
    check("email").custom(value => {
      return User.findOne({ email: value }).then(function(user) {
        if (user) {
          throw new Error("This email is already in use");
        }
      });
    })
  ];
  app.get("/api/current_user", function(req, res) {
    if (req.session.user) {
      User.findById(req.session.user._id, [
        "email",
        "firstname",
        "lastname"
      ]).then(function(user) {
        res.send(user);
      });
    } else {
      res.send({ error: true, message: "You are not logged in!" });
    }
  });
  function createUser(req, res) {
    const user = new User(req.body);
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }

    user.password = user.hashPassword(user.password);
    user
      .save()
      .then(user => {
        return res.json({
          ok: true,
          message: "You are successfully registerated."
        });
      })
      .catch(error => {
        return res.json({
          error: "Something went wrong, user is not registerated!",
          error
        });
      });
  }
  app.post("/api/register", regValidation, createUser);

  //--------------------------------------------------------------------------------

  const logValidation = [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
  ];
  function loginUser(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    User.findOne({
      email: req.body.email
    })
      .then(function(user) {
        if (!user) {
          return res.send({ error: true, message: "User does not exist!" });
        }
        if (!user.comparePassword(req.body.password, user.password)) {
          return res.send({ error: true, message: "Wrong password!" });
        }
        req.session.user = user;
        req.session.isLoggedIn = true;
        return res.send({ message: "You are signed in" });
        res.send(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  app.post("/api/login", logValidation, loginUser);

  //---------------------------------------------------------------------------

  app.get("/api/isloggedin", (req, res) => {
    if (req.session.isLoggedIn) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
  //---------------------------------------------------------------------------

  const postValidation = [
    check("post")
      .not()
      .isEmpty()
      .withMessage("Please write something.")
  ];

  function addPost(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    var post = new Post(req.body);
    post.user = req.session.user._id;
    post
      .save()
      .then(user => {
        res.json({ success: true });
      })
      .catch(error => {
        res.json(error);
      });
  }
  app.post("/api/addpost", postValidation, authenticateUser, addPost);

  //.----------------------------------------------------------------------

  app.delete("/api/postdelete/:id", (req, res) => {
    Post.findOneAndRemove({ _id: req.params.id })
      .then(res => {
        res.send(res);
      })
      .catch(err => {
        res.send(err);
      });
  });
  //-----------------------------------------------------------------------
  app.post("/api/postupvote/:id", (req, res) => {
    Post.findById(req.params.id).then(function(post) {
      post.vote = post.vote + 1;
      post.save().then(function(post) {
        res.send(post);
      });
    });
  });
  //-----------------------------------------------------------------------
  app.post("/api/update/:id", function(req, res) {
    Post.findById(req.params.id)
      .then(function(post) {
        post.post = req.body.post;
        post.save().then(function(post) {
          res.send(post);
        });
      })
      .catch(err => res.send(err));
  });
  //-----------------------------------------------------------------------

  function showPosts(req, res) {
    Post.find()
      .populate("user", ["username", "email"])
      .sort({ vote: "desc" })
      .then(post => {
        res.json(post);
      })
      .catch(error => {
        res.json(error);
      });
  }
  app.get("/api/showposts", showPosts);
  //-----------------------------------------------------------------------

  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: "Logged out!" });
  });
};
