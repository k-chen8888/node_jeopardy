/* Global variables */

// URL parameters
var params;


/* Initialization function */
var init = function() {
	// Get URL parameters
	params = getUrlParam();
	
	// Display content based on URL prarmeters
	if (params['id']) {
		$('body').append('<button id="respond">I know the answer!</button>');
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