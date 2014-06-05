var gm = require("gm");



function matte(i, data, callback)
{
	var file = data.files[i];
	
	if (file.matte)
	{
		gm( file.contents ).matte().compress("jpg").quality(100).toBuffer( function(error, buffer)
		{
			if (error) throw error;
			
			file.matte = buffer;
			
			callback();
		});
	}
	else
	{
		callback();
	}
}



module.exports = matte;
