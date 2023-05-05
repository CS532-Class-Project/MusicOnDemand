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
var farmerModel = require("./models/farmer");
var fruitModel = require("./models/fruit");

//setup mongoose connection and user models
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));
var User = require("./models/user");

app.set("view engine", "ejs");
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

const maxSize = 1 * 1000 * 1000;
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
        var filetypes = /jpeg|jpg|png|pdf|doc|txt/;
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

setInterval(() => {
  var filenamesA = fs.readdirSync(directory_name);
 
filenamesA.forEach((file) => {
	if (!filenames.includes(file)){
	app.get('/upload/'+file, function(req, res) {
   res.sendFile(__dirname + '/upload/'+file);
   });	
   filenames=filenamesA;
    console.log("File:", file);}
});

}, "5000");

filenames.forEach((file) => {
	app.get('/upload/'+file, function(req, res) {
   res.sendFile(__dirname + '/upload/'+file);
   });
});


app.post('/upload', (req, res) => {
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
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
//interface
app.get("/", function(req, res) {
  res.render("index.ejs", {user:req.user});
});
app.get("/dataAnalyst", function(req, res) {
  res.render("dataAnalyst.ejs", {user:req.user});
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
app.get("/form", function(req, res){
    res.render("pages/form");
});
//farmers info and fruits info are shown together in index.ejs

 var farm={};
	farmerModel.listAllfarmers().then(function(farmers){
        farm=farmers;
		//console.log(farm);
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
		
function readDB(){	
var farmers =farm;

app.get('/mongodb', function(req, res){
  // res.render('pages/index');
 	 
	
   fruitModel.listAllfruits().then(function(fruits){
        res.render("pages/queries", {fruits:fruits,farmers:farmers});
		
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
});
//"populate" function is used to show the fruit information 
//can include the producer's profile
app.get("/salesPeach", function(req,res) {
fruitModel.find({ product: 'peach' })
.populate("producedby")
.then(fruits=>res.render("pages/salesPeach", {fruits:fruits}))
.catch();    
  });

}
setTimeout(readDB,1000);
 

//sales.ejs shows the sales info of fruits  
app.get("/sales", function(req,res) {
    fruitModel.listAllfruits().then(function(fruits){
        res.render("pages/sales", {fruits:fruits});
		
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})
//farmers.ejs shows the sales info of farmers
app.get("/farmers", function(req,res) {
    
	farmerModel.listAllfarmers().then(function(farmers){
        res.render("pages/farmers", {farmers:farmers});
		
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})
//show query from the farmers
app.get("/farmersQuery", function(req,res) {
    
	farmerModel.queryfarmers().then(function(farmers){
        res.render("pages/farmersQuery", {farmers:farmers});
		
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})
//save fruit to test.fruits collection. 

app.post('/fruit', function(req, res){
	var prod={};
	prod=req.body.fruit;
	var prodStr;
	prodStr=""+req.body.fruit.product;
	//console.log(prodStr);
	farmerModel.findOne({product:prodStr}, '_id', function(err, farmer) {
  if (err) return handleError(err);
  console.log(farmer._id);
  console.log(prod);
  prod["producedby"]=farmer._id;
  console.log(prod);
});


function save2Fruit(){	//	req.body.fruit.productedby=prod[0]._id;		
    console.log("fruit: " + JSON.stringify(prod));
    var newfruit = new fruitModel(prod);
    
    newfruit.save().then(function(){
        res.send("Added new fruits to database!");
    }).catch(function(err){
        res.err("Failed to add new fruit to database!");
    });
}
setTimeout(save2Fruit,500);
	
});

//save farmer to test.farmers collection.
app.post('/farmer', function(req, res){
	
    if(JSON.stringify(req.body).length>10){
	
    var newfarmer = new farmerModel(req.body);
  
    newfarmer.save().then(function(){
		console.log("Added new farmers to database!");
        res.send("Added new farmers to database!");
    }).catch(function(err){
        res.err("Failed to add new farmers to database!");
    });	
	}
});

http.listen(port, function() {
  console.log("App listening on port " + port + " !");
});
