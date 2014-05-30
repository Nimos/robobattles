/*
	Robot.js

	The Robot object represents a players' robot.
	It handles all game variables related to it (e.g. position, hitpoints, ...) and manages drawing and reaction to collisions.
*/
var Robot = function (ai, teamcolor, gameEngine) {
	if (!teamcolor) teamcolor = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];

	this.gameEngine = gameEngine;
	this.gameOptions = gameEngine.options;

	// Some configurable stuff
	this.maxSpeed = 5;
	this.bulletSpeed = 8;
	this.damageDealt = 20;
	this.energyPerShot = 20;
	// end
 

	this.rotation = 0;
	this.gunRotation = 0;

	this.posX = 0;
	this.posY = 0;

	this.sprite = ressourceCache.get("assets/bot-base.png");
	this.gunSprite = ressourceCache.get("assets/bot-gun.png");

	this.ai = ai;

	this.hitpoints = this.gameOptions.robotHitpoints;

	this.energy = 100;

	this.hitbox = 16;
};

Robot.prototype.main = function () {
	console.log("main");
	this.energy= Math.min(this.energy+1, 100);
	
	interf = new RobotWrapper(this);
	this.ai.main(interf, {});
}

Robot.prototype.draw = function (ctx) {
		//robot
		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.rotate(this.rotation);
		ctx.drawImage(this.sprite, this.sprite.height/2*-1, this.sprite.height/2*-1);
		ctx.restore();

		// gun
		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.rotate(this.gunRotation);
		ctx.drawImage(this.gunSprite, this.gunSprite.height/2*-1, this.gunSprite.height/2*-1);
		ctx.restore();

		//health and energy bars
		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.fillStyle="#444444";
		ctx.fillRect(this.sprite.width/2*-1, (this.sprite.height/-2)-16, this.sprite.width, 4);
		ctx.fillStyle="#444444";
		ctx.fillRect(this.sprite.width/2*-1, (this.sprite.height/-2)-11, this.sprite.width, 4);

		var energy=this.sprite.width * (this.energy / 100);
		var percentageHP=(this.hitpoints / this.gameOptions.robotHitpoints);

		/*var red= Math.floor(255*(1-percentageHP));
		var grn= Math.floor(255*percentageHP);
		var col = "#"+red.toString(16)+grn.toString(16)+"00";
		ctx.fillStyle=col;
		*/

		ctx.fillStyle="#00CC00";
		if (percentageHP < 0.6) ctx.fillStyle="#CCCC00";
		if (percentageHP < 0.3) ctx.fillStyle="#CC4400";
		if (percentageHP < 0.1) ctx.fillStyle="#CC0000";

		
		ctx.fillRect(this.sprite.width/2*-1, (this.sprite.height/-2)-16, percentageHP*this.sprite.width, 4);
		ctx.fillStyle="#00CCCC";
		ctx.fillRect(this.sprite.width/2*-1, (this.sprite.height/-2)-11, energy, 4);		

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

Robot.prototype.shoot = function () {
	this.gameEngine.addObject(new Projectile(this, this.posX, this.posY, this.gunRotation, this.bulletSpeed, Projectile.damage, this.damageDealt));
}

Robot.prototype.collide = function (obj) {

}