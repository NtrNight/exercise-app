const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Set Up Middlleware
app.use(cors());//Cors Middleware
app.use(express.json());//Parse ExpressJson Server

const exercisesRouter = require('./routes/exrecises'); //Require route
const usersRouter = require('./routes/users'); //Require route

app.use('/exercises', exercisesRouter); //express route
app.use('/users', usersRouter); //express route


//Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})