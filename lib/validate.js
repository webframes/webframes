var defaults   = require("./defaults");
var error      = require("./error");
var replaceExt = require("replace-ext");



function validate(options)
{
	if (!options.input && !options.inputProject)
	{
		error.option("Must specify {{input}} or {{input-project|inputProject}}", options.cli);
	}
	
	if (!options.output)
	{
		error.option("Must specify {{output}}", options.cli);
	}
	
	if (options.input && !(options.input instanceof Array))
	{
		options.input = [options.input];
	}
	
	// Force output extensions
	if (typeof options.output == "string")
	{
		var ext = (options.gzip) ? ".svgz" : ".svg";
		
		if (options.project) ext = ".wfp";
		
		options.output = replaceExt(options.output, ext);
	}
	
	for (var i in defaults)
	{
		if (options[i] == undefined)
		{
			options[i] = defaults[i];
		}
	}
}



module.exports = validate;
