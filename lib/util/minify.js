var Imagemin = require("imagemin");

var gif = new Imagemin().use( Imagemin.gifsicle({interlaced:true})    );
var jpg = new Imagemin().use( Imagemin.jpegtran({progressive:true})   );
var png = new Imagemin().use( Imagemin.optipng({optimizationLevel:7}) );	// 0-7

var svg = new Imagemin().use( Imagemin.svgo({plugins:[
{
	collapseGroups: false,
	convertStyleToAttrs: false,	// didn't support base64 strings within inline CSS (svgo v0.4.4)
	moveGroupAttrsToElems: false
}]}) );



function minify(contents, type, callback)
{
	var instance;
	
	switch(type)
	{
		case "gif":  instance=gif; break;
		case "jpeg": instance=jpg; break;
		case "png":  instance=png; break;
		default:     instance=svg;
	}
	
	if (instance == svg)
	{
		contents = new Buffer(contents);
	}
	
	instance.src(contents).optimize( function(error, result)
	{
		if (!error && instance==svg)
		{
			result = result.contents.toString();
		}
		
		callback(error, result);
	});
}



module.exports = minify;
