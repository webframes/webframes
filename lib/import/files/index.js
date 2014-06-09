var async  = require("async");

var buffer = require("./buffer");
var exists = require("./exists");
var info   = require("./info");
var isFile = require("./isFile");
var matte  = require("./matte");
var minify = require("./minify");



function cleanup(data)
{
	// Delete any marked for removal
	data.media.forEach( function(file, i)
	{
		if (!file)
		{
			data.media.splice(i, 1);
		}
	});
}



function importFiles(data, callback)
{
	var read = 0;
	var total = data.options.files.length;
	
	data.issues = [];
	data.media = [];
	
	data.options.files.forEach( function(filePath, i)
	{
		async.series(
		[
			function(seriesCallback){ exists(i, data, filePath, seriesCallback) },
			function(seriesCallback){ isFile(i, data, filePath, seriesCallback) },
			function(seriesCallback){ buffer(i, data, filePath, seriesCallback) },
			function(seriesCallback){   info(i, data,           seriesCallback) },
			function(seriesCallback){  matte(i, data,           seriesCallback) },
			function(seriesCallback){ minify(i, data,           seriesCallback) }
		],
		function(stop, results)
		{
			if (stop) total--;
			else read++;
			
			if (read == total)
			{
				cleanup(data);
				
				callback();
			}
		});
	});
}



module.exports = importFiles;
