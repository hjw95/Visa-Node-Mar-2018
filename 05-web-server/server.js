var http = require('http');
var	path = require('path');
var	fs = require('fs');

var server = http.createServer(function(req, res){
	var resource = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resource).pipe(res);
});
server.listen(8080);

