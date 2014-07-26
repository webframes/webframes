var frameLabel = "frame";
var maskLabel = "mask";



function frames(data)
{
	var numMedia = data.project.media.length;
	var str = "";
	
	data.project.media.forEach( function(file, i)
	{
		str += '<g>';
		
		// TODO :: treat svg files differently
		if (numMedia > 1)
		{
			var begin = i ? frameLabel+(i-1)+".end" : "0s;"+frameLabel+(numMedia-1)+".end";
			
			var duration = (file.user.duration!=undefined ? file.user.duration : data.options.duration) + "ms";
			
			str += '<animate id="'+frameLabel+i+'" attributeName="visibility" values="visible" dur="'+duration+'" begin="'+begin+'"/>';
		}
		
		str += '<image width="'+file.width+'" height="'+file.height+'" ';
		
		if (file.matte instanceof Buffer)
		{
			str += 'mask="url(#'+frameLabel+i+maskLabel+')" ';
		}
		
		str += 'xlink:href="data:image/'+file.type+';base64,'+ file.contents.toString("base64") +'"/></g>';
	});
	
	return str;
}



function markup(data, callback)
{
	var str = '<?xml version="1.0" encoding="utf-8"?>';
	str += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
	str += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
	str += ' width="'+data.project.width+'"';
	str += ' height="'+data.project.height+'"';
	str += ' viewBox="0 0 '+data.project.width+' '+data.project.height+'"';
	str += ' preserveAspectRatio="none">';
	
	str += styles(data);
	str += masks(data);
	str += frames(data);
	
	str += '</svg>';
	
	callback(null, str);
}



function masks(data)
{
	var str = "";
	
	data.project.media.forEach( function(file, i)
	{
		if (file.matte instanceof Buffer)
		{
			str += '<mask id="'+frameLabel+i+maskLabel+'">';
			str += '<image width="'+file.width+'" height="'+file.height+'" xlink:href="data:image/'+file.type+';base64,'+ file.matte.toString("base64") +'"/>';
			str += '</mask>';
		}
	});
	
	if (str)
	{
		str = '<defs>'+str+'</defs>';
	}
	
	return str;
}



function styles(data)
{
	var str = "";
	
	if (data.project.media.length > 1)
	{
		str += '<style type="text/css"><![CDATA[';
		
		if (data.project.bgcolor != "transparent")
		{
			str += ':root { background:'+data.project.bgcolor+' }';
		}
		
		//str += ':root > g { visibility:hidden }';
		str += 'g { visibility:hidden }';
		str += ']]></style>';
	}
	
	return str;
}



module.exports = markup;
