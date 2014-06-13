function user(data, callback)
{
	// TEMP :: hook up to some kind of ui/console
	data.media.forEach( function(file)
	{
		file.user = {};
		
		/*file.user.duration = 33;
		
		file.user.export =
		{
			format: "jpeg",
			quality: 66
		};*/
	});
	
	callback(null, data);
}



module.exports = user;
