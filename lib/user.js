function user(data, callback)
{
	// TEMP :: hook up to some kind of ui/console
	data.media.forEach( function(file)
	{
		file.user =
		{
			export:
			{
				format: "jpeg",
				compression: 66
			}
		};
	});
	
	callback(null, data);
}



module.exports = user;
