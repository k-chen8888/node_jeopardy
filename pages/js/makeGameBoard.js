/* Constructs a game board given data
 * Accepted format:
 * 	{
 * 		category1: {name: "", questions: [{points: number, page: "", double: Boolean}]
 * 		...etc... (limit: 6)
 * 	}
 * 
 * 	Standard rules apply (no duplicate point values in a category, etc.)
 * 	@param(socket) is an optional argument; pass this in if the display is meant to be clicked (this happens on the host's side)
 */
var showBoard = function(data, socket) {
	// Container for game board
	$('body').append('<div id="board"></div>');
	
	// Display data in the container in Jeopardy format
	for (cat in data) {
		// Display category
		$('div#board').append('<div id="category" class="' + cat + '"></div>');
		
		// Display name of category
		$('div#category.' + cat).append('<div id="name" class="' + cat + '"><h2>' + data[cat].name + '</h2></div>');
		
		// Display point values for all categories
		for (var i = 0; i < data[cat].questions.length; i++) {
			// Make a <div> to display or a <button> to click on
			if (socket) {
				$('div#category.' + cat).append( '<button id="question" class="' + cat + ' ' + data[cat].questions[i].points + '">' + data[cat].questions[i].points + '</button>' );
				
				// Set up the button to redirect to the link for the question page
				$('button#question.' + cat + '.' + data[cat].questions[i].points).click(function() {
					// Host sends the signal for the display to change
					socket.emit('chdisp', data[cat].questions[i].page);
					
					// Host is also redirected to the question page, but with the answer revealed already
					// socket redirects host when ready by sending a modified URL to the question page
					socket.on('chhost', function(page) {
						window.location.replace(page);
					});
				});
			} else {
				// Just show the point values with no links
				$('div#category.' + cat).append('<div id="question" class="' + cat + ' ' + data[cat].questions[i].points + '"><h2>' + data[cat].questions[i].points + '</h2></div>' );
				
				// Listen for a display change event
				// socket redirects the display by sending a plain URL to the answer page
				//socket.on('chdisp', function(page) {
				//	window.location.replace(page);
				//});
			}
		}
	}
};


/* Display player names and scores at the top of the board
 */
var showPlayers = function(data) {
	// Container for player data
	$('body').append('<div id="players"></div>');
	
	// Write all player data to container
	for(player in data) {
		$('div#players').append('<div id="player" class="' + player + '">' + '<h3 id="name">' + data[player].name + '</h3>' + '<h3 id="score">' + data[player].score + '</h3>' + '</div>');
	}
};


/* Sets the alignment and spacing of the player container
 */
var renderPlayers = function() {
	// Scale the width based on number of elements and size of parent
	var numplayers = $('div#player').length;
	var width = ($('div#players').width()) * 1.0 / numplayers;
	
	for(var i = 0; i < numplayers; i++) {
		// Set individual width and height
		$( $('div#player')[i] ).width( ( width - (numplayers + 2) * parseInt( $( $('div#player')[i] ).css('margin-left') ) ) + "px" );
		$( $('div#player')[i] ).height($('div#players').height() + "px");
	}
};


/* Sets the alignment and spacing so that the board looks like a jeopardy board
 */
var renderJeopardy = function() {
	// Scale the width based on number of elements and size of parent
	var numcat = $('div#category').length;
	var width = $('div#board').width() * 1.0 / numcat;
	
	for(var i = 0; i < numcat; i++) {
		// Set individual width and height
		$( $('div#category')[i] ).width(width + "px");
		$( $('div#category')[i] ).height( $('div#board').outerHeight() * 1.0 );
		
		// Change height of the categories
		var children = $('div#category').children();
		for(var j = 0; j < children.length; j++) {
			// Set child height
			$( children[j] ).height( $('div#board').outerHeight() / 10 );
			
			// Center child's text
			$( children[j] ).css({
				"line-height" : $( children[j] ).height() + 'px'
			});
		}
	}
};