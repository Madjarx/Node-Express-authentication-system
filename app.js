const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

require('dotenv').config();

// mongoose.Promise = global.Promise //es6 global promise library // ne treba mi ovo
mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log('connected with database');
});

const app = express();

// middleware
app.use(morgan('dev'));
//app.use(bodyParser.json()) -> umisto ovoga ide linija app.use(express.json());
app.use(express.json());

// routes
app.use('/users', require("./routes/users"))


// start the server
const port = process.env.PORT || 3000;

app.listen(port);
console.log(`server listening at ${port}`);