const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Connect to DB
const connectDb = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/mydb");
};
connectDb();

// Import Routes
const usersRoute = require('./routes/users');


// Middlewares
app.use(bodyParser.json());  // run body parser before every route
app.use('/users', usersRoute);


app.listen(3000, () => console.log(`Server running on port 3000`));