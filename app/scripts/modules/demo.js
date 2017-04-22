/**
 * Created by Colby on 4/22/2017.
 */
define(function () {
	function Demo(parsedJson, onLoad) {
		this.info = parsedJson;
		$.getJSON("https://archive.org/details/" + this.info.identifier + "&output=json", $.proxy(function (data) {
			this.meta = data;

			this.image = new Image();
			this.image.src = this.meta.misc.image;
			this.image.onload = onLoad;

		}, this));
	}

	Demo.prototype = {
		image: null,
		info: null,
		meta: null
	};

	return Demo;
});
