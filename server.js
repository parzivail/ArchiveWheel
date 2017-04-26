/**
 * Created by colby on 4/25/2017.
 */

var http = require("http"),
	fs = require("fs"),
	mime = require("mime");

var FS_BASE = "app/";
var DATA_BASE = "data/";

var server = http.createServer(function (req, res) {
	if (req.url.indexOf("/") === req.url.length - 1)
		req.url = req.url + "index.html";

	trySend(FS_BASE + req.url, req, res, function (req, res) {
		trySend(DATA_BASE + req.url, req, res, function () {
			res.writeHead(404);
			res.write("404 Not Found");
			res.end();
		});
	})
});

var trySend = function (fileName, req, res, failCallback) {
	fs.exists(fileName, function (exists) {
		if (exists) {
			fs.readFile(fileName, function (error, content) {
				if (error) {
					console.log(error);
					res.writeHead(500);
					res.write("500 Internal Server Error\n");
					res.write(error);
					res.end();
				} else {
					res.writeHead(200, {"Content-Type": mime.lookup(req.url)});
					res.end(content, "utf-8");
				}
			});
		} else {
			failCallback(req, res);
		}
	});
};

server.listen(80);