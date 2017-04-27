/**
 * Created by colby on 4/23/2017.
 */
define(['modules/global', 'modules/demo', 'modules/phys'], function (global, Demo, phys) {
	return {
		init: function () {
			var numNeededDemos = 10;
			var numDemos = 0;

			global.status("Initializing...");

			var filename = ['demodisk', 'demodisk_100', 'first', 'gonnagetya', 'who'][Math.floor(Math.random() * 5)];

			global.sound = new Howl({
				src: ['/sound/' + filename + '.webm', '/sound/' + filename + '.mp3']
			});

			global.status("Loading demo manifest...");

			var demosUrl = "/demos.json";
			//var allGamesUrl = "http://archive.org/advancedsearch.php?q=collection%3A%28classicpcgames%29&fl%5B%5D=description&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=titleSorter+asc&sort%5B%5D=&sort%5B%5D=&rows=99999&page=1&output=json#raw";

			$.get(demosUrl, function (data) {
				console.log("Loaded demo manifest off web");
				loadJsonData(data);
			});

			var loadJsonData = function (data) {
				var docs = data;
				var numDemosTotal = docs.length;
				console.log("Loaded " + numDemosTotal + " demos");

				$("#numDemos").text(numDemosTotal);

				var randomDemoIndexes = [];
				for (var i = 0; i < numNeededDemos; i++) {
					var r = Math.round(Math.random() * numDemosTotal);
					while (randomDemoIndexes.indexOf(r) != -1)
						r = Math.round(Math.random() * numDemosTotal);
					randomDemoIndexes.push(r);
				}

				$.each(randomDemoIndexes, function (idx, item) {
					var demo = new Demo(docs[item], demosLoaded);
					global.demos.push(demo);
				});
			};

			function demosLoaded() {
				numDemos++;
				global.status("Selecting demos (" + numDemos + "/10)...");
				if (numDemos == numNeededDemos) {
					// all demos loaded
					global.status("Starting physics engine...");
					phys.begin();
					console.log("Began phys routine");
					$(".activity").addClass("hidden");
					$("#loadStatus").addClass("hidden");
					global.status("");
				}
			}
		}
	}
});
