var http = require('http');

var dataParser = require('./dataParser');
var serveStatic = require('./serveStatic');
var serveCalculator = require('./serveCalculator');
var serveNotFound = require('./serveNotFound');

var _middlewares = [ dataParser, serveStatic, serveCalculator, serveNotFound ];

var server = http.createServer(function(req, res){
	function exec(req, res, middlewares){
		var first = middlewares[0],
			remaining = middlewares.slice(1),
			next = function(){
				exec(req, res, remaining);
			};
		if (typeof first === 'function'){
			first(req, res, next);
		}
	}
	exec(req, res, _middlewares);
});
server.listen(8080);

