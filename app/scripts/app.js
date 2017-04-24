$(document).ready(function () {
	requirejs(['modules/global', 'modules/ui', 'modules/loader'], function (global, ui, loader) {
		// init the modules
		ui.init(window);
		loader.init();

		var prog = $(".pace-progress"),
			vivus = new Vivus('loaderInfo', {file: 'images/archivewheel.svg', start: "manual"}, function () {
			});

		Pace.on("done", function () {
			console.log("Done animating logo");
			vivus.setFrameProgress(1);
		});

		Pace.on("update", function (percent) {
			vivus.setFrameProgress(percent / 80);
		});
	});
});
