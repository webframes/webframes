var async = require("async");
var gm    = require("gm");



// TODO :: should minify compressed images
function compress(data, callback)
{
	var count = 0;
	
	data.files.forEach( function(file, i)
	{
		async.parallel(
		[
			function(parallelCallback){      frame(file, parallelCallback) },
			function(parallelCallback){ frameMatte(file, parallelCallback) }
		],
		function(error, results)
		{
			if (error) throw error;
			
			// All files compressed
			if (++count == data.files.length)
			{
				callback(null, data);
			}
		});
	});
}



function compressImage(file, image, callback)
{
	gm( file[image] )
		.compress( file.user.output.format )
		.quality(  file.user.output.compression )
		.toBuffer( function(error, buffer)
	{
		callback(error, buffer);
	});
}



function frame(file, callback)
{
	if (!file.compressed)
	{
		compressImage( file, "contents", function(error, buffer)
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



function frameMatte(file, callback)
{
	if (file.matte)
	{
		compressImage( file, "matte", function(error, buffer)
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
