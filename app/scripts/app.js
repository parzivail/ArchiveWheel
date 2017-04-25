$(document).ready(function () {
	requirejs(['modules/global', 'modules/ui', 'modules/loader'], function (global, ui, loader) {
		// init the modules
		ui.init(window);
		loader.init();

		var vivus = new Vivus('loaderInfo', {file: 'images/archivewheel.svg'}, function () {
		});

		Pace.on("done", function () {
			vivus.setFrameProgress(1);
		});

		Pace.on("update", function (percent) {
			vivus.setFrameProgress(Math.min(percent / 50, 1));
		});
	});
});
