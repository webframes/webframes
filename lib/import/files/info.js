var gm = require("gm");
//var imagemagick = require("imagemagick-native");



function info(i, data, callback)
{
	var file = data.project.media[i];
	
	// TODO :: switch to imagemagick when possible
	//var info = imagemagick.identify({ srcData:file.contents });
	
	gm( file.contents ).identify( function(error, result)
	{
		if (error) throw error;
		
		file.type = result.format.toLowerCase();
		
		file.width  = result.size.width;
		file.height = result.size.height;
		
		file.matte = (result["Channel Depths"].Matte || result["Channel Depths"].Opacity);
		
		callback();
	});
}



module.exports = info;
