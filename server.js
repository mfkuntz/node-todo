#!/bin/env node
// 3rd party imports
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan'); 			// log requests to the console (express4)
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//Hosting configs
var serverInfo = require('./config/serverInfo')();

//User
var database = require('./config/database');

//config 
mongoose.connect(database.url); 

require('./config/passport')(passport, serverInfo); // pass passport for configuration

//Config libs
app.use(express.static(__dirname + '/public')); 	; //static file location
app.use(morgan('dev')); //log requests to console

app.use(cookieParser()); //read cookies
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.set('view engine', 'ejs');

//passport
app.use(session({ secret : 'ilovescotchyscothscoth'}));
app.use(passport.initialize());
app.use(passport.session()); //keep login in session
app.use(flash()); //connect flash for message stored in session

//routes
require('./app/routes')(app, passport);

//listen

app.listen(serverInfo.port, serverInfo.ip, function() {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now() ), serverInfo.ip, serverInfo.port);
});
