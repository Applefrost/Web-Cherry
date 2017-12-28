/* script.js handles the sending of shell commands to the server */



/* create a new socket object */

var socket = io();



/* socket event listener */

socket.on('response', (data) => {
	console.log(data);
	display(data);
});



/* send the command in `input`, to the server */

$(document).keypress((event) => {
	if (event.which == 13) {
		var command = $('input').val();

		if (command != '') {
			socket.emit('command', {command: command});
			$('input').val('');
		}
	}
});



/* display; displays the servers response in `output` */

var display = (data) => {
	var markup = `<span>${data.stdout}${data.stderr}</span><br>`;
	$('output').append(markup);
} 
