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
		enableSound: false,
		sound: null,
		currentIndex: 0,
		status: function (status) {
			$("#loadStatus").text(status);
		},
		loadImage: function (url, altUrl) {
			var timer;

			function clearTimer() {
				if (timer) {
					clearTimeout(timer);
					timer = null;
				}
			}

			function handleFail() {
				this.onload = this.onabort = this.onerror = function () {
				};
				clearTimer();
				if (this.complete) return;
				console.log("Image", url, "surpasses smooth loading time, loading alt instead");
				this.src = altUrl;
			}

			var img = new Image();
			img.onerror = img.onabort = handleFail;
			img.onload = function () {
				clearTimer();
			};
			img.src = url;
			timer = setTimeout(function (theImg) {
				return function () {
					handleFail.call(theImg);
				};
			}(img), 3000);
			return (img);
		}
	}
});
