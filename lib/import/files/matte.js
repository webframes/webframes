var gm = require("gm");



function matte(i, data, callback)
{
	var file = data.project.media[i];
	
	if (file.matte)
	{
		gm( file.contents ).matte().toBuffer( function(error, result)
		{
			if (error) throw error;
			
			file.matte = result;
			
			callback();
		});
	}
	else
	{
		callback();
	}
}



module.exports = matte;
