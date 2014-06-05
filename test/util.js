var child_process = require("child_process");
var fs            = require("fs");
var path          = require("path");



function getFileList(filesPath)
{
	filesPath = path.resolve(filesPath);
	var files = [];
	
	fs.readdirSync(filesPath).forEach( function(fileName)
	{
		if (fileName!=".DS_Store" && fileName!="thumbs.db")
		{
			files.push( filesPath +"/"+ fileName );
		}
	});
	
	return files;
}



function shell(args, callback)
{
	args = ["../bin/webframes"].concat(args);
	
	child_process.execFile("node", args, {cwd:__dirname}, callback);
}



module.exports =
{
	getFileList: getFileList,
	shell:       shell
};
