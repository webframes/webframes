var gm = require("gm");



function info(i, data, callback)
{
	var file = data.project.media[i];
	
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
