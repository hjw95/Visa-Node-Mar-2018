
module.exports = function(req, res, next){
	console.log('[@serveNotFound - serving 404]');
	res.statusCode = 404;
	res.end();
	next();
};