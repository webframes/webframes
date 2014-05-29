var mmm = require("mmmagic");

var magicInstance = new mmm.Magic( mmm.MAGIC_MIME_TYPE );



function mimetype(i, data, callback)
{
	magicInstance.detect( data.files[i].contents, function(error, result)
	{
		if (!error)
		{
			data.files[i].type = result;
		}
		
		callback(error);
	});
}



module.exports = mimetype;
