var async     = require("async");
var fs        = require("fs");
var Imagemin  = require("imagemin");
var imagesize = require("image-size");
var mmm       = require("mmmagic");



var imageminInstance = new Imagemin()
	.use( Imagemin.jpegtran({progressive:true})   )
	.use( Imagemin.gifsicle({interlaced:true})    )
	.use( Imagemin.optipng({optimizationLevel:7}) )	// 0-7
	.use( Imagemin.svgo() );

var magicInstance = new mmm.Magic( mmm.MAGIC_MIME_TYPE );



function base64Buffer(i, data, callback)
{
	data.files[i].contents = data.files[i].contents.toString("base64");
	
	callback();
}



function cleanup(data)
{
	// Remove any marked for removal
	data.files.forEach( function(file, i)
	{
		if (!file)
		{
			data.files.splice(i, 1);
		}
	});
}



function getBuffer(i, data, filePath, callback)
{
	fs.readFile(filePath, function(error, buffer)
	{
		if (!error)
		{
			data.files[i] = { path:filePath, contents:buffer };
		}
		
		callback(error);
	});
}



function getDimensions(i, data, callback)
{
	var file = data.files[i];
	var dimensions = imagesize( file.contents );
	
	file.width  = dimensions.width;
	file.height = dimensions.height;
	
	callback();
}



function getFiles(fileList, callback)
{
	var count = 0;
	var data = { files:[], total:fileList.length };
	
	fileList.forEach( function(filePath, i)
	{
		async.series(
		[
			function(seriesCallback){        isFile(i, data, filePath, seriesCallback) },
			function(seriesCallback){     getBuffer(i, data, filePath, seriesCallback) },
			function(seriesCallback){   getMimeType(i, data,           seriesCallback) },
			function(seriesCallback){ getDimensions(i, data,           seriesCallback) },
			function(seriesCallback){  minifyBuffer(i, data,           seriesCallback) },
			function(seriesCallback){  base64Buffer(i, data,           seriesCallback) }
		],
		function(errorOrStop, results)
		{
			if (!errorOrStop)
			{
				// All files read
				if (++count == data.total)
				{
					cleanup(data);
					
					callback(null, data.files);
				}
			}
			else if (errorOrStop instanceof Error)
			{
				throw errorOrStop;
			}
			// else stops processing current file
		});
	});
}



function getMimeType(i, data, callback)
{
	magicInstance.detect( data.files[i].contents, function(error, result)
	{
		if (!error)
		{
			data.files[i].type = result;
		}
		
		callback(error);
	});
}



function isFile(i, data, filePath, callback)
{
	fs.stat(filePath, function(error, stats)
	{
		if ( !error && !stats.isFile() )
		{
			// Mark for removal
			data.files[i] = false;
			
			// One less required item
			data.total--;
			
			// Stops async for current file
			error = true;
		}
		
		callback(error);
	});
}



function minifyBuffer(i, data, callback)
{
	imageminInstance.run( data.files[i].contents, function(error, result)
	{
		if (!error)
		{
			// TODO :: don't base64 svg files?
			data.files[i].contents = result;
		}
		
		callback(error);
	});
}



module.exports = getFiles;
