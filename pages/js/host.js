/* Global variables */

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
	if (params['room'] && params['host']) {
		// Note to host: DO NOT REVEAL YOUR ID!!
		
		// Makes it look like there's something going on, in case players take forever
		toasts.push(makeToast({
			classes: 'waiting',
			info: {
				// Parameters that the function can actually use
				content: '<p id="content">Waiting for players to join...</p>',
			},
			
			// Deleted when socket.io says so
			edible = false
		}));
		
		// Wait for all players to join
		socket.on('gameready', function(data) {
			// Replace the toast, then delete it after 2 seconds
			toasts[0].obj.removeClass('waiting');
			toasts[0].obj.addClass('ready');
			toasts[0].obj.children('p#content').text('Ready!');
			setTimeout(function(){
				eatToast(toasts[0]);
				toasts = [];
			}, 2000);
			
			// Display host interface, which is just a clickable version of the display
			makeGameBoard(data, socket);
		});
	} else {
		// Ask host to create a room
		$('body').append(
			'<form id="makegame">' +
				'Host\'s Name:<br>' +
				'<input type="text" name="hostname"><br><br>' +
				'Game Name:<br>' +
				'<input type="text" name="gamename"><br><br>' +
				'Number of Players (2-8):<br>' +
				'<input type="number" name="numplayers" min="2" max="8"><br><br>' +
				'<button id="makegame">New Jeopardy Game</button>' +
			'</form>'
		);
		$('button#makegame').click(function() {
			socket.emit('makegame', {
				hostName: $('input[name=hostname]').val(),
				gameName: $('input[name=gamename]').val(),
				numPlayers: $('input[name=numplayers]').val()
			});
		});
		
		// Set up a listener that redirects the host to the game when it's ready
		socket.on('play', function(data) {
			window.location.replace(window.location.href + '?room=' + data.roomid + '&host=' + data.hostid);
		});
	}
};