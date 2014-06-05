var Imagemin = require("imagemin");

var imageminInstance = new Imagemin()
	.use( Imagemin.jpegtran({progressive:true})   )
	.use( Imagemin.gifsicle({interlaced:true})    )
	.use( Imagemin.optipng({optimizationLevel:7}) )	// 0-7
	.use( Imagemin.svgo() );



function minify(image, callback)
{
	imageminInstance.src(image).optimize(callback);
}



module.exports = minify;
