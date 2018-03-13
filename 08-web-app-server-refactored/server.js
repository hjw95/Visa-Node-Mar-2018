var http = require('http');

var dataParser = require('./dataParser');
var serveStatic = require('./serveStatic');
var serveCalculator = require('./serveCalculator');
var serveNotFound = require('./serveNotFound');
var app = require('./app');

app.use(dataParser);
app.use(serveStatic);
app.use(serveCalculator);
app.use(serveNotFound);

http.createServer(app).listen(8080);

