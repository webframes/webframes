var async = require("async");
var fs    = require("fs");

var importMedia = require("./import");
var project     = require("./project");
var user        = require("./user");
var validate    = require("./validate");
var version     = require("../package.json").version;



function run(options, callback)
{
	// TODO :: change `issues` to `log` and log everything
	var data = { issues:[], options:options, project:{}, version:version };
	var task = [];
	
	var exportIndex = -1;
	var projectIndex = -1;
	
	if (data.options.files || data.options.folder)
	{
		task.push( function(seriesCallback){  project.shell(data, seriesCallback) } );
		task.push( function(seriesCallback){    importMedia(data, seriesCallback) } );
		task.push( function(seriesCallback){           user(data, seriesCallback) } );	// TEMP
	}
	else if (data.options.open)
	{
		task.push( function(seriesCallback){   project.open(data, seriesCallback) } );
	}
	
	if (data.options.save)
	{
		task.push( function(seriesCallback){   project.save(data, seriesCallback) } );
		projectIndex = task.length-1;
	}
	
	if (data.options.export)
	{
		task.push( function(seriesCallback){ project.export(data, seriesCallback) } );
		exportIndex = task.length-1;
	}
	
	async.series(task, function(error, results)
	{
		var result = {};
		task = [];
		
		if (data.options.export)
		{
			result.export = results[exportIndex];
			
			if (typeof data.options.export == "string")
			{
				task.push( function(parallelCallback){ fs.writeFile(data.options.export, result.export, parallelCallback) } );
			}
		}
		
		if (data.options.save)
		{
			result.save = results[projectIndex];
			
			if (typeof data.options.save == "string")
			{
				task.push( function(parallelCallback){ fs.writeFile(data.options.save,   result.save,   parallelCallback) } );
			}
		}
		
		async.parallel(task, function(error)
		{
			callback(error, result);
		});
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
