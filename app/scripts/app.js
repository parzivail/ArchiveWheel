$(document).ready(function () {
	requirejs(['modules/global', 'modules/demo', 'modules/ui', 'modules/phys'], function (global, Demo, ui, phys) {
		// init the modules
		ui.init(window);

		$("#spinAgain").click(function () {
			location.reload();
		});

		$("#play").click(function () {
			console.log(global.demos[global.currentIndex]);
			window.open("https://archive.org/details/" + global.demos[global.currentIndex].info.identifier);
		});

		var numNeededDemos = 10;
		var numDemos = 0;

		var loadJsonData = function (data) {
			var docs = data.response.docs;
			var numDemosTotal = data.response.docs.length;
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

		if (sessionStorage.getItem("demoCache") === null) {
			console.log("Did not find a DemoCache, loading off web");

			var demosUrl = "http://archive.org/advancedsearch.php?q=%28demo%29+AND+collection%3A%28classicpcgames%29&fl%5B%5D=description&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=titleSorter+asc&sort%5B%5D=&sort%5B%5D=&rows=3000&page=1&output=json#raw";
			var allGamesUrl = "http://archive.org/advancedsearch.php?q=collection%3A%28classicpcgames%29&fl%5B%5D=description&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=titleSorter+asc&sort%5B%5D=&sort%5B%5D=&rows=99999&page=1&output=json#raw";

			$.getJSON(demosUrl, function (data) {
				sessionStorage.setItem('demoCache', JSON.stringify(data));
				console.log("Loaded DemoCache off web");
				loadJsonData(data);
			});
		}
		else {
			console.log("Found a DemoCache, not loading off web");
			loadJsonData(JSON.parse(sessionStorage.getItem("demoCache")));
		}

		function demosLoaded() {
			numDemos++;
			if (numDemos == numNeededDemos) {
				// all demos loaded
				phys.begin();
				console.log("Began phys routine");
				$("#loaderInfo").addClass("hidden");

				$("#possible").append("<div><b>Possibilities:</b></div>");
				$.each(global.demos, function (idx, item) {
					var t = item.info.title;
					if (t.length > 40)
						t = t.substring(0, 40) + "...";

					$("#possible").append('<div><i class="material-icons">chevron_right</i> ' + t + "</div>");
				});
			}
		}
	});
});
