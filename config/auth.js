var googleAuth = function(serverInfo){



	return {
		'clientID' : '2010424145-tqpue22rs7rfelapu0426h0tnmiv39ii.apps.googleusercontent.com',
		'clientSecret' : 'I6IZNfTX7u70kyez9afaAvfV',
		'callbackURL' : serverInfo.url + '/auth/google/callback'

	};
};

exports.googleAuth = googleAuth;