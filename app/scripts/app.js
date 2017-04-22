$(document).ready(function () {
	requirejs(['modules/global', 'modules/demo', 'modules/ui', 'modules/phys'], function (global, Demo, ui, phys) {
		// init the modules
		ui.init(window);

		var numNeededDemos = 10;
		var numDemos = 0;

		$.getJSON("http://archive.org/advancedsearch.php?q=%28demo%29+AND+collection%3A%28classicpcgames%29&fl%5B%5D=description&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=titleSorter+asc&sort%5B%5D=&sort%5B%5D=&rows=99999&page=1&output=json#raw", function (data) {
			var docs = data.response.docs;
			var numDemosTotal = data.response.docs.length;
			console.log("Loaded " + numDemosTotal + "demos");

			var randomDemoIndexes = [];
			for (var i = 0; i < numNeededDemos; i++) {
				var r = Math.round(Math.random() * numDemosTotal);
				while (randomDemoIndexes.indexOf(r) != -1)
					r = Math.round(Math.random() * numDemosTotal);
				randomDemoIndexes.push(r);
			}

			console.log(randomDemoIndexes);

			$.each(randomDemoIndexes, function (idx, item) {
				var demo = new Demo(docs[item], demosLoaded);
				global.demos.push(demo);
			});
		});

		function demosLoaded() {
			numDemos++;
			if (numDemos == numNeededDemos) {
				// all demos loaded
				phys.begin();
				console.log("Began phys routine");
			}
		}
	});
});
