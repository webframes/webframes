function user(data, callback)
{
	// TEMP :: hook up to some kind of ui/console
	data.files.forEach( function(file)
	{
		file.user =
		{
			output:
			{
				format: "jpeg",
				compression: 66
			}
		};
	});
	
	callback(null, data);
}



module.exports = user;
