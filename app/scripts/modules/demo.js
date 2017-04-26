/**
 * Created by Colby on 4/22/2017.
 */
define(['modules/global'], function (global) {
	function Demo(parsedJson, onLoad) {
		this.info = parsedJson;
		$.get("/metadata/" + this.info.identifier + ".json", $.proxy(function (data) {
			this.meta = data;

			this.image = global.loadImage(this.getFullImageUrl(), "/images/unknown.png");

			if (!this.info.description)
				this.info.description = "No description provided.";

			if (this.info.description.length > 1000)
				this.info.description = this.info.description.substring(0, 700) + "[...]";

			onLoad();

		}, this));
	}

	Demo.prototype = {
		image: null,
		info: null,
		meta: null,
		getFullImageUrl: function () {
			var thumbnail = this.meta.misc.image;
			var thumbFileName = thumbnail.substring(thumbnail.lastIndexOf("/"));
			var thumbEntry = this.meta.files[decodeURIComponent(thumbFileName)];
			if (thumbEntry === undefined) {
				console.log("Unable to load full image, code 1 (unable to find catalog entry)", this.meta, decodeURIComponent(thumbFileName));
				return thumbnail;
			}
			var originalFileName = thumbEntry.original;
			if (originalFileName === undefined) {
				console.log("Unable to load full image, code 2 (unable to find original)", thumbEntry);
				return thumbnail;
			}
			return thumbnail.substring(0, thumbnail.lastIndexOf("/") + 1) + originalFileName;
		}
	};

	return Demo;
});
