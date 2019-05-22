const express = require('express');
const bodyParser = require('body-parser')
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');
const app = express();

const mongoose = require('mongoose');
// bodyparser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// passport middleware

app.use(passport.initialize());

// passport initialize

require('./config/passport')(passport);
const db = require('./config/keys').mongoURI;

// connecting into database

mongoose.connect(db)
        .then(()=>console.log('ok'))
        .catch(err=>console.log(err))


// routes to deal with api

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.port || 5000;

app.listen(port,()=> console.log('Server running on port '))