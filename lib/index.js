var async = require("async");

var exportFile = require("./export");
var importFiles = require("./import");
//var saveProject = require("./project");
var user = require("./user");



function webframes(files, /*options,*/ callback)
{
	var action = "importExport";
	var task;
	
	switch (action)
	{
		case "importExport":
		{
			task =
			[
				function(      seriesCallback){ importFiles(files, seriesCallback) },
				function(data, seriesCallback){        user(data,  seriesCallback) },
				function(data, seriesCallback){  exportFile(data,  seriesCallback) }
			];
			
			break;
		}
		case "importSave":
		{
			task =
			[
				function(      seriesCallback){ importFiles(files, seriesCallback) },
				function(data, seriesCallback){ saveProject(data,  seriesCallback) }
			];
			
			break;
		}
		case "openExport":
		{
			task =
			[
				// TODO :: *.wfp (webframes project) or *.wfr (webframes) file ?
				function(      seriesCallback){ openProject(file, seriesCallback) },
				function(data, seriesCallback){  exportFile(data, seriesCallback) }
			];
			
			break;
		}
	}
	
	async.waterfall( task, function(error, result)
	{
		if (error) throw error;
		
		callback(result);
	});
}


module.exports = webframes;
