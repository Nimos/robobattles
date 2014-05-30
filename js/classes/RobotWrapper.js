/*
	Representation of a Robot object to be presented to the player's AI.
	Acts as a layer between the AI and the actual game code, so that it cannot directly manipulate or read anything it shouldn't.

	This is the main class the player has to work with
*/
var RobotWrapper = function(r) {
	var robot = r; // "private" 

	this.posX = r.posX;
	this.posY = r.posY;

	this.rotation = r.rotation;
	this.gunRotation = r.gunRotation;

	// Returns the current energy level
	this.getEnergy = function () {
		return robot.energy;
	}

	// Returns the current rotation of the robot in radians
	this.getRotation = function () {
		return robot.rotation;
	}

	// Returns the current rotation of the robot's gun in radians
	this.getGunRotation = function () {
		return robot.gunRotation;
	}

	// Moves the robot *distance* px forward, up to the robot's maximum speed
	this.move = function (distance) {
		if (distance > 0) {
			dist = Math.min(distance, robot.maxSpeed);
		} else {
			dist = Math.max(distance, robot.maxSpeed*-1);
		}
		robot.move(dist);
	};

	// Turns the robot left
	this.turnLeft = function () {
		robot.turn(-0.02);
	};

	// Turns the robot right
	this.turnRight = function () {
		robot.turn(0.02);
	};

	// Turns the robot's gun left
	this.turnGunLeft = function () {
		robot.turnGun(-0.2);
	};

	// Turns the robot's gun  right
	this.turnGunRight = function () {
		robot.turnGun(0.2);
	};

	this.shoot = function () {
		if (robot.energy >= robot.energyPerShot) {
			robot.shoot();
			robot.energy -= robot.energyPerShot;
		}
	}
}
