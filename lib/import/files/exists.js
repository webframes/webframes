var fs = require("fs");



function exists(i, data, filePath, callback)
{
	fs.exists(filePath, function(exists)
	{
		var stop;
		
		if (!exists)
		{
			data.issues[i] = { path:filePath, issue:new Error("File not found") };
			
			// Mark for removal
			data.media[i] = false;
			
			// Stops async for current file
			stop = true;
		}
		
		callback(stop);
	});
}



module.exports = exists;
