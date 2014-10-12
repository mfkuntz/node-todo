var localStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');


module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err,user);
		});
	});

	passport.use('local-signup', new localStrategy({

		//default is username, pass
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true //pass back back entire reques to callback
	},
	function(req, email, password, done){

		//asynch, User.findOne won't fire until data is sent back
		process.nextTick(function(){

			User.findOne({'local.email' : email}, 
				function(err, user){

					if (err)
						return done(err);

					if (user){
						return done(null, false, req.flash('signupMessage', 'That email is alerady in use'));
					}else{

						var newUser = new User();
						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);

						newUser.save(function(err){
							if (err)
								throw err;

							return done(null, newUser);
						});
					}
			});
		});
	}
	));

	passport.use('local-login', new localStrategy({
		//default is username, pass
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true //pass back back entire reques to callback
	},
	function(req, email, password, done){

		User.findOne({'local.email' : email},
			function(err, user){

				if (err)
					return done(err);

				if (!user){
					return done(null, false, req.flash('loginMessage', 'No User found'));
				}

				if (!user.validPassword(password)){
					return done(null, false, req.flash('loginMessage', 'Wrong Password'));	
				}

				return done(null, user);
			});
	}
	));
};