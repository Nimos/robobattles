GameWrapper = function (g) {
	var game = g;
	this.getRobots = function () {
		result = [];
		for (x=0;x < game.entities.length;x++) {
			var e = game.entities[x];
			if (e instanceof Robot) {
				result.push(e.readOnlyWrapper);
			}
		}
		return result;
	}
}