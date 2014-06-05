var fs = require("fs");



function isFile(i, data, filePath, callback)
{
	fs.stat(filePath, function(error, stats)
	{
		if (error) throw error;
		
		var stop;
		
		if ( !stats.isFile() )
		{
			// Mark for removal
			data.files[i] = false;
			
			// One less required item
			data.total--;
			
			// Stops async for current file
			stop = true;
		}
		
		callback(stop);
	});
}



module.exports = isFile;
