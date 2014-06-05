var nopter = require("nopter");
var path   = require("path");
var pkg    = require("./package.json");



nopter.config(
{
	name:        pkg.name,
	description: pkg.description,
	version:     pkg.version,
	options:
	{
		"help":
		{
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean
		},
		"input":
		{
			info: "Some file input.",
			type: path
		},
		"output":
		{
			info: "The output SVG file.",
			type: path
		},
		"version":
		{
			short: "v",
			info: "Print the "+pkg.name+" version.",
			type: Boolean
		}
	},
	aliases: ["input", "output"]
});



function cli()
{
	var options = nopter.input();
	
	if (options.help)
	{
		console.log( nopter.help() );
		return;
	}
	
	if (options.version)
	{
		console.log(pkg.version);
		return;
	}
	
	//console.log( JSON.stringify(options) );
}



module.exports = cli;
