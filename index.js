const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const util = require('util');

var app = express();
const port = 3000;

//setup mongoose connection and user models
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));
var User = require("./models/user");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


/* setup a session */
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret <usually keyboard cat>',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

/* initialize passport */
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

/* conver user object into id that is saved in the session */
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

/* takes userId from session and loads whole user object from the database */
passport.deserializeUser(function(userId, done) {
    User.findById(userId, (err, user) => done(err, user));
});

// setup "local" playin username / password strategy
const LocalStrategy = require("passport-local").Strategy;
const local = new LocalStrategy((username, password, done) => {
  //lookup user in database, and check the provided password
  User.findOne({ username })
    .then(user => {
      if (!user || !user.validPassword(password)) {
        done(null, false, { message: "Invalid username/password" });
      } else {
        done(null, user);
      }
    })
    .catch(e => done(e));
});

passport.use("local", local);

app.all("/logout", function(req, res) {
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
  res.redirect('/');
});

app.get("/", function(req, res) {
  res.render("index.ejs", {user:req.user});
});

// local strategy register, checks for existing username, otherwise saves username and password
app.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  
  User.create({ username, password })
    .then(user => {
      console.log("Registered: " + username);
      req.login(user, err => {
        if (err) next(err);
        else res.redirect("/");
      });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        console.log("Sorry, that username is already taken.");
        res.status(500).send("Sorry that username already exists!");
      } else next(err);
    });
});

// local strategy login, username and password are extracted from the post request
app.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login.html"
  })
);



app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});
