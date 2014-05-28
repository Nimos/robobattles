/*
	Represents projectiles, mainly bullets for now, but includes possibly different effects.
*/
Projectile = function (owner, x, y, direction, speed, effect, power) {
	this.owner;
	this.posX = x;
	this.posY = y;

	this.dirX = Math.sin(direction)*speed;
	this.dirY = -Math.cos(direction)*speed;

	this.effect = effect;
	this.power = power;

	this.hitbox = 2;

	this.direction = direction;

	this.immunityFrames = 10;

	this.move = function (x, y) {
		if (this.posX+ x <= 800 && this.posX+ x >= 0) {this.posX+= x} else {this.remove()};
		if (this.posY+ y <= 600 && this.posY+ y >= 0) {this.posY+= y} else {this.remove()};
	}
}

Projectile.prototype.main = function () {
	this.move(this.dirX, this.dirY);
	if (this.immunityFrames) return this.immunityFrames--;
};

Projectile.prototype.collide = function (obj) {
	if (!this.immunityFrames) {
		this.remove();
		this.effect(obj, this.power);
	}
}

Projectile.prototype.draw = function (ctx) {
	ctx.save();
	ctx.translate(this.posX, this.posY);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(-1,-1,2,2);
	ctx.restore();
}

Projectile.prototype.remove = function () {
	this.removeme = true;
}

Projectile.damage = function (obj, amount) {
	if (obj instanceof Robot) {
		obj.hitpoints -= amount;
	}
}