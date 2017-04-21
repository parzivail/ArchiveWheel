$(document).ready(function () {
	requirejs(['modules/ui'], function (ui) {
		// init the modules
		ui.init(window);
	});
});
