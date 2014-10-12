//imports
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//config 
mongoose.connect('mongodb://todoapp:todo1@ds041140.mongolab.com:41140/todo'); 

app.use(express.static(__dirname + '/public')); 	; //static file location
app.use(morgan('dev')); //log requests to console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//model
var Todo = mongoose.model('Todo', {
	text : String
});

//listen
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port);
console.log('App listenening on 8080');

//routes

	//api
	app.get('/api/todos', function(req,res){

		Todo.find(function(err, todos){

			if (err){
				res.send(err);
			}
			res.json(todos);
		});

		app.post('/api/todos', function(req, res){

			Todo.create({
				text : req.body.text,
				done : false
			}, function(err, todo){

				if (err){
					res.send(err);
				}

			});

			Todo.find(function(err, todos){

				if (err){
					res.send(err);
				}
				res.json(todos);
			});

		});

		app.delete('/api/todos/:todo_id', function(req,res){
			Todo.remove({
				_id : req.params.todo_id
			}, function(err, todo){
				if (err){
					res.send(err);
				}

				Todo.find(function(err, todos){

					if (err){
						res.send(err);
					}
					res.json(todos);
				});

			});
		});

		});

		//front end app
		app.get('*', function(req,res){
			res.sendfile('./public/index.html'); //load file into single view for Angular to then handle
		});