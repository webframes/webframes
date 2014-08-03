var async  = require("async");

var buffer = require("./buffer");
var info   = require("./info");
var minify = require("./minify");



function cleanup(data)
{
	// Delete any marked for removal
	data.project.media.forEach( function(file, i)
	{
		if (!file)
		{
			data.project.media.splice(i, 1);
		}
	});
}



function getTask(data, filePath, i)
{
	var task =
	[
			function(seriesCallback){ buffer(i, data, filePath, seriesCallback) },
			function(seriesCallback){   info(i, data,           seriesCallback) }
	];
	
	if (data.options.minifyImport)
	{
		task.push
		(
			function(seriesCallback){ minify(i, data,           seriesCallback) }
		);
	}
	
	return task;
}



function importFiles(data, callback)
{
	var read = 0;
	var total = data.options.files.length;
	
	data.options.files.forEach( function(filePath, i)
	{
		async.series( getTask(data, filePath, i), function(stop, results)
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
