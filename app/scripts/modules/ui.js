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
		},
		doAnim: function () {
			const circle = new mojs.Shape({
				stroke: '#FF9C00',
				strokeWidth: {300: 0},
				fill: 'none',
				timeline: {delay: 200},
				scale: {0: 1},
				radius: 300,
				duration: 500,
				easing: 'cubic.out'
			});

			const bgBurst = new mojs.Burst({
				radius: {0: 300},
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
			var l2 = $("#container");
			var tl = new TimelineLite();
			tl.to(l, 0.4, {scaleX: 2, scaleY: 2});
			tl.to(l, 0.2, {scaleX: 2.5, scaleY: 2.5});
			tl.call(function () {
				bgBurst.play();
				circle.play();
			});
			tl.to(l, 0.3, {scaleX: 0, scaleY: 0});
			tl.call(function () {
				$("#loaderInfo").addClass("hidden");
				global.sound.play();
			});
			tl.to(l2, 0.2, {scaleX: 1.1, scaleY: 1.1});
			tl.to(l2, 0.4, {scaleX: 1, scaleY: 1});
			var poss = $("#possible");
			tl.call(function () {
				global.status("Done");

				poss.append("<div><b>Possibilities:</b></div>");
				$.each(global.demos, function (idx, item) {
					var t = item.info.title;
					if (t.length > 40)
						t = t.substring(0, 40) + "...";

					poss.append('<div><i class="material-icons">chevron_right</i> ' + t + "</div>");
				});

				poss.css("left", -poss.width() + "px");
			});
			tl.add(new TweenLite.to(poss, 0.5, {left: 10, ease: Power3.easeOut}));
			tl.play();
		},
		showDemo: function () {
			$(".title").text(global.demos[global.currentIndex].info.title);
			$(".description").text(global.demos[global.currentIndex].info.description);
			$(".downloadCount").text(global.demos[global.currentIndex].meta.item.downloads);
			$(".downloadCountWeek").text(global.demos[global.currentIndex].meta.item.week);
			$("#captionImg").attr("src", global.demos[global.currentIndex].getFullImageUrl());
			$("#captionImg").attr("height", 450);

			TweenLite.fromTo($(".item"), 0.5, {scaleX: 0, scaleY: 0}, {scaleX: 1, scaleY: 1});
			TweenLite.fromTo($(".overlay"), 1, {opacity: 0}, {opacity: 0.9});
		}
	};
});
