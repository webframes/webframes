var async    = require("async");

var base64   = require("./base64");
var buffer   = require("./buffer");
var compress = require("./compress");
var info     = require("./info");
var isFile   = require("./isFile");
var matte    = require("./matte");
var minify   = require("./minify");
var user     = require("./user");



function cleanup(data)
{
	// Remove any marked for removal
	data.files.forEach( function(file, i)
	{
		if (!file)
		{
			data.files.splice(i, 1);
		}
	});
}



function getFiles(fileList, callback)
{
	var count = 0;
	var data = { files:[], total:fileList.length };
	
	fileList.forEach( function(filePath, i)
	{
		async.series(
		[
			// Import
			function(seriesCallback){   isFile(i, data, filePath, seriesCallback) },
			function(seriesCallback){   buffer(i, data, filePath, seriesCallback) },
			function(seriesCallback){     info(i, data,           seriesCallback) },
			function(seriesCallback){    matte(i, data,           seriesCallback) },
			//function(seriesCallback){   minify(i, data,           seriesCallback) },
			
			// Customization
			function(seriesCallback){     user(i, data,           seriesCallback) },
			
			// Output
			function(seriesCallback){ compress(i, data,           seriesCallback) },
			function(seriesCallback){   minify(i, data,           seriesCallback) },
			function(seriesCallback){   base64(i, data,           seriesCallback) }
		],
		function(errorOrStop, results)
		{
			if (!errorOrStop)
			{
				// All files read
				if (++count == data.total)
				{
					cleanup(data);
					
					callback(null, data.files);
				}
			}
			else if (errorOrStop instanceof Error)
			{
				throw errorOrStop;
			}
			// else stops processing current file
		});
	});
}



module.exports = getFiles;
