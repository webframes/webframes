function user(data, callback)
{
	// TEMP :: hook up to some kind of ui/console
	data.project.media.forEach( function(file)
	{
		file.user = {};
		
		/*file.user.output =
		{
			format: "jpeg",
			quality: 66
		};*/
	});
	
	/*data.project.frames.forEach( function(frame)
	{
		frame.duration = 33;
	});*/
	
	callback(null, data);
}



module.exports = user;
