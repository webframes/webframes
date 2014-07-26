var gzip = require("../util/gzip");



function duplicate(org)
{
	var dupe;
	
	if (org!=undefined && typeof org=="object")
	{
		if (org instanceof Buffer)
		{
			// Encode images
			dupe = org.toString("base64");
		}
		else if (org instanceof Array)
		{
			dupe = [];
			
			for (var i=0, len=org.length; i<len; i++)
			{
				dupe[i] = duplicate(org[i]);
			}
		}
		else
		{
			dupe = {};
			
			for (var i in org)
			{
				if (org.hasOwnProperty(i)) dupe[i] = duplicate(org[i]);
			}
		}
	}
	else
	{
		dupe = org;
	}
	
	return dupe;
}



function saveProject(data, callback)
{
	// Duplicate project data and encode images
	var contents = JSON.stringify( duplicate(data.project) );
	
	// Encode JSON (twice)
	contents = new Buffer(contents).toString("base64");
	contents = new Buffer(contents).toString("base64");
	
	// Prefix to describe file
	contents = "WebFrames;" + contents;
	
	gzip(contents, callback);
}



module.exports = saveProject;
