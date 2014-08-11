var async = require("async");
var fs    = require("fs");

var input    = require("./input");
var project  = require("./project");
var user     = require("./user");
var validate = require("./validate");
var version  = require("../package.json").version;



function run(options, callback)
{
	// TODO :: change `issues` to `log` and log everything
	var data = { issues:[], options:options, project:{}, version:version };
	var task = [];
	
	if (data.options.input)
	{
		task.push( function(seriesCallback){  project.shell(data, seriesCallback) } );
		task.push( function(seriesCallback){          input(data, seriesCallback) } );
		task.push( function(seriesCallback){           user(data, seriesCallback) } );	// TEMP
	}
	else if (data.options.inputProject)
	{
		task.push( function(seriesCallback){   project.open(data, seriesCallback) } );
	}
	
	if (data.options.project)
	{
		task.push( function(seriesCallback){   project.save(data, seriesCallback) } );
	}
	else
	{
		task.push( function(seriesCallback){ project.output(data, seriesCallback) } );
	}
	
	async.series(task, function(error, results)
	{
		var result = results[task.length-1];
		
		if (typeof data.options.output == "string")
		{
			fs.writeFile(data.options.output, result, function(error)
			{
				callback(error, result);
			});
		}
		else
		{
			callback(error, result);
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
