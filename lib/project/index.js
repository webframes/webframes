function shell(data, callback)
{
	//data.project.frames = [];
	data.project.media  = [];
	data.project.version = data.version;
	
	callback(null, data);
}



module.exports =
{
	export: require("./export"),
	open:   require("./open"),
	save:   require("./save"),
	shell:  shell
};
