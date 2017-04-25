$(document).ready(function () {
	requirejs(['modules/global', 'modules/ui', 'modules/loader'], function (global, ui, loader) {
		// init the modules
		ui.init(window);
		loader.init();

		var vivus = new Vivus('loaderInfo', {file: 'images/archivewheel.svg'}, function () {
		});

		Pace.on("done", function () {
			vivus.setFrameProgress(1);

			const circle = new mojs.Shape({
				stroke: '#FF9C00',
				strokeWidth: {400: 0},
				fill: 'none',
				timeline: {delay: 200},
				scale: {0: 1},
				radius: 400,
				duration: 500,
				easing: 'cubic.out'
			});

			const bgBurst = new mojs.Burst({
				radius: {0: 400},
				angle: 45,
				count: 14,
				duration: 500,
				children: {
					radius: 10,
					fill: '#FF7F00',
					scale: {1: 0, easing: 'quad.in'},
					pathScale: [.8, null],
					degreeShift: [20, null],
					duration: [500, 700],
					easing: 'quint.out'
				}
			});

			var l = $("#loaderInfo");
			var tl = new TimelineLite();
			tl.to(l, 0.3, {scaleX: 2, scaleY: 2});
			tl.to(l, 0.1, {scaleX: 2.5, scaleY: 2.5});
			tl.to(l, 0.2, {scaleX: 0, scaleY: 0});
			tl.call(function () {
				var l2 = $("#container");
				var l3 = $("#possible");
				var tl2 = new TimelineLite();
				tl2.to([l2, l3], 0.2, {scaleX: 0, scaleY: 0});
				tl2.to([l2, l3], 0.1, {scaleX: 1.1, scaleY: 1.1});
				tl2.to([l2, l3], 0.3, {scaleX: 1, scaleY: 1});
				tl2.call(function () {
					l3.css("transform", "translate(0, -50%)");
				});
				tl2.play();
			});
			tl.play();
			bgBurst.play();
			circle.play();
		});

		Pace.on("update", function (percent) {
			vivus.setFrameProgress(Math.min(percent / 50, 1));
		});
	});
});
