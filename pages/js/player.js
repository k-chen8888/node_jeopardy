/* Global variables */

// URL parameters
var params;

// Toasts
var toasts = [];


/* Initialization function */
var init = function() {
	// Get URL parameters
	params = getUrlParam();
	
	// Display content based on URL prarmeters
	if (params['id']) {
		$('body').append('<button id="respond">I know the answer!</button>');
		
		// Button notifies server that player is ready to answer
		// Allow 15 seconds to answer before deducting points
		$('button#respond').click(function() {
			toasts.push(makeToast({
				classes: 'delay',
				info: {
					content: '<p id="content">You have 15 seconds to answer this question...</p>',
					time: 15,
					update: function() {
						this.time -= 1;
						if (this.time > 0) this.content = 'You have ' + this.time + ' seconds to answer this question...';
						else this.content = 'You are out of time';
						
						return this.content;
					}
				}
			}));
		});
	} else {
		$('body').append(
			'<form id="joingame">' +
				'Enter the ID given to you by the host:</br>' +
				'<input type="text" name="gameid">' +
				'<input type="submit" value="Submit">' +
			'</form>'
		);
	}
};