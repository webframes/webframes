var version = require("../../package.json").version;



function frames(data, callback)
{
	var svg = '<?xml version="1.0" encoding="utf-8"?>';
	svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
	svg += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
	svg += 	'<!-- webframes v'+version+' -->';
	svg += 	'<style type="text/css"><![CDATA[';
	//svg += 		'svg > g { visibility:hidden }';
	svg += 		'g { visibility:hidden }';
	svg += 	']]></style>';
	
	data.project.media.forEach( function(file, i)
	{
		var content = file.contents.toString("base64");
		
		if (file.matte)
		{
			var matte = file.matte.toString("base64");
			
			svg += '<g style="image-mask:url(data:image/jpeg;base64,'+matte+')">';
		}
		else
		{
			svg += '<g>';
		}
		
		// TODO :: treat svg files differently
		if (data.project.media.length > 1)
		{
			var begin = i ? "frame"+(i-1)+".end" : "0s;frame"+(data.project.media.length-1)+".end";
			
			var duration = (file.user.duration!=undefined ? file.user.duration : data.options.duration) + "ms";
			
			svg += '<animate id="frame'+i+'" attributeName="visibility" values="visible" dur="'+duration+'" begin="'+begin+'"/>';
			svg += '<image width="'+file.width+'" height="'+file.height+'" xlink:href="data:'+file.type+';base64,'+content+'"/>';
		}
		else
		{
			svg += '<image width="'+file.width+'" height="'+file.height+'" xlink:href="data:'+file.type+';base64,'+content+'"/>';
		}
		
		svg += '</g>';
	});
	
	svg += '</svg>';
	
	callback(null, svg);
}



module.exports = frames;
