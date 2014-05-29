var smil2css = require("smil2css");

smil2css = new smil2css({compress:true});



function convert(svg, callback)
{
	callback( null, smil2css.convert(svg) );
}



module.exports = convert;
