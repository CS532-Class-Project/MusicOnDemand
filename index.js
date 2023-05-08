const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const util = require('util');
const path = require("path")
const multer = require("multer")
const fs = require('fs');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 3000;
//setup mongoose connection and user models
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));
var User = require("./models/user");
var usera={};
app.set("view engine", "ejs");
//app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//following part for class helper project
let directory_name = "upload";
  
// Function to get current filenames
// in directory
let filenames = fs.readdirSync(directory_name);

console.log("\nFilenames in directory:");
filenames.forEach((file) => {
    console.log("File:", file);
});

const maxSize = 100 * 1000 * 1000;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "upload")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+file.originalname)
    }
  }) ;   
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|pdf|doc|mp4|txt/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("fileupload"); 


app.post('/upload', (req, res) => {
    upload(req,res,function(err) {
  
        if(err) {
          res.send(err)
        }
        else {
          res.send("Success, Image uploaded!")
        }
    })
});
//socket for all actions in projects
io.on('connection', function(socket){
  console.log('a user connected');
    //'create' is used to transfer player's room and color
   socket.on('create', function(msg) {
	 var myArray = msg.split("#");   
     socket.join("room"+myArray[1]);
	 st="(yellow)";
	 if (myArray[2]==0){st="(red)";}
	 io.emit('chat message', myArray[0]+st+" joins room"+myArray[1]);
  });
  
  //'action' is used to transfer clicks of 2 players

  socket.on('action', function(varStr){
	var myArray = varStr.split("#"); 
    socket.join("room"+myArray[0]);	
    io.in("room"+myArray[0]).emit('action', varStr);
	console.log(varStr);
  });
   
  socket.on('chat message', function(msg){
  io.emit('chat message', msg);

  });
});


/* setup a session for authenticate part*/
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
   // res.redirect('/');
  });
  res.redirect("/login.html");
});

// internet game
app.get('/game', function(req, res){
   res.sendFile(__dirname + '/game.html');
});
//for class helper project
app.get('/helper', function(req, res){
	let data = {
        name: 'files',
        hobbies: filenames
    }
  // res.sendFile(__dirname + '/index.html');
   res.render('home.ejs', { data: data });
  
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

//for mongodb operations
app.get("/input", function(req, res){
    res.render("pages/input");
});
	
var musicModel = require("./models/music");


//musics.ejs shows the sales info of farmers
app.get("/musics", function(req,res) {
    
	musicModel.listAllMusics().then(function(musics){
		console.log(musics);
		res.header('Content-Security-Policy', "img-src 'self'");
        res.render("pages/musics.ejs", {user:usera, musics:musics});
		
    }).catch(function(error){ 
	
        res.error("Something went wrong!" + error );
    });
    
});

//interface
app.get("/", function(req, res) {
	usera=req.user;
  res.render("index.ejs", {user:req.user});
});
//show query from the farmers
app.get("/china", function(req,res) {
    
	musicModel.queryMusics().then(function(musics){
        res.render("pages/Ch_musics", {user:usera,musics:musics});
		
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})
//save fruit to test.fruits collection. 
//save music to test.musics collection.
var prod={};
app.post('/music', function(req, res){
	prod=req.body.music;
	
  function save(){	
    if(JSON.stringify(prod).length>10){
		var newmusic = new musicModel(prod);
		
		newmusic.save().then(function(){
		console.log(req.body);
        res.send("Added new musics to database!");
        }).catch(function(err){
        res.err("Failed to add new musics to database!");
		});
	}
  }
  setTimeout(save,1000);
	
});

http.listen(port, function() {
  console.log("App listening on port " + port + " !");
});
