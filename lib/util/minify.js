var Imagemin = require("imagemin");
var gif,jpg,png,svg;



function instantiate(type)
{
	var instance;
	
	switch(type)
	{
		case "gif":
		{
			if (!gif) gif = new Imagemin().use( Imagemin.gifsicle({interlaced:true}) );
			instance = gif;
			break;
		}
		case "jpeg":
		{
			if (!jpg) jpg = new Imagemin().use( Imagemin.jpegtran({progressive:true}) );
			instance = jpg;
			break;
		}
		case "png":
		{
			if (!png) png = new Imagemin().use( Imagemin.optipng({optimizationLevel:7}) );	// 0-7
			instance = png;
			break;
		}
		default:
		{
			if (!svg)
			{
				svg = new Imagemin().use( Imagemin.svgo({plugins:[
				{
					collapseGroups: false,
					convertStyleToAttrs: false,	// didn't support base64 strings within inline CSS (svgo v0.4.4)
					moveGroupAttrsToElems: false
				}]}) );
			}
			instance = svg;
		}
	}
	
	return instance;
}



function minify(contents, type, callback)
{
	var instance = instantiate(type);
	
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
