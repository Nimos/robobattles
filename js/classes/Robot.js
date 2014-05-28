/*
	Robot.js

	The Robot object represents a players' robot.
	It handles all game variables related to it (e.g. position, hitpoints, ...) and manages drawing and reaction to collisions.
*/
var Robot = function (ai, teamcolor, gameOptions) {
	if (!teamcolor) teamcolor = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];

	this.gameOptions = gameOptions;

	this.maxSpeed = 5;
	this.rotation = 0;
	this.gunRotation = 0;

	this.posX = 0;
	this.posY = 0;

	this.sprite = ressourceCache.get("/assets/bot-base.png");
	this.gunSprite = ressourceCache.get("/assets/bot-gun.png");

	this.ai = ai;
};

Robot.prototype.draw = function (ctx) {
		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.rotate(this.rotation);
		ctx.drawImage(this.sprite, this.sprite.height/2*-1, this.sprite.height/2*-1);
		ctx.restore();

		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.rotate(this.gunRotation);
		ctx.drawImage(this.gunSprite, this.gunSprite.height/2*-1, this.gunSprite.height/2*-1);
		ctx.restore();
};


Robot.prototype.move =  function (dist) {
		x = Math.cos(this.rotation);
		y = Math.sin(this.rotation);
		
		
		if (this.posX+ x*dist <= this.gameOptions.cWidth && this.posX+ x*dist >= 0) this.posX+= x*dist;
		if (this.posY+ y*dist <= this.gameOptions.cHeight && this.posY+ y*dist >= 0) this.posY+= y*dist;
};


Robot.prototype.turn = function (angle) {
	this.rotation += angle;

	if (this.rotation >= 360*(Math.PI / 180) || this.rotation <= -360*(Math.PI / 180)) this.rotation = 0;
} 

Robot.prototype.turnGun = function (angle) {
	this.gunRotation += angle;

	if (this.gunRotation >= 360*(Math.PI / 180) || this.gunRotation <= -360*(Math.PI / 180)) this.gunRotation = 0;
} 
