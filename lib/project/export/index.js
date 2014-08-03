var async     = require("async");

var compress   = require("./compress");
var container  = require("./container");
var convert    = require("./convert");
var dimensions = require("./dimensions");
var gzip       = require("../../util/gzip");
var markup     = require("./markup");
var mattes     = require("./mattes");
var minify     = require("./minify");



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
	
	// TODO :: move to a data.project.media.forEach loop
	if (data.options.lossy)
	{
		task.push( function(data, seriesCallback){        mattes(data, seriesCallback) } );
		task.push( function(data, seriesCallback){      compress(data, seriesCallback) } );
	}
	
	// TODO :: move to a data.project.media.forEach loop
	if (data.options.minifyExport)
	{
		task.push( function(data, seriesCallback){ minify.images(data, seriesCallback) } );
	}
	
		task.push( function(data, seriesCallback){    dimensions(data, seriesCallback) } );
		task.push( function(data, seriesCallback){        markup(data, seriesCallback) } );
	
	if (data.options.css)
	{
		task.push( function(svg,  seriesCallback){       convert(svg,  seriesCallback) } );
	}
	
	if (data.options.minifyExport)
	{
		task.push( function(svg,  seriesCallback){    minify.svg(svg,  seriesCallback) } );
	}
	
	if (data.options.contain)
	{
		task.push( function(svg,  seriesCallback){     container(svg,  seriesCallback) } );
	}
	
	if (data.options.contain && data.options.minifyExport)
	{
		task.push( function(svg,  seriesCallback){    minify.svg(svg,  seriesCallback) } );
	}
	
	if (data.options.gzip)
	{
		task.push( function(svg,  seriesCallback){          gzip(svg,  seriesCallback) } );
	}
	
	return task;
}



module.exports = exportFile;