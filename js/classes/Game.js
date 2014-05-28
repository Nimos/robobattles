/*
	Main class of the Game.
	Manages all game objects, the main loop and starting/stopping the game
*/
var Game = function (options, AIs) {
	this.options = {
		cWidth: 800,
		cHeight: 600,
		ressources: ["/assets/bot-base.png", "/assets/bot-gun.png"]
	};

	this.status = 0;
	this.robots = [];
	

	for (var key in options) {
		this.options[key] = options[key];
	}
	
	this.init(AIs);
}

Game.prototype.init = function (AIs) {

	console.log("Initiating");
	console.log('loading stuffs');
	ressourceCache.load(this.options.ressources);

	console.log("creating canvas");
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.canvas.width = this.options.cWidth;
	this.canvas.height = this.options.cHeight;

	console.log("adding canvas");
	$('#game').append(this.canvas);

	console.log("Loading Robots");
	for (var ai in AIs) {
		var r = new Robot(AIs[ai], 0, this.options);
		this.robots.push(r);
	}

	console.log("Placing robots");
	for (r in this.robots) {
		// place each robot at a random spot at least 100px away from the edges
		this.robots[r].posX = Math.ceil((this.options.cWidth-200)*Math.random()+100);
		this.robots[r].posY = Math.ceil((this.options.cHeight-200)*Math.random()+100);
		console.log("Robot No.",r,"placed at", this.robots[r].posX, this.robots[r].posY);
	};

	console.log("setting up stuff");
	//this.counter = 0;

	console.log("starting game");
	this.main();


}

Game.prototype.main = function () {

	if (status == 0) {
		var s = ressourceCache.getStatus();
		console.log("Loading% = ",s);
		if (s == 100) status=1;
		
		requestAnimationFrame(this.main.bind(this));
		return;
	}

	this.robots.forEach( function (r) {
		interf = new RobotInterface(r);
		r.ai.main(interf, {});
	});

	this.renderScene();
	requestAnimationFrame(this.main.bind(this));
}

Game.prototype.renderScene = function () {
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(0,0, this.options.cWidth, this.options.cHeight);

	for (robot in this.robots) {
		this.robots[robot].draw(this.ctx);
	}
	
}