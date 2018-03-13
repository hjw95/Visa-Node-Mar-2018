var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
  	if (req.urlObj.pathname === '/calculator'){
		var inputData = req.method === 'GET' ? req.queryData : req.bodyData;
		var op = inputData.op,
			n1 = parseInt(inputData.n1),
			n2 = parseInt(inputData.n2);

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
		next();
	} else {
		next();
	}
};