/**
 * Created by Colby on 4/21/2017.
 */
define(['modules/global'], function (global) {
	return {
		window: null,
		bgIndex: 0,
		init: function (window) {
			this.window = window;

			$("#miss").click($.proxy(this.showMissed, this));
			$("#missBack").click(this.hideMissed);

			//this.window.setInterval($.proxy(this.cycleBg, this), 500);

			$("#spinAgain").click(function () {
				location.reload();
			});

			$("#play").click(function () {
				window.open("https://archive.org/details/" + global.demos[global.currentIndex].info.identifier);
			});

			var vivus = new Vivus('loaderInfo', {file: 'images/archivewheel.svg'}, function () {
			});
			$("#loaderInfo").removeClass("hidden");

			// Pace.on("done", function () {
			// 	vivus.setFrameProgress(1);
			// });
			//
			// Pace.on("update", function (percent) {
			// 	vivus.setFrameProgress(Math.min(percent / 50, 1));
			// });
		},
		cycleBg: function () {
			this.bgIndex++;
			this.bgIndex %= 3;

			$(".z0").css("z-index", (this.bgIndex) % 3 - 3);
			$(".z1").css("z-index", (this.bgIndex + 1) % 3 - 3);
			$(".z2").css("z-index", (this.bgIndex + 2) % 3 - 3);
		},
		doAnim: function () {
			var l2 = $("#container");

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
				},
				onComplete: function () {
					var tl = new TimelineLite();
					tl.to(l2, 0.5, {scaleX: 1.1, scaleY: 1.1});
					tl.to(l2, 0.5, {scaleX: 1, scaleY: 1});
					tl.play();
				}
			});

			global.status("Done");

			var l = $("#loaderInfo");
			var tl = new TimelineLite();
			tl.addDelay(3);
			tl.to(l, 0.2, {scaleX: 1.5, scaleY: 1.5});
			tl.call(function () {
				bgBurst.play();
				circle.play();
			});
			tl.to(l, 0.3, {scaleX: 0, scaleY: 0});
			tl.call(function () {
				$("#loaderInfo").addClass("hidden");
				if (global.enableSound)
					global.sound.play();
			});
			tl.play();
		},
		showDemo: function () {
			$(".title").text(global.demos[global.currentIndex].info.title);
			$(".description").text(global.demos[global.currentIndex].info.description);
			$("#captionImg").attr("src", global.demos[global.currentIndex].getFullImageUrl());
			$("#captionImg").attr("height", 450);

			TweenLite.fromTo($(".item"), 0.5, {scaleX: 0, scaleY: 0}, {scaleX: 1, scaleY: 1});
			TweenLite.fromTo($(".overlay"), 1, {opacity: 0}, {opacity: 0.9});
		},
		constructMissedDemoList: function () {
			var list = $("#missedList");
			list.html("");

			$.each(global.demos, function (idx, item) {
				var t = item.info.title;
				var d = item.info.fullDescription;
				var i = item.getFullImageUrl();

				var card = '<div class="card">\
					<div class="card-image">\
						<img src="' + i + '">\
					</div>\
					<div class="card-content">\
						<span class="card-title">' + t + '</span>\
						<p>' + d + '</p>\
					</div>\
					<div class="card-action">\
						<a href="http://www.archive.org/details/' + item.info.identifier + '">Play This Demo</a>\
					</div>\
				</div>';

				list.append(card);
				//list.append('<br />');
			});
		},
		showMissed: function () {
			this.constructMissedDemoList();

			var tl = new TimelineLite();
			tl.to($(".item"), 0.25, {scaleX: 0, scaleY: 0});
			tl.to($(".missedModal"), 0.25, {scaleX: 1, scaleY: 1});
			tl.play();
		},
		hideMissed: function () {
			var tl = new TimelineLite();
			tl.to($(".missedModal"), 0.25, {scaleX: 0, scaleY: 0});
			tl.to($(".item"), 0.25, {scaleX: 1, scaleY: 1});
			tl.play();
		}
	};
});
