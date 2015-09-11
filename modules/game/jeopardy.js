/* Object definition for the game itself
 * For now, it is controlled by the host
 */
module.exports = function(options) {
	var exports = {};
	
	// General information for the game
	exports.name = options.name || 'My Jeopardy Game'; // Name of the jeopardy game
	exports.data = options.data || '/sample';		   // Location of game pages (relative to location of index.js)
	exports.numPlayers = options.numPlayers || 2;	   // Number of players
	
	// Player identification
	exports.host = Math.floor(Math.random() * (Math.pow(32, 4) - 1 - Math.pow(32, 3)) + Math.pow(32, 3)).toString(32);
	exports.players = [];
	for(var i = 0; i < exports.numPlayers; i++) exports.players.push( Math.floor(Math.random() * (Math.pow(32, 4) - 1 - Math.pow(32, 3)) + Math.pow(32, 3)).toString(32) );
	
	return exports;
};