function dimensions(data, callback)
{
	var noHeight = data.project.height == undefined;
	var noWidth  = data.project.width  == undefined;
	
	var height = 0;
	var width = 0;
	
	if (noHeight || noWidth)
	{
		data.project.media.forEach( function(file, i)
		{
			height = Math.max(height, file.height);
			width  = Math.max(width,  file.width);
		});
		
		if (noHeight) data.project.height = height;
		if (noWidth)  data.project.width  = width;
	}
	
	callback(null, data);
}



module.exports = dimensions;
