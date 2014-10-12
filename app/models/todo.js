
var mongoose = require('mongoose');

//model
module.exports = mongoose.model('Todo', {
	text : String, 
	done : Boolean
});