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
var makeGameBoard = function(data, socket) {
	// Container for game board
	$('body').append('<div id="board"></div>');
	
	// Display data in the container in Jeopardy format
	for (cat in data) {
		// Display category
		$('div#board').append('<div id="category" class="' + cat + '"></div>');
		
		// Display name of category
		$('div#category.' + cat).append('<div id="name" class="' + cat + '">' + data[cat].name + '</div>');
		
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
				$('div#category.' + cat).append('<div id="question" class="' + cat + ' ' + data[cat].questions[i].points + '">' + data[cat].questions[i].points + '</div>' );
				
				// Listen for a display change event
				// socket redirects the display by sending a plain URL to the answer page
				socket.on('chdisp', function(page) {
					window.location.replace(page);
				});
			}
		}
	}
};