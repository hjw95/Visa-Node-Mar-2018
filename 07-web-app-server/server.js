var http = require('http');
var	path = require('path');
var	fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var calculator = require('./calculator');

//dataParser
//serveStatic
//serveCalculator
//serveNotFound

var staticExtns = ['.html', '.css', '.js', '.png', '.ico', '.jpg', '.json', '.xml', '.txt'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticExtns.indexOf(extn) !== -1;	
}

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	var resource = path.join(__dirname, urlObj.pathname === '/' ? 'index.html' : urlObj.pathname);
	if (isStatic(resource)){
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resource).pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query);
		var op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawData);
			var op = bodyData.op,
				n1 = parseInt(bodyData.n1),
				n2 = parseInt(bodyData.n2);

			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
		})
		
	} else {
		res.statusCode = 404;
		res.end();
		return;
	}
});
server.listen(8080);

