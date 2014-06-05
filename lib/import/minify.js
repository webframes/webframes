var _minify = require("../util/minify");



function minify(i, data, callback)
{
	_minify( data.files[i].contents, function(error, result)
	{
		if (error) throw error;
		
		data.files[i].contents = result.contents;
		
		callback();
	});
}



module.exports = minify;
