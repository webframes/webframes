var gm = require("gm");



function mattes(data, callback)
{
	var count = 0;
	var numMedia = data.project.media.length;
	
	data.project.media.forEach( function(file, i)
	{
		if (file instanceof Error) return;
		
		if (file.matte && data.options.lossy)
		{
			gm( file.contents ).channel("Matte").negative().toBuffer( function(error, result)
			{
				if (error) throw error;
				
				file.matte = result;
				
				if (++count == numMedia)
				{
					callback(null, data);
				}
			});
		}
		else if (++count == numMedia)
		{
			callback(null, data);
		}
	});
}



module.exports = mattes;
