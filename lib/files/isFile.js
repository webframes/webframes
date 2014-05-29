var fs = require("fs");



function isFile(i, data, filePath, callback)
{
	fs.stat(filePath, function(error, stats)
	{
		if ( !error && !stats.isFile() )
		{
			// Mark for removal
			data.files[i] = false;
			
			// One less required item
			data.total--;
			
			// Stops async for current file
			error = true;
		}
		
		callback(error);
	});
}



module.exports = isFile;
