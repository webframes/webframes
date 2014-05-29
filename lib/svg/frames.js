var version = require("../../package.json").version;



function frames(files, callback)
{
	var svg = '<?xml version="1.0" encoding="utf-8"?>\n';
	svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n'
	svg += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n';
	svg += 	'<!-- webframes v'+version+' -->\n';
	svg += 	'<style type="text/css"><![CDATA[\n';
	//svg += 		'svg > g { visibility:hidden }\n';
	svg += 		'g { visibility:hidden }\n';
	svg += 	']]></style>\n\n';
	
	files.forEach( function(file, i)
	{
		// TODO :: treat svg files differently
		if (files.length > 1)
		{
			var begin = i ? "frame"+(i-1)+".end" : "0s;frame"+(files.length-1)+".end";
			
			svg += '<g>\n';
			svg +=     '<animate id="frame'+i+'" attributeName="visibility" values="visible" dur="33ms" begin="'+begin+'"/>\n';
			svg +=     '<image width="'+file.width+'" height="'+file.height+'" xlink:href="data:'+file.type+';base64,'+file.contents+'"/>\n';
			svg += '</g>\n\n';
		}
		else
		{
			svg += '<g>\n';
			svg +=     '<image width="'+file.width+'" height="'+file.height+'" xlink:href="data:'+file.type+';base64,'+file.contents+'"/>\n';
			svg += '</g>\n\n';
		}
	});
	
	svg += '</svg>';
	
	callback(null, svg);
}



module.exports = frames;
