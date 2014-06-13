var gm = require("gm");



function info(i, data, callback)
{
	var file = data.media[i];
	
	gm( file.contents ).identify( function(error, result)
	{
		if (error) throw error;
		
		file.type = "image/" + result.format.toLowerCase();
		
		file.width  = result.size.width;
		file.height = result.size.height;
		
		// Ignore 8-bit GIFs and PNGs as they only have 1-bit alpha channels
		//var matte   = result["Channel Depths"].Matte   == "8 bits";
		//var opacity = result["Channel Depths"].Opacity == "8 bits";
		//file.matte = matte ? "Matte" : (opacity ? "Opacity" : false);
		file.matte = (result["Channel Depths"].Matte=="8 bits" || result["Channel Depths"].Opacity=="8 bits");
		file.matte = data.options["lossy-png"] ? file.matte : false;
		
		var gif  = result.format=="GIF";
		var jpeg = result.format=="JPEG" && result["JPEG-Quality"]<95;	// photohop saved max quality as 99 (?)
		var png  = result.format=="PNG"  && result.Type!="true color";
		file.compressed = (gif || png || jpeg);
		
		callback();
	});
}



module.exports = info;
