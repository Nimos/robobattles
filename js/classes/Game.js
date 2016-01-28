/*
	Main class of the Game.
	Manages all game objects, the main loop and starting/stopping the game
*/
var Game = function (options, AIs) {
	// setting defaults
	this.options = {
		cWidth: 800,
		cHeight: 600,
		ressources: ["assets/bot-base.png", "assets/bot-gun.png"],
		robotHitpoints: 100
	};

	this.status = 0;
	this.entities = [];
	

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
		var r = new Robot(AIs[ai], 0, this);
		this.addObject(r);
		// place each robot at a random spot at least 100px away from the edges
		r.posX = Math.ceil((this.options.cWidth-200)*Math.random()+100);
		r.posY = Math.ceil((this.options.cHeight-200)*Math.random()+100);
		console.log("Robot No.",ai,"placed at", r.posX, r.posY);
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

	
	this.wrapper = new GameWrapper(this);

	var colisionCheck = this.entities;
	for (var x=0; x<this.entities.length; x++) {
		obj = this.entities[x];
		obj.main();
		if (obj.removeme) {
			this.entities.splice(x--, 1);
		}
		colisionCheck = colisionCheck.slice(1);
		for (var y=0; y<colisionCheck.length; y++) {
			// spherical robots in a vacuum
			obj2 = colisionCheck[y];
			x1 = obj.posX;
			y1 = obj.posY;
			hitbox1 = obj.hitbox;
			x2 = obj2.posX;
			y2 = obj2.posY;
			hitbox2 = obj2.hitbox;

			if (Math.sqrt( (x2-x1) * (x2-x1) + (y2-y1) * (y2-y1) ) <= hitbox1+hitbox2) {
				//console.log("Collision between",obj,"and",obj2);
				obj.collide(obj2);
				obj2.collide(obj);
			}
		}
	};

	this.renderScene();
	requestAnimationFrame(this.main.bind(this));
}

Game.prototype.renderScene = function () {
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(0,0, this.options.cWidth, this.options.cHeight);

	for (obj in this.entities) {
		this.entities[obj].draw(this.ctx);
	}
	
}

Game.prototype.addObject = function (obj) {
	if (obj) this.entities.push(obj);
}