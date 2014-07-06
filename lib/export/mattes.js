var gm = require("gm");



function mattes(data, callback)
{
	var count = 0;
	var numMedia = data.project.media.length;
	
	data.project.media.forEach( function(file, i)
	{
		if (file instanceof Error) return;
		
		if (file.matte && data.options["lossy-png"])
		{
			gm( file.contents ).matte().toBuffer( function(error, result)
			{
				if (error) throw error;
				
				file.matte = result;
				
				if (++count == numMedia)
				{
					callback(null, data);
				}
			});
		}
		else if (i==numMedia-1 && !count)
		{
			callback(null, data);
		}
	});
}



module.exports = mattes;
