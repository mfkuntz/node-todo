#!/bin/env node
// 3rd party imports
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//User
var database = require('./config/database');

//config 
mongoose.connect(database.url); 


//Config libs
app.use(express.static(__dirname + '/public')); 	; //static file location
app.use(morgan('dev')); //log requests to console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//routes
require('./app/routes')(app);

//listen
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.listen(port, ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now() ), ipaddress, port);
});
