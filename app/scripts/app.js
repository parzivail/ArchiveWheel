$(document).ready(function () {
	requirejs(['modules/ui', 'modules/loader'], function (ui, loader) {
		// init the modules
		ui.init(window);
		loader.init();
	});
});
