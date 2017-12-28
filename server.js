/* server.js handles the web server, socket messages and the execution of shell commands. */



var exec = require('child_process').exec;
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



/* routing; clients can only access the `/public` directory */

app.use(express.static(__dirname + '/public'));



app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/client/index.html');
});



/* socket event listeners */

io.on('connection', (socket) => {
	log('a new client connected', socket);

	socket.on('command', (data) => {
		log('a command was received', data); 
		output(data.command, socket);
	});
});



/* output; execute a given command and return the output */

var output = (command, socket) => {
	exec(command, (error, stdout, stderr) => {
		var data = {error: error, stdout: stdout, stderr: stderr};
		socket.emit('response', data);
	});
}



/* start the web server on port 80 and wait for connections */

server.listen(80, () => {
	log('starting server on port 80', '');
});



/* miscellaneous functions */

var timestamp = () => {
	var stamp = Date().substring(0, 24);
	return stamp;
}



var log = (message, data) => {
	console.log(`\n@ ${timestamp()}	${message}\n${data}`);
}