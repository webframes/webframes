var async = require("async");
var gm    = require("gm");



function compress(data, callback)
{
	if (data.options.lossy)
	{
		var count = 0;
		
		data.project.media.forEach( function(file, i)
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
				if (++count == data.project.media.length)
				{
					callback(null, data);
				}
			});
		});
	}
	else
	{
		callback(null, data);
	}
}



function compressImage(data, file, image, callback)
{
	if (file.user.output)
	{
		var format  = file.user.output.format;
		var quality = file.user.output.quality;
	}
	else
	{
		var format = "jpeg";
		var quality = data.options.quality;
	}
	
	gm( file[image] ).compress(format).quality(quality).toBuffer(format, function(error, buffer)
	{
		if (error) throw error;
		
		callback(null, buffer, format);  
	});
}



function frame(data, file, callback)
{
	compressImage( data, file, "contents", function(error, buffer, format)
	{
		if (error) throw erorr;
		
		file.contents = buffer;
		file.type = format;
		
		callback();
	});
}



function frameMatte(data, file, callback)
{
	if (file.matte)
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
