var googleAuth = function(ip, port){
	return {
		'clientID' : '2010424145-tqpue22rs7rfelapu0426h0tnmiv39ii.apps.googleusercontent.com',
		'clientSecret' : 'I6IZNfTX7u70kyez9afaAvfV',
		'callbackURL' : 'http://' + ip + ':' + port + '/auth/google/callback'

	};
};

exports.googleAuth = googleAuth;