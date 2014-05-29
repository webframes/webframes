var imagesize = require("image-size");



function dimensions(i, data, callback)
{
	var file = data.files[i];
	var size = imagesize( file.contents );
	
	file.width  = size.width;
	file.height = size.height;
	
	callback();
}



module.exports = dimensions;
