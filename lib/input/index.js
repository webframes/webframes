var async = require("async");

var files   = require("./files");
var folders = require("./folders");



function input(data, callback)
{
	async.series(
	[
		function(seriesCallback){ folders(data, seriesCallback) },
		function(seriesCallback){   files(data, seriesCallback) },
	],
	callback);
}



module.exports = input;