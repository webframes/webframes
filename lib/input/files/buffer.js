var fs = require("fs");



function buffer(i, data, filePath, callback)
{
	fs.readFile(filePath, function(error, contents)
	{
		var stop;
		
		if (error)
		{
			if (error.code == "ENOENT")
			{
				data.issues.push({ path:filePath, issue:new Error("Path not found") });
			}
			else if (error.code == "EISDIR")
			{
				data.issues.push({ path:filePath, issue:new Error("Not a file") });
			}
			else
			{
				throw error;
			}
			
			// Mark for removal
			data.project.media[i] = false;
			
			// Stops async for current file
			stop = true;
		}
		else
		{
			data.project.media[i] = { path:filePath, contents:contents };
		}
		
		callback(stop);
	});
}



module.exports = buffer;
