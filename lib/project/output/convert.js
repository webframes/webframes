var smil2css = require("smil2css");

smil2css = new smil2css({compress:true});



function convert(svg, callback)
{
	var converted = smil2css.convert(svg);
	
	if (converted instanceof Error)
	{
		if (converted.smil2css && converted.smil2css.type=="unnecessary")
		{
			// callback() is called with non-converted svg
		}
		else
		{
			throw converted;
		}
	}
	else
	{
		svg = converted;
	}
	
	callback(null, svg);
}



module.exports = convert;
