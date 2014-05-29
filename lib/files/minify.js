var Imagemin = require("imagemin");

var imageminInstance = new Imagemin()
	.use( Imagemin.jpegtran({progressive:true})   )
	.use( Imagemin.gifsicle({interlaced:true})    )
	.use( Imagemin.optipng({optimizationLevel:7}) )	// 0-7
	.use( Imagemin.svgo() );



function minify(i, data, callback)
{
	imageminInstance.src( data.files[i].contents ).optimize( function(error, result)
	{
		if (!error)
		{
			// TODO :: don't base64 svg files?
			data.files[i].contents = result.contents;
		}
		
		callback(error);
	});
}



module.exports = minify;
