/* Required packages */

// express.js
var Express = require('express'),
	app = Express();

// HTTP Server
var http = require('http').Server(app),
	port = 8080;

// socket.io
var io = require('socket.io')(http);


/* Jeopardy game interface */

// Games go here for now, indexed by a randomly generated roomID
var games = {};

// Static file middleware
app.use(Express.static('pages'));

// Main display for game
// Project this where all players can see	
app.get('/', function(req, res) {
	
});

// Host's interface
app.get('/host', function(req, res) {
	
});

// Player's interface
app.get('/player', function(req, res) {
	
});

// Listener for socket.io
io.on('connect', function(socket) {
	// Nothing to do here!
});


/* Listen for requests
 */

http.listen(port, function() {
	console.log('Listening on *:' + port);
});