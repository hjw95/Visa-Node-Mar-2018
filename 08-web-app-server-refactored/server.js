var http = require('http')
	path = require('path');

var dataParser = require('./dataParser');
var serveStatic = require('./serveStatic');
var serveCalculator = require('./serveCalculator');
var serveNotFound = require('./serveNotFound');
var app = require('./app');
var logger = require('./logger');

app.use(dataParser);
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveCalculator);
app.use(serveNotFound);

http.createServer(app).listen(8080);

