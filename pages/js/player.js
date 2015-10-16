/* Global variables */

// URL parameters
var params;

// socket.io
var socket = io();

// Game info
//var 

// Toasts
var toasts = [];


/* Initialization function */
var init = function() {
	// Fastclick, so that PC users don't have an advantage when buzzing in
	var fast = Origami.fastclick;
	fast(document.body);
	
	// Get URL parameters
	params = getUrlParam();
	
	// Display content based on URL prarmeters
	if (params['id']) {
		document.title = 'Are You Ready to Play Jeopardy?';
		$('body').append('<button id="respond">I know the answer!</button>');
		
		// Button notifies server that player is ready to answer
		// Allow 15 seconds to answer before deducting points
		$('button#respond').click(function() {
			// Ignore the button if there is a toast up
			if ($('p#content').length > 0) return false;
			
			toasts.push(makeToast({
				classes: 'delay',
				info: {
					// Parameters that the function can actually use
					content: '<p id="content">You have 15 seconds to answer this question...</p>',
					update: function(change) {
						this.time -= 1;
						if (this.time > 0) change.text('You have ' + this.time + ' seconds to answer this question...');
						else this.content = change.text('You are out of time');
					},
					
					// Other parameters
					time: 15
				}
			}));
			
			return false;
		});
	} else {
		document.title = 'Welcome, New Challenger!';
		
		$('body').append(
			'<form id="joingame">' +
				'Enter the ID for the room</br>' +
				'<input type="text" name="roomid"><br><br>' +
				'Enter the ID given to you by the host:</br>' +
				'<input type="text" name="playerid"><br><br>' +
				'<input type="submit" value="Submit">' +
			'</form>'
		);
		
		// Form submits the ID to server via socket.io
		$('form#joingame').submit(function(e) {
			// Do not POST
			e.preventDefault();
			
			// Send the form data
			socket.emit('join', {
				room: $('input[name=roomid]').val(),
				player: $('input[name=playerid]').val()
			});
			
			return false;
		});
		
		// Sets up a listener to redirect to the room on receiving a verification from the server
		socket.on('allowed', function(data) {
			window.location.replace(window.location.href + '?id=' + data);
		});
	}
};