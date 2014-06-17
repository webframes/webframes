var async     = require("async");

var compress  = require("./compress");
var container = require("./container");
var convert   = require("./convert");
var frames    = require("./frames");
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
	
		// First index must only have one argument, so a dummy index exists
		// to decrease conditions
		task.push( function(seriesCallback){ seriesCallback(null,data) } );
	
	if (data.options.lossy)
	{
		task.push( function(data, seriesCallback){      compress(data, seriesCallback) } );
	}
	
	if (data.options["minify-export"])
	{
		task.push( function(data, seriesCallback){ minify.images(data, seriesCallback) } );
	}
	
		task.push( function(data, seriesCallback){        frames(data, seriesCallback) } );
	
	if (data.options["css-export"])
	{
		task.push( function(svg,  seriesCallback){       convert(svg,  seriesCallback) } );
	}
	
	if (data.options["minify-export"])
	{
		task.push( function(svg,  seriesCallback){    minify.svg(svg,  seriesCallback) } );
	}
	
	if (data.options.contain)
	{
		task.push( function(svg,  seriesCallback){     container(svg,  seriesCallback) });
	}
	
	if (data.options.contain && data.options["minify-export"])
	{
		task.push( function(svg,  seriesCallback){    minify.svg(svg,  seriesCallback) } );
	}
	
	return task;
}



module.exports = exportFile;