var async = require("async");
var fs    = require("fs");
var junk  = require("junk");



function filter(contents, folder)
{
	if (contents instanceof Array)
	{
		var filteredContents = [];
		
		contents.forEach( function(fileName)
		{
			if ( junk.not(fileName) )
			{
				filteredContents.push( folder +"/"+ fileName );
			}
		});
		
		return filteredContents;
	}
	else
	{
		return folder;
	}
}



/*
	Non-recursive (one level deep) folder expansion.
*/
function folders(data, callback)
{
	var count = 0;
	var expanded = [];
	
	data.options.input.forEach( function(item, i)
	{
		fs.readdir(item, function(error, contents)
		{
			if (error)
			{
				if (error.code == "ENOENT")
				{
					data.issues.push({ path:item, issue:new Error("Path not found") });
					expanded[i] = false;
				}
				else if (error.code != "ENOTDIR")
				{
					throw error;
				}
			}
			
			if (contents);
			{
				expanded[i] = filter(contents, item);
			}
			
			// If all done
			if (++count >= data.options.input.length)
			{
				data.options.input = flatten(expanded);
				callback(null, data);
			}
		});
	});
}



function flatten(contents)
{
	if (contents instanceof Array)
	{
		return contents.reduce( function(a, b)
		{
			return b===false ? a : a.concat(b);
		},
		[]);
	}
	else
	{
		return contents;
	}
}



module.exports = folders;
