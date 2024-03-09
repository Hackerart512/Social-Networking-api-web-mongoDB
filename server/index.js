const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const connectToMogoose= require('./database');

app.use(express.json());
app.use(cors());

// Available routes

//login, signup, middleware1 three routes in one file
app.use('/api/auth',require('./src/routers/auth'));

// User prfile to add, delete, update, view thier profile
app.use('/api/profile',require('./src/routers/profile'));

// User prfile to add, delete, update, view thier profile
app.use('/api/post',require('./src/routers/post'));

 
// http://localhost:5000/ send hello msg then when start nodemon index.js
app.listen(port, function(){
    console.log(`localhost:${port}`);
})