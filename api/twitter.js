var request = require('request');


module.exports = function(router) {
	
	router.get('/twitter/token', function(req, res){
		var options = {
			url: 'https://api.twitter'
		}
		res.json({a: a});
	});
}