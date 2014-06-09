var fs = require("fs");



function buffer(i, data, filePath, callback)
{
	fs.readFile(filePath, function(error, contents)
	{
		if (error) throw error;
		
		data.media[i] = { path:filePath, contents:contents };
		
		callback();
	});
}



module.exports = buffer;
