var fs = require("fs");



function isFile(i, data, filePath, callback)
{
	fs.stat(filePath, function(error, stats)
	{
		if (error) throw error;
		
		var stop;
		
		if ( !stats.isFile() )
		{
			data.issues[i] = { path:filePath, issue:new Error("Not a file") };
			
			// Mark for removal
			data.project.media[i] = false;
			
			// Stops async for current file
			stop = true;
		}
		
		callback(stop);
	});
}



module.exports = isFile;
