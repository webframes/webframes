var async = require("async");
var fs    = require("fs");

var exportFile  = require("./export");
var importFiles = require("./import");
var project     = require("./project");
var user        = require("./user");
var validate    = require("./validate");



function run(options, callback)
{
	var data = { issues:[], options:options, project:{} };
	var task = [];
	
	var exportIndex = -1;
	var projectIndex = -1;
	
	if (data.options.files || data.options.folder)
	{
		task.push( function(seriesCallback){ project.shell(data, seriesCallback) } );
		task.push( function(seriesCallback){   importFiles(data, seriesCallback) } );
		task.push( function(seriesCallback){          user(data, seriesCallback) } );	// TEMP
	}
	else if (data.options.open)
	{
		task.push( function(seriesCallback){  project.open(data, seriesCallback) } );
	}
	
	if (data.options.save)
	{
		task.push( function(seriesCallback){  project.save(data, seriesCallback) } );
		projectIndex = task.length-1;
	}
	
	if (data.options.export)
	{
		task.push( function(seriesCallback){    exportFile(data, seriesCallback) } );
		exportIndex = task.length-1;
	}
	
	async.series(task, function(error, results)
	{
		var result = {};
		
		if (data.options.export)
		{
			result.export = results[exportIndex];
			
			// TODO :: put in async.parallel and run callback() when complete
			if (typeof data.options.export=="string") fs.writeFile(data.options.export, result.export);
		}
		
		if (data.options.save)
		{
			result.save = results[projectIndex];
			
			// TODO :: put in async.parallel and run callback() when complete
			// TODO :: try encoding=binary ?
			if (typeof data.options.save=="string") fs.writeFile(data.options.save, result.save);
		}
		
		if (callback)
		{
			callback(null, result);
		}
	});
}



function webframes(options, callback)
{
	try
	{
		validate(options);
		
		run(options, callback);
	}
	catch (error)
	{
		callback(error);
	}
}



module.exports = webframes;
