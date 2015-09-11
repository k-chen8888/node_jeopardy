/* Allows a player to join the game
 * Searches for a game after player enters the ID given by the host
 *
 * Also uses a set of room query tools
 */
module.exports = function(socket, query_tools) {
	socket.on('enter_id', function(data) {
		// Forbid input with incomplete data
		if (!data.host || !data.id) {
			
		} else {
			// Look for the room belonging to the given host
			//var room = query_tools.getRoom(data.host, data.id)
			
			// Verify that the ID was given by the host
			
			// Make sure that there are no players in this room with the given ID
			
			// Output a hash of the room's ID with the user's socketID
			//var room_id = 
			socket.emit('allowed', room_id);
		}
	});
};