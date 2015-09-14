/* Global variables */

// URL parameters
var params;

// socket.io
var socket = io();

// Toasts
var toasts = [];


/* Initialization function */
var init = function() {
	// Until data from socket.io is received, put up toast
	toasts.push(makeToast({
		classes: 'display waiting',
		info: {
			content: '<p id="content">Waiting for data...</p>'
		}
	});
	
	// Receive data from socket.io
	/*socket.on('displaydata', function(data) {
		// Replace the toast, then delete it after 2 seconds
		toasts[0].obj.removeClass('waiting');
		toasts[0].obj.addClass('ready');
		toasts[0].obj.children('p#content').text('Ready!');
		setTimeout(function(){
			eatToast(toasts[0]);
			toasts = [];
		}, 2000);
		
		// Draw display interface, non-clickable objects
		makeGameBoard(data, false);
	});*/
	
	// Test drawing, base styles off of this
};