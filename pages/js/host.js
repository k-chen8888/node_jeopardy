/* Global variables */

// Info variables
var host_id,
	players;

// URL parameters
var params;

// socket.io
var socket = io();


/* Initialization function */
var init = function() {
	// Fastclick, so that PC users don't have an advantage when buzzing in
	var fast = Origami.fastclick;
	fast(document.body);
	
	// Get URL parameters
	params = getUrlParam();
	
	// Display content based on URL prarmeters
	if (params['id'] && params['room']) {
		// Display host interface, which is just a clickable version of the display
		
	} else {
		// Ask host to create a room
		$('body').append('<button id="makegame"></button>');
		$('button#makegame').click(function() {
			socket.emit('makegame', {});
		});
		
		// Set up a listener that redirects the host to the game when it's ready
		socket.on('play', function(data) {
			window.location.replace(window.location.href + '?room=' + data.roomid + '&host=' + data.hostid);
		});
	}
};