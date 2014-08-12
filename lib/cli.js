var nopter = require("nopter");
var path   = require("path");

var defaults = require("./defaults");
var pkg      = require("../package.json");



// TODO :: add commands like "build" and "smil2css" which are plugins
// example: webframes BUILD --input asdf --output asdf.svg
// example: webframes SMIL2CSS before.svg after.svg
nopter.config(
{
	name:        pkg.name,
	description: pkg.description,
	version:     pkg.version,
	options:
	{
		"bgcolor":
		{
			short: "b",
			info: "Background color (default="+defaults.bgcolor+").",
			type: String
		},
		"contain":
		{
			short: "C",
			info: "Contain output within a data-uri <image>.",
			type: Boolean,
			sort: "Toggles"
		},
		"css":
		{
			short: "c",
			info: "Output as CSS animations.",
			type: Boolean,
			sort: "Toggles"
		},
		"duration":
		{
			short: "d",
			info: "The duration of each frame in milliseconds (default="+defaults.duration+").",
			type: Number
		},
		/*"durations":
		{
			short: "D",
			info: "A comma-separated list of durations for each frame in milliseconds.",
			type: String
		},*/
		"gzip":
		{
			short: "z",
			info: "Compress output with gzip.",
			type: Boolean,
			sort: "Toggles"
		},
		/*"hash":
		{
			info: "Starts animation only with specific hash/anchor.",
			type: String
		},
		"hash-frame":
		{
			rename: "hashFrame",
			info: "Initial frame of animation before hash specified.",
			type: Number
		},*/
		"height":
		{
			short: "h",
			info: "Output height (default=tallest).",
			type: Number
		},
		"help":
		{
			short: ["H","?"],
			info: "Display this help text.",
			type: Boolean,
			sort: "Toggles"
		},
		"input":
		{
			short: "i",
			info: "An image or a folder of images. Can be used multiple times.",
			type: [Array,path]
		},
		"input-project":
		{
			// TODO :: merge with input
			rename: "inputProject",
			short: "I",
			info: "A project file.",
			type: path
		},
		/*"iterations":
		{
			short: "I",
			info: "The number of times the animation should be played (>0, default="+defaults.iterations+").",
			type: [Number,String]
		},*/
		/*"loop":
		{
			short: "L",
			info: "Endless repeat playback."
			type: Boolean,
			sort: "Toggles"
		},*/
		"lossy":
		{
			short: "l",
			info: "Use lossy (JPEG) compression.",
			type: Boolean,
			sort: "Toggles"
		},
		"minify":
		{
			short: "m",
			info: "Minify output media.",
			type: Boolean,
			sort: "Toggles"
		},
		"output":
		{
			short: "o",
			info: "Output file (*.svg|svgz|wfp, default STDOUT).",
			type: path
		},
		"project":
		{
			short: "p",
			info: "Output is a project.",
			type: Boolean,
			sort: "Toggles"
		},
		"quality":
		{
			short: "q",
			info: "Lossy compression level (0–100, default="+defaults.quality+").",
			type: Number
		},
		/*"verbose":
		{
			short: "v",
			info: "Output all messages.",
			type: Boolean,
			sort: "Toggles"
		},*/
		"version":
		{
			short: "V",
			info: "Display the "+pkg.name+" version.",
			type: Boolean,
			sort: "Toggles"
		},
		"width":
		{
			short: "w",
			info: "Output width (default=widest).",
			type: Number
		}
	}
});



function cli()
{
	var options = nopter.input();
	
	if (options.help)
	{
		console.log( nopter.help() );
	}
	else if (options.version)
	{
		console.log(pkg.version);
	}
	else
	{
		// Used for errors
		options.cli = true;
		
		run(options);
	}
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
		else if (typeof options.output != "string")
		{
			process.stdout.write( result.toString() );
		}
		/*else
		{
			console.log("Wrote file "+options.output);
		}*/
	});
}



module.exports = cli;
