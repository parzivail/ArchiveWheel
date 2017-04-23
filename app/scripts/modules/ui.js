/**
 * Created by Colby on 4/21/2017.
 */
define(function () {
	return {
		window: null,
		bgIndex: 0,
		init: function (window) {
			this.window = window;

			this.window.setInterval($.proxy(this.cycleBg, this), 500);
		},
		cycleBg: function () {
			this.bgIndex++;
			this.bgIndex %= 3;

			$(".z0").css("z-index", (this.bgIndex) % 3 - 3);
			$(".z1").css("z-index", (this.bgIndex + 1) % 3 - 3);
			$(".z2").css("z-index", (this.bgIndex + 2) % 3 - 3);
		}
	};
});