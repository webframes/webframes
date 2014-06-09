var async = require("async");
var fs    = require("fs");

var exportFile = require("./export");
var importFiles = require("./import");
//var saveProject = require("./project");
var user = require("./user");



function webframes(options, callback)
{
	var data = { options:options };
	var task = [];
	
	var exportIndex = -1;
	var projectIndex = -1;
	
	if (data.options.files || data.options.folder)
	{
		task.push( function(seriesCallback){ importFiles(data, seriesCallback) } );
		task.push( function(seriesCallback){        user(data, seriesCallback) } );	// TEMP
	}
	else if (data.options.open)
	{
		task.push( function(seriesCallback){ openProject(data, seriesCallback) } );
	}
	
	if (data.options.save)
	{
		task.push( function(seriesCallback){ saveProject(data, seriesCallback) } );
		projectIndex = task.length-1;
	}
	
	if (data.options.export)
	{
		task.push( function(seriesCallback){  exportFile(data, seriesCallback) } );
		exportIndex = task.length-1;
	}
	
	async.series( task, function(error, results)
	{
		//console.log(data)
		
		var result = {};
		
		if (data.options.export)
		{
			result.export = results[exportIndex];
			
			fs.writeFile(data.options.export, result.export);	// TODO :: try encoding=binary ?
		}
		
		if (data.options.save)
		{
			result.project = results[projectIndex];
			
			fs.writeFile(data.options.save, result.project);
		}
		
		if (callback)
		{
			callback(result);
		}
	});
}



module.exports = webframes;
