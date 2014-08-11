var _minify = require("../../util/minify");



function minifyImages(data, callback)
{
	var count = 0;
	
	data.project.media.forEach( function(file, i)
	{
		if (file instanceof Error) return;
		
		_minify(file.contents, file.type, function(error, result)
		{
			if (error) throw error;
			
			file.contents = result.contents;
			
			// All files minified
			if (++count == data.project.media.length)
			{
				callback(null, data);
			}
		});
	});
}



function minifySVG(svg, callback)
{
	_minify(svg, null, function(error, result)
	{
		if (error) throw error;
		
		callback(null, result);
	});
}



module.exports =
{
	images: minifyImages,
	svg:    minifySVG
};
