var async = require("async");
var fs    = require("fs");
var zlib  = require("zlib");

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
	fs.readFile(data.options.inputProject, function(err, contents)
	{
		if (err)
		{
			// TODO :: errors no longer caught now that everything is asynchronous
			if (err.code == "ENOENT")
			{
				error.file("Path to project does not exist", data.options.cli);
			}
			else if (err.code == "EISDIR")
			{
				error.file("Not a valid project file", data.options.cli);
			}
			else
			{
				throw error;
			}
		}
		
		callback(err, contents);
	});
}



function decode(data, contents, callback)
{
	var prefix = "WebFrames;";
	
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



function gunzip(data, contents, callback)
{
	zlib.gunzip(contents, function(err, buffer)
	{
		callback(err, buffer.toString());
	});
}



function openProject(data, callback)
{
	async.waterfall(
	[
		function(          seriesCallback){   buffer(data,           seriesCallback) },
		function(contents, seriesCallback){   gunzip(data, contents, seriesCallback) },
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
