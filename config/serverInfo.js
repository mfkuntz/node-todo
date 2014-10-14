var hostDNSName = 'http://todo-mfkuntz.rhcloud.com';
const localHost = '127.0.0.1';
module.exports = function(){

	var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

	if(ip == localHost){

		return {
			ip : ip,
			port : port,
			url : 'http://' + ip + ':' + port,
			local : true
		};

	}else{
		return{
			ip : ip,
			port : port,
			url : hostDNSName,
			local : false
		};
	}

};