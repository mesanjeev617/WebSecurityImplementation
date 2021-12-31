const express = require('express');
const app = express(); //Invoke the function
//Import Mongoose
const mongoose = require('mongoose');
//Import dotenv
const dotenv = require('dotenv');
//Importing Routes
const authRoute = require('./routes/auth');
//
const postRoute = require('./routes/posts')


dotenv.config();

//dotenv le password laai slightly secure garchha....
//install dotenv 
//Will create environment variable which will not be showed 
//if we use github or if we use Heroku we will have option not to use that
//Connect to db
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true},
()=> console.log('connected to DB'))

//Middlewares
app.use(express.json());

//Route MiddleWares...
app.use('/api/user/', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, ()=> console.log('Server Up and running.....'));

//Database ko laagi naya account use gareko mongoDB... sbharati1@cougars.ccis.edu --> caldwell
