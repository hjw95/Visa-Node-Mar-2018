var http = require('http');

var dataParser = require('./dataParser');
var serveStatic = require('./serveStatic');
var serveCalculator = require('./serveCalculator');
var serveNotFound = require('./serveNotFound');

var server = http.createServer(function(req, res){
	dataParser(req);
	serveStatic(req, res);
	serveCalculator(req, res);
	serveNotFound(res);
});
server.listen(8080);

