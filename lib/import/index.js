var async = require("async");

var files  = require("./files");
var folder = require("./folder");



function importMedia(data, callback)
{
	async.series(
	[
		function(seriesCallback){ folder(data, seriesCallback) },
		function(seriesCallback){  files(data, seriesCallback) },
	],
	callback);
}



module.exports = importMedia;