//routes

var Todo = require('./models/todo');

module.exports = function(app, passport){


	//api
	app.get('/api/todos', function(req,res){

		Todo.find(function(err, todos){

			if (err){
				res.send(err);
			}
			res.json(todos);
		});
	});

	app.post('/api/todos', function(req, res){

		Todo.create({
			text : req.body.text,
			done : false
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

	//todo app
	app.get('/todo', function(req,res){
		res.sendfile('./public/todo.html'); //load file into single view for Angular to then handle
	});

	//index
	app.get('/', function(req,res){
		res.render('index.ejs'); //ejs index;
	});

	app.get('/login', function(req,res){
		//render and flash in any data if needed
		res.render('login.ejs', {message : req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true // allow flash
	}))

	app.get('/signup', function(req,res){
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true // allow flash
	}));

	app.get('/profile', isLoggedIn, function(req,res){
		res.render('profile.ejs', {
			user : req.user //session user
		});
	});

	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req,res,next){
	//if auth, continue
	if (req.isAuthenticated()){
		return next();
	}

	res.redirect('/');
}