module.exports = function(io, displays, data) {
	for (i in displays) io.to(displays[i]).emit('display_data', data);
};