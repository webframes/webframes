var fs = require("fs");
var Imagemin = require("imagemin");
var Magic = require("mmmagic").Magic;



var imageminInstance = new Imagemin();

imageminInstance
	.use( Imagemin.jpegtran({progressive:true})   )
	.use( Imagemin.gifsicle({interlaced:true})    )
	.use( Imagemin.optipng({optimizationLevel:7}) )	// 0-7
	.use( Imagemin.svgo() );

var magicInstance = new Magic();



function getBuffers(filesPath, callback)
{
	var buffers = [];
	var count = 0;
	var files = fs.readdirSync(filesPath);
	var total = files.length;
	
	files.forEach( function(file, i)
	{
		var filePath = filesPath +"/"+ file;
		
		fs.stat(filePath, function(error1, stats)
		{
			if (error1) throw error1;
			
			// Only files
			if ( !stats.isFile() )
			{
				buffers[i] = false;
				total--;
				return;
			}
			
			fs.readFile(filePath, function(error2, data)
			{
				if (error2) throw error2;
				
				buffers[i] = { path:filePath, data:data };
				
				// All files read
				if (++count == total)
				{
					// Remove any empties 
					buffers.forEach( function(buffer, i)
					{
						if (!buffer)
						{
							buffers.splice(i, 1);
						}
					});
					
					callback(buffers);
				}
			});
		});
	});
}



function getBase64Files(filesPath, callback)
{
	var count = 0;
	var files = [];
	
	getBuffers(filesPath, function(buffers)
	{
		buffers.forEach( function(buffer, i)
		{
			// Minify image
			imageminInstance.run( buffer.data, function(error, data)
			{
				if (error) throw error;
				
				// TODO :: don't base64 svg files?
				files[i] = { path:buffer.path, data:data.toString("base64") };
				
				if (++count == buffers.length)
				{
					callback(files);
				}
			});
		});
	});
}



function getMimeTypes(files, callback)
{
	getBase64Files(filesPath, function(files)
	{
		files.forEach( function(file)
		{
			magicInstance.detect(
		});
	});
	
	
	magic.detect(buf, function(err, result) {
	     if (err) throw err;
	     console.log(result);
	     // output: Python script, ASCII text executable
	 });
}



module.exports = getBase64Files;
