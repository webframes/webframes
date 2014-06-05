var Imagemin = require("imagemin");

var imageminInstance = new Imagemin().use( Imagemin.svgo() );



function minify(svg, callback)
{
	svg = new Buffer(svg);
	
	imageminInstance.src(svg).optimize( function(error, result)
	{
		if (error) throw error;
		
		callback( null, result.contents.toString() );
	});
}



module.exports = minify;
