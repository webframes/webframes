var defaults = require("../defaults");
var _open    = require("./open");



function open(data, callback)
{
	_open(data, function()
	{
		options(data);
		
		callback(null, data);
	});
}



function option(data, optionName)
{
	if (data.options[optionName] != undefined)
	{
		data.project[optionName] = data.options[optionName];
	}
}



function options(data)
{
	option(data, "bgcolor");
	option(data, "height");
	//option(data, "iterations");
	option(data, "width");
}



function shell(data, callback)
{
	data.project =
	{
		bgcolor:    defaults.bgcolor,
		//frames:     [],
		height:     null,
		//iterations: defaults.iterations,
		media:      [],
		version:    data.version,
		width:      null
	};
	
	options(data);
	
	callback(null, data);
}



module.exports =
{
	export: require("./export"),
	open:   open,
	save:   require("./save"),
	shell:  shell
};
