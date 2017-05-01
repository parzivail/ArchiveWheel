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

			this.info.fullDescription = this.info.description;

			if (this.info.description.length > 1000) {
				this.info.description = this.info.description.substring(0, 700) + "[...]";
			}

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
				//console.log("ERR 1:", this.meta, decodeURIComponent(thumbFileName));
				return thumbnail;
			}
			var originalFileName = thumbEntry.original;
			if (originalFileName === undefined) {
				//console.log("ERR 2:", thumbEntry);
				return thumbnail;
			}
			return thumbnail.substring(0, thumbnail.lastIndexOf("/") + 1) + originalFileName;
		}
	};

	return Demo;
});
