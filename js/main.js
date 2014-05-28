
function startGame() {
	console.log("Starting test run");
	eval("robot1 = "+ $('textarea#player1').val());
	eval("robot2 = "+ $('textarea#player2').val());
	gaem = new Game("", [robot1, robot2]);
}