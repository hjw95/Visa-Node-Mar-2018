var fs = require('fs'),
	path = require('path');

var staticExtns = ['.html', '.css', '.js', '.png', '.ico', '.jpg', '.json', '.xml', '.txt'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticExtns.indexOf(extn) !== -1;	
}

module.exports = function(req, res){
	var resource = path.join(__dirname, req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname);
	if (isStatic(resource)){
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resource).pipe(res);
	}
};