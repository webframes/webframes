var async = require("async");
var fs    = require("fs");



function contents(folder, callback)
{
	fs.readdir(folder, function(error, files)
	{
		if (error) throw error;
		
		var filteredFiles = [];
		
		files.forEach( function(fileName)
		{
			if (fileName!=".DS_Store" && fileName!="thumbs.db")
			{
				filteredFiles.push( folder +"/"+ fileName );
			}
		});
		
		callback(null, filteredFiles);
	});
}



function exists(folder, callback)
{
	fs.exists(folder, function(_exists)
	{
		if (!_exists) throw new Error("folder doesn't exist");
		
		callback();
	});
}



function importFolder(data, callback)
{
	if (data.options.folder)
	{
		async.series(
		[
			function(seriesCallback){   exists(data.options.folder, seriesCallback) },
			function(seriesCallback){    isDir(data.options.folder, seriesCallback) },
			function(seriesCallback){ contents(data.options.folder, seriesCallback) }
		],
		function(error, results)
		{
			data.options.files = results[2];
			delete data.options.folder;
			
			callback();
		});
	}
	else
	{
		callback();
	}
}



function isDir(folder, callback)
{
	fs.stat(folder, function(error, stats)
	{
		if (error) throw error;
		
		if ( !stats.isDirectory() ) throw new Error("folder is not a folder");
		
		callback();
	});
}



module.exports = importFolder;
