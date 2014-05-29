var fs   = require("fs");
var path = require("path");



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



module.exports =
{
	getFileList: getFileList
};
