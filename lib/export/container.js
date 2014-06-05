function container(nestedSvg, callback)
{
	nestedSvg = new Buffer(nestedSvg).toString("base64");
	
	var svg = '';
	
	svg  = '<?xml version="1.0" encoding="utf-8"?>';
	svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
	svg += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
	svg += '<image width="720" height="486" xlink:href="data:image/svg+xml;base64,'+nestedSvg+'"/>';
	svg += '</svg>';
	
	callback(null, svg);
}



module.exports = container;
