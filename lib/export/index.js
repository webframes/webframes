var async     = require("async");

var compress  = require("./compress");
var container = require("./container");
var convert   = require("./convert");
var frames    = require("../util/frames");
var minify    = require("./minify");



function exportFile(data, callback)
{
	async.waterfall( getTask(data), function(error, result)
	{
		if (error) throw error;
		
		callback(null, result);
	});
}



function getTask(data)
{
	var task = [];
	
	if (data.options.lossy)
	{
		task.push
		(
				function(      seriesCallback){  compress(data, seriesCallback) },
				function(data, seriesCallback){    frames(data, seriesCallback) }
		);
	}
	else
	{
		task.push
		(
				function(      seriesCallback){    frames(data, seriesCallback) }
		);
	}
	
	if (data.options["css-export"])
	{
		task.push
		(
				function(svg,  seriesCallback){   convert(svg,  seriesCallback) }
		);
	}
	
	if (data.options["minify-export"])
	{
		task.push
		(
				function(svg,  seriesCallback){    minify(svg,  seriesCallback) }
		);
	}
	
	if (data.options.contain)
	{
		task.push
		(
				function(svg,  seriesCallback){ container(svg,  seriesCallback) }
		);
		
		if (data.options["minify-export"])
		{
			task.push
			(
				function(svg,  seriesCallback){    minify(svg,  seriesCallback) }
			);
		}
	}
	
	return task;
}



module.exports = exportFile;