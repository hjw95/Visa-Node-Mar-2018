var fs = require('fs');

var stream = fs.createReadStream('test.txt', {encoding : 'utf8'});

stream.on('open', function(){
	console.log('file opened for reading');
});

var readCount = 0;

stream.on('data', function(chunk){
	//console.log(chunk);
	++readCount;
});

stream.on('end', function(){
	console.log('end of stream reached');
});

stream.on('close', function(){
	console.log('stream is closed');
	console.log('job done with readCount = ', readCount);
});

stream.on('error', function(err){
	console.log(err);
});

stream.pipe(process.stdout);