var defaults   = require("./defaults");
var error      = require("./error");
var replaceExt = require("replace-ext");



function validate(options)
{
	if (!options.files && !options.folder && !options.open)
	{
		error.option("Must specify {{files}}, {{folder}} or {{open}}", options.cli);
	}
	
	if (options.files && options.folder)
	{
		error.option("Cannot use both {{files}} and {{folder}}", options.cli);
	}
	
	if (options.files && options.open)
	{
		error.option("Cannot use both {{files}} and {{open}}", options.cli);
	}
	
	if (options.folder && options.open)
	{
		error.option("Cannot use both {{folder}} and {{open}}", options.cli);
	}
	
	if (!options.export && !options.save)
	{
		error.option("Must specify {{export}} and/or {{save}}", options.cli);
	}
	
	// Force *.wfp extension
	if (options.save && typeof options.save=="string")
	{
		options.save = replaceExt(options.save, ".wfp");
	}
	
	// Force *.svg and *.svgz extensions
	if (options.export && typeof options.export=="string")
	{
		options.export = replaceExt(options.export, (options.gzip) ? ".svgz" : ".svg");
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
