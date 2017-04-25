$(document).ready(function () {
	requirejs(['modules/global', 'modules/ui', 'modules/loader'], function (global, ui, loader) {
		// init the modules
		ui.init(window);
		loader.init();
	});
});
