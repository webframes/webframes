var gm = require("gm");



function info(i, data, callback)
{
	var file = data.files[i];
	
	gm( file.contents ).identify( function(error, result)
	{
		if (error) throw error;
		
		file.type = "image/" + result.format.toLowerCase();
		
		file.width  = result.size.width;
		file.height = result.size.height;
		
		// Ignore 8-bit GIFs and PNGs as they only have 1-bit alpha channels
		var matte   = result["Channel Depths"].Matte   == "8 bits";
		var opacity = result["Channel Depths"].Opacity == "8 bits";
		file.matte = matte ? "matte" : (opacity ? "opacity" : false);
		//file.matte = (result["Channel Depths"].Matte=="8 bits" || result["Channel Depths"].Opacity=="8 bits");
		
		var gif  = result.format=="GIF";
		var jpeg = result.format=="JPEG" && result["JPEG-Quality"]<100;
		var png  = result.format=="PNG"  && result.Type!="true color";
		file.compressed = (gif || png || jpeg);
		
		callback();
	});
}



module.exports = info;
