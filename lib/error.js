function _error(name, type, message)
{
	var error = new Error(message);
	error.name = name;
	error.webframes = { type:type };
	
	throw error;
}



function _parse(message, cli)
{
	var pattern = /(\{\{(\w+)}})/g;
	
	if (cli)
	{
		// `file` gets renamed to `files` in ./cli.js
		message = message.replace(/(\{\{files}})/g, "{{file}}");
		message = message.replace(pattern, "--$2");
		return message;
	}
	else
	{
		return message.replace(pattern, "$2");
	}
}



function option(message, cli)
{
	_error( "Option Error", "option", _parse(message,cli) );
}



module.exports =
{
	option: option
};
