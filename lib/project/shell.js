var version = require("../../package.json").version;



function shell(data, callback)
{
	data.project.frames = [];
	data.project.media  = [];
	data.project.version = version;
	
	callback(null, data);
}



module.exports = shell;
