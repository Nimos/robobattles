/*
	Representation of a Robot object to be presented to the player's AI.
	Acts as a layer between the AI and the actual game code, so that it cannot directly manipulate or read anything it shouldn't.

	This is the main class the player has to work with
*/
var RobotWrapper = function(r, readonly) {
	var robot = r; // "private" 

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

	// returns the X position
	this.getX = function () {
		return robot.posX;
	}

	// returns the Y position
	this.getY = function () {
		return robot.posY;
	}

	// true if both wrappers wrap the same robot
	this.equals = function (wrapper) {
		return wrapper._equals(robot);
	}
	this._equals = function (robot2) {
		return robot == robot2;
	}


	if (readonly) return;
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
