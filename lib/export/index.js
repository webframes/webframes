var async     = require("async");

var compress  = require("./compress");
var container = require("./container");
var convert   = require("./convert");
var frames    = require("../util/frames");
var minify    = require("./minify");



function exportFile(data, callback)
{
	async.waterfall(
	[
		function(      seriesCallback){  compress(data, seriesCallback) },
		function(data, seriesCallback){    frames(data, seriesCallback) },
		function(svg,  seriesCallback){   convert(svg,  seriesCallback) },
		function(svg,  seriesCallback){    minify(svg,  seriesCallback) },
		function(svg,  seriesCallback){ container(svg,  seriesCallback) },
		function(svg,  seriesCallback){    minify(svg,  seriesCallback) }
	],
	function(error, result)
	{
		if (error) throw error;
		
		callback(null, result);
	});
}



module.exports = exportFile;