/**
 * Created by Colby on 4/21/2017.
 */
define(['modules/global'], function (global) {
	return {
		window: null,
		bgIndex: 0,
		init: function (window) {
			this.window = window;

			//this.window.setInterval($.proxy(this.cycleBg, this), 500);

			$("#spinAgain").click(function () {
				location.reload();
			});

			$("#play").click(function () {
				console.log(global.demos[global.currentIndex]);
				window.open("https://archive.org/details/" + global.demos[global.currentIndex].info.identifier);
			});

			var vivus = new Vivus('loaderInfo', {file: 'images/archivewheel.svg'}, function () {
			});

			Pace.on("done", function () {
				vivus.setFrameProgress(1);
			});

			Pace.on("update", function (percent) {
				vivus.setFrameProgress(Math.min(percent / 50, 1));
			});
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
