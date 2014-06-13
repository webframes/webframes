var async  = require("async");

var frames = require("../util/frames");



function saveProject(data, callback)
{
	async.waterfall(
	[
		function(seriesCallback){ frames(data, seriesCallback) }
	],
	function(error, result)
	{
		callback(null, result);
	});
}



module.exports = saveProject;