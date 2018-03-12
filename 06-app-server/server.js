var http = require('http');
var	path = require('path');
var	fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var calculator = require('./calculator');

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var queryData = querystring.parse(urlObj.query);
	var op = queryData.op,
		n1 = parseInt(queryData.n1),
		n2 = parseInt(queryData.n2);

	var result = calculator[op](n1, n2);
	res.write(result.toString());
	res.end();
});
server.listen(8080);

