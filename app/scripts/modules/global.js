/**
 * Created by Colby on 4/22/2017.
 */
define(function () {
	var viewWidth = 850,
		viewHeight = 850,
		viewCenterX = viewWidth * 0.5,
		viewCenterY = viewHeight * 0.5,
		drawingCanvas = document.getElementById("drawing_canvas"),
		ctx,
		timeStep = (1 / 60),
		time = 0;

	var ppm = 24, // pixels per meter
		physicsWidth = viewWidth / ppm,
		physicsHeight = viewHeight / ppm,
		physicsCenterX = physicsWidth * 0.5,
		physicsCenterY = physicsHeight * 0.5;

	var world;

	var wheel,
		arrow,
		mouseBody,
		mouseConstraint;

	var arrowMaterial,
		pinMaterial,
		contactMaterial;

	var wheelSpinning = false,
		wheelStopped = true;

	var particles = [];

	var demos = [];

	return {
		viewWidth: viewWidth,
		viewHeight: viewHeight,
		viewCenterX: viewCenterX,
		viewCenterY: viewCenterY,
		drawingCanvas: drawingCanvas,
		ctx: ctx,
		timeStep: timeStep,
		time: time,
		ppm: ppm,
		physicsWidth: physicsWidth,
		physicsHeight: physicsHeight,
		physicsCenterX: physicsCenterX,
		physicsCenterY: physicsCenterY,
		world: world,
		wheel: wheel,
		arrow: arrow,
		mouseBody: mouseBody,
		mouseConstraint: mouseConstraint,
		arrowMaterial: arrowMaterial,
		pinMaterial: pinMaterial,
		contactMaterial: contactMaterial,
		wheelSpinning: wheelSpinning,
		wheelStopped: wheelStopped,
		//particles: particles,
		demos: demos,
		sound: null,
		currentIndex: 0,
		get: function (site, callback) {
			// If no url was passed, exit.
			if (!site) {
				return false;
			}

			// Request that YSQL string, and run a callback function.
			// Pass a defined function to prevent cache-busting.
			$.getJSON("https://cors-anywhere.herokuapp.com/" + site, function (data) { // TODO: self-host a cors-anywhere instance
				// If we have something to work with...
				if (data) {
					callback(data);
				}
				// Else, Maybe we requested a site that doesn't exist, and nothing returned.
				else throw new Error('Nothing returned from getJSON.');
			});
		},
		status: function (status) {
			$("#loadStatus").text(status);
		}
	}
});
