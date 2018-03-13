var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	var urlObj = req.urlObj;
  	if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query);
		var op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
		next();
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
			next();
		})
		
	} else {
		next();
	}
};