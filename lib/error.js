function _error(name, type, message)
{
	var error = new Error(message);
	error.name = name;
	error.webframes = { type:type };
	
	throw error;
}



/*
	{{test}}
	{{test-var}}
	{{test-var|testVar}}
*/
function _parse(message, cli)
{
	var cliVar = "([^}|]+)";
	var renamedVar = "\\|?([^}]+)?";
	var vars = "\\{\\{"+cliVar+renamedVar+"}}";
	vars = "("+vars+")";
	
	return message.replace( new RegExp(vars,"g"), function(match, p1, p2, p3, offset, string)
	{
		var newString = (!cli && p3) ? p3 : p2;
		
		if (cli) newString = "--" + newString;
		
		return newString;
	});
}



function file(message, cli)
{
	_error( "File Error", "file", _parse(message,cli) );
}



function option(message, cli)
{
	_error( "Option Error", "option", _parse(message,cli) );
}



module.exports =
{
	file:   file,
	option: option
};
