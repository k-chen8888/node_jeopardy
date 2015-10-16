module.exports = function(socket, gameinfo) {
	// Attaches a handler to store a display in the game
	// Games can store any number of displays
	socket.on('add_disp', function(socket, data) {
		gameinfo[data.room].display.push(socket.id);
	});
};