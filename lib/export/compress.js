var async = require("async");
var gm    = require("gm");



// TODO :: should minify compressed images
function compress(data, callback)
{
	var count = 0;
	
	data.media.forEach( function(file, i)
	{
		if (file instanceof Error) return;
		
		async.parallel(
		[
			function(parallelCallback){      frame(data, file, parallelCallback) },
			function(parallelCallback){ frameMatte(data, file, parallelCallback) }
		],
		function(error, results)
		{
			if (error) throw error;
			
			// All files compressed
			if (++count == data.media.length)
			{
				callback(null, data);
			}
		});
	});
}



function compressImage(data, file, image, callback)
{
	if (file.user.export)
	{
		var format = file.user.export.format;
		var quality = file.user.export.quality;
	}
	else
	{
		var format = "jpeg";
		var quality = data.options.quality;
	}
	
	gm( file[image] )
		.compress(format)
		.quality(quality)
		.toBuffer( function(error, buffer)
	{
		callback(error, buffer);
	});
}



function frame(data, file, callback)
{
	var lossyNonPng = !file.matte && data.options.lossy;
	var lossyPng    =  file.matte && data.options["lossy-png"];
	
	if ( !file.compressed && (lossyNonPng || lossyPng) )
	{
		compressImage( data, file, "contents", function(error, buffer)
		{
			if (error) throw erorr;
			
			file.contents = buffer;
			
			callback();
		});
	}
	else
	{
		callback();
	}
}



function frameMatte(data, file, callback)
{
	if (file.matte && data.options["lossy-png"])
	{
		compressImage( data, file, "matte", function(error, buffer)
		{
			if (error) throw erorr;
			
			file.matte = buffer;
			
			callback();
		});
	}
	else
	{
		callback();
	}
}



module.exports = compress;
