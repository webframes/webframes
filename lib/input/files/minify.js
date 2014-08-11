var _minify = require("../../util/minify");



function minify(i, data, callback)
{
	var file = data.project.media[i];
	
	_minify(file.contents, file.type, function(error, result)
	{
		if (error) throw error;
		
		file.contents = result.contents;
		
		callback();
	});
}



module.exports = minify;
