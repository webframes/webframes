var async         = require("async");
var child_process = require("child_process");
var fs            = require("fs");
var junk          = require("junk");
var path          = require("path");
var webframes     = require("../lib");



function getFileList(filesPath)
{
	filesPath = resolvePath(filesPath);
	var files = [];
	
	fs.readdirSync(filesPath).forEach( function(fileName)
	{
		if (junk.not(fileName))
		{
			files.push( filesPath +"/"+ fileName );
		}
	});
	
	return files;
}



function loadFile(relativePath)
{
	return fs.readFileSync( resolvePath(relativePath), {encoding:"utf8"} );
}



function resolvePath(_path)
{
	return path.resolve(__dirname, _path);
}



function run(options)
{
	var task = [];
	
	if (options.expected)
	{
		task.push( function(parallelCallback){ fs.readFile( resolvePath(options.expected), parallelCallback ) } );
	}
	
	task.push( function(parallelCallback){ webframes(options.options, parallelCallback) } );
	
	async.parallel(task, function(error, results)
	{
		if (error) throw error;
		
		if (options.callback)
		{
			var result   = (options.expected) ? results[1] : results[0];
			var expected = (options.expected) ? results[0] : null;
			
			options.callback(null, result, expected);
		}
	});
}



function shell(args, callback)
{
	args = ["../bin/webframes"].concat(args);
	
	child_process.execFile("node", args, {cwd:__dirname}, callback);
}



function sizeOf(string)
{
	return new Buffer(string).length;
}



module.exports =
{
	getFileList: getFileList,
	loadFile:    loadFile,
	resolvePath: resolvePath,
	run:         run,
	shell:       shell,
	sizeOf:      sizeOf
};
