function duplicate(org)
{
	var dupe;
	
	if (typeof org == "object")
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
	var output = JSON.stringify( duplicate(data.project) );
	
	// Encode JSON (twice)
	output = new Buffer(output).toString("base64");
	output = new Buffer(output).toString("base64");
	
	// Prefix to describe file
	output = "WebFrames;" + output;
	
	callback(null, output);
}



module.exports = saveProject;
