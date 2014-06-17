var nopter = require("nopter");
var path   = require("path");

var defaults = require("./defaults");
var pkg      = require("../package.json");



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
			info: "Contain export within a data-uri <image>.",
			type: Boolean
		},
		"duration":
		{
			info: "The duration of each frame in milliseconds (default="+defaults.duration+").",
			type: Number
		},
		/*"durations":
		{
			info: "A comma-separated list of durations for each frame in milliseconds.",
			type: String
		},*/
		"css-export":
		{
			short: "a",
			info: "Export as CSS animations.",
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
		"minify-export":
		{
			short: "e",
			info: "Minify media on export.",
			type: Boolean
		},
		"minify-import":
		{
			short: "i",
			info: "Minify media on import.",
			type: Boolean
		},
		"open":
		{
			info: "A project file to open.",
			type: path
		},
		"quality":
		{
			info: "Lossy compression level (0–100, default="+defaults.quality+").",
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
	
	// Used for errors
	options.cli = true;
	
	run(options);
}



function run(options)
{
	require("./index")(options, function(error, result)
	{
		if (error)
		{
			if (error.webframes)
			{
				var message;
				
				switch (error.webframes.type)
				{
					case "file":
					case "option":    message = nopter.error.fatal(error, "Use --help for more options", "Error");    break;
					
					default:          message = nopter.error.fatal(error, "Use --help for more options"         );    break;
				}
				
				console.log(message);
			}
			else
			{
				throw error;
			}
		}
		// else file already written
	});
}



module.exports = cli;
