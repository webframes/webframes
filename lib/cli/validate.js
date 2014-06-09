var nopter = require("nopter");

var useHelp = "Use --help for more options";



function validate(options)
{
	//console.log(options);
	
	if (!options.files && !options.folder && !options.open)
	{
		// Be careful to use "--file" and not "--files"
		return console.log( nopter.error.fatal("Must specify --file or --folder or --open", useHelp) );
	}
	
	if (options.files && options.folder)
	{
		// Be careful to use "--file" and not "--files"
		return console.log( nopter.error.fatal("Cannot use both --file and --folder", useHelp) );
	}
	
	if (options.files && options.open)
	{
		// Be careful to use "--file" and not "--files"
		return console.log( nopter.error.fatal("Cannot use both --file and --open", useHelp) );
	}
	
	if (options.folder && options.open)
	{
		return console.log( nopter.error.fatal("Cannot use both --folder and --open", useHelp) );
	}
	
	if (!options.export && !options.save)
	{
		return console.log( nopter.error.fatal("Must specify --export and/or --save", useHelp) );
	}
	
	if (options.save)
	{
		if ( /\.wfp$/.test(options.save) == false )
		{
			options.save += ".wfp";
		}
	}
}



module.exports = validate;
