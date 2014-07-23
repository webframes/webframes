var async = require("async");
var fs    = require("fs");

var error = require("../error");



function allocate(data, contents, callback)
{
	contents.media.forEach( function(file)
	{
		file.contents = new Buffer(file.contents, "base64");
	});
	
	callback(null, contents);
}



function buffer(data, callback)
{
	fs.readFile(data.options.open, function(error, contents)
	{
		if (error) throw error;
		
		callback(null, contents.toString());
	});
}



function decode(data, contents, callback)
{
	var prefix = "WebFrames;"
	
	if ( contents.indexOf(prefix) != 0 )
	{
		error.file("Not a valid project file", data.options.cli);
	}
	
	contents = contents.substr(prefix.length);
	
	// Decode twice
	contents = new Buffer(contents, "base64").toString("ascii");
	contents = new Buffer(contents, "base64").toString("ascii");
	
	contents = JSON.parse(contents);
	
	callback(null, contents);
}



function exists(data, callback)
{
	fs.exists(data.options.open, function(exists)
	{
		if (!exists) error.file("Path to project does not exist", data.options.cli);
		
		callback();
	});
}



function isFile(data, callback)
{
	fs.stat(data.options.open, function(error, stats)
	{
		if (error) throw error;
		
		if ( !stats.isFile() ) error.file("Not a valid project file", data.options.cli);
		
		callback();
	});
}



function openProject(data, callback)
{
	async.waterfall(
	[
		function(          seriesCallback){   exists(data,           seriesCallback) },
		function(          seriesCallback){   isFile(data,           seriesCallback) },
		function(          seriesCallback){   buffer(data,           seriesCallback) },
		function(contents, seriesCallback){   decode(data, contents, seriesCallback) },
		function(contents, seriesCallback){ allocate(data, contents, seriesCallback) }
	],
	function(error, result)
	{
		data.project = result;
		
		callback();
	});
}



module.exports = openProject;
