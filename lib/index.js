var async    = require("async");
var fs       = require("fs");
var path     = require("path");

var getFiles = require("./files");
var getSVG   = require("./svg");



function webframes(files, callback)
{
	async.waterfall(
	[
		function(       seriesCallback){ getFiles(files, seriesCallback) },
		function(files, seriesCallback){   getSVG(files, seriesCallback) }
	],
	function(error, result)
	{
		if (error) throw error;
		
		callback(result);
	});
}


module.exports = webframes;
