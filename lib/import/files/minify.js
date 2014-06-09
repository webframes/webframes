var _minify = require("../../util/minify");



function minify(i, data, callback)
{
	_minify( data.media[i].contents, function(error, result)
	{
		if (error) throw error;
		
		data.media[i].contents = result.contents;
		
		callback();
	});
}



module.exports = minify;
