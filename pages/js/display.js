/* Global variables */

// URL parameters
var params;

// socket.io
var socket = io();

// Toasts
var toasts = [];


/* Initialization function */
var init = function() {
	// Until data from socket.io is received, put up toast
	toasts.push(makeToast({
		classes: 'display waiting',
		info: {
			content: '<p id="content">Waiting for data...</p>'
		},
		edible: false
	}));
	
	// Receive data from socket.io
	/*socket.on('displaydata', function(data) {
		// Replace the toast, then delete it after 2 seconds
		toasts[0].obj.removeClass('waiting');
		toasts[0].obj.addClass('ready');
		toasts[0].obj.children('p#content').text('Ready!');
		setTimeout(function(){
			eatToast(toasts[0]);
			toasts = [];
		}, 2000);
		
		// Draw scorecard
		makeScoreCard(data.players);
		
		// Draw display interface, non-clickable objects
		showPlayers(testPlayerInfo);
		showBoard(data.board, false);
	});*/
	
	// Test drawing, base styles off of this
	showBoard(testdata, false);
	showPlayers(testPlayerInfo);
	
	// Resizes everything when the game starts and whenever the screen size changes
	renderJeopardy();
	renderPlayers();
	$(window).resize(function() {
		renderJeopardy();
		renderPlayers();
	});
};


// Test data
var testdata = {
	cat1: {
		name: 'Test1',
		questions: [
			{
				points: 100,
				page: '100.html'
			},
			{
				points: 200,
				page: '200.html'
			},
			{
				points: 300,
				page: '300.html'
			},
			{
				points: 400,
				page: '400.html'
			},
			{
				points: 500,
				page: '500.html'
			},
			{
				points: 666,
				page: '666.html'
			},
		]
	},
	cat2: {
		name: 'Test2',
		questions: [
			{
				points: 100,
				page: '100.html'
			},
			{
				points: 200,
				page: '200.html'
			},
			{
				points: 300,
				page: '300.html'
			},
			{
				points: 400,
				page: '400.html'
			},
			{
				points: 500,
				page: '500.html'
			},
			{
				points: 666,
				page: '666.html'
			},
		]
	},
	cat3: {
		name: 'Test3',
		questions: [
			{
				points: 100,
				page: '100.html'
			},
			{
				points: 200,
				page: '200.html'
			},
			{
				points: 300,
				page: '300.html'
			},
			{
				points: 400,
				page: '400.html'
			},
			{
				points: 500,
				page: '500.html'
			},
			{
				points: 666,
				page: '666.html'
			},
		]
	},
	cat4: {
		name: 'Test4',
		questions: [
			{
				points: 100,
				page: '100.html'
			},
			{
				points: 200,
				page: '200.html'
			},
			{
				points: 300,
				page: '300.html'
			},
			{
				points: 400,
				page: '400.html'
			},
			{
				points: 500,
				page: '500.html'
			},
			{
				points: 666,
				page: '666.html'
			},
		]
	},
	cat5: {
		name: 'Test5',
		questions: [
			{
				points: 100,
				page: '100.html'
			},
			{
				points: 200,
				page: '200.html'
			},
			{
				points: 300,
				page: '300.html'
			},
			{
				points: 400,
				page: '400.html'
			},
			{
				points: 500,
				page: '500.html'
			},
			{
				points: 666,
				page: '666.html'
			},
		]
	},
	cat6: {
		name: 'Test6',
		questions: [
			{
				points: 100,
				page: '100.html'
			},
			{
				points: 200,
				page: '200.html'
			},
			{
				points: 300,
				page: '300.html'
			},
			{
				points: 400,
				page: '400.html'
			},
			{
				points: 500,
				page: '500.html'
			},
			{
				points: 666,
				page: '666.html'
			},
		]
	},
}

var testPlayerInfo = {
	id1: {
		name: "P1",
		score: 0
	},
	id2: {
		name: "P2",
		score: 0
	},
	id3: {
		name: "P3",
		score: 0
	},
	id4: {
		name: "P4",
		score: 0
	},
};