
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var cors = require('cors');
var csurf = require('csurf');

// setup route middlewares
var csurfProtection = csurf({ cookie: true })

var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');



var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', usersRouter);
app.use('/auth', postRouter);

app.use(csurfProtection);

app.get('/auth/csrf-token',(request, response)=>{
    response.json({csrfToken: request.csrfToken})
});

module.exports = app;
