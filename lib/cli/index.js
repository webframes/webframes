var nopter = require("nopter");
var path   = require("path");

var pkg      = require("../../package.json");
var validate = require("./validate");



nopter.config(
{
	name:        pkg.name,
	description: pkg.description,
	version:     pkg.version,
	options:
	{
		"contain":
		{
			short: "c",
			info: "Contain export within an <image> data-uri.",
			type: Boolean
		},
		"export":
		{
			info: "The exported SVG file.",
			type: path
		},
		"file":
		{
			info: "A file to import. Can be used multiple times.",
			type: [Array,path]
		},
		"folder":
		{
			info: "A folder of files to import.",
			type: path
		},
		"help":
		{
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean
		},
		"lossy":
		{
			short: "l",
			info: "Use lossy (JPEG) compression.",
			type: Boolean
		},
		"lossy-png":
		{
			short: "p",
			info: "Use lossy (JPEG) compression on 24-bit transparent PNGs.",
			type: Boolean
		},
		/*"minify-import":
		{
			short: "m",
			info: "Minify files when importing.",
			type: Boolean
		},*/
		"open":
		{
			info: "A project file to open.",
			type: path
		},
		"quality":
		{
			info: "Lossy compression level (0–100, default=80).",
			type: Number
		},
		"save":
		{
			info: "The saved project file (*.wfp).",
			type: path
		},
		"version":
		{
			short: "v",
			info: "Print the "+pkg.name+" version.",
			type: Boolean
		}
	}
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
	
	// Entitled "file" because of how it's used in a command line
	// Renamed to "files" because of how it's used programmatically
	if (options.file)
	{
		options.files = options.file;
		delete options.file;
	}
	
	validate(options);
	
	require("../index")(options);
}



module.exports = cli;
