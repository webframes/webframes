var async     = require("async");

var container = require("./container");
var convert   = require("./convert");
var frames    = require("./frames");
var optimize  = require("./optimize");



function getSVG(files, callback)
{
	async.waterfall(
	[
		function(     seriesCallback){    frames(files, seriesCallback) },
		function(svg, seriesCallback){   convert(svg,   seriesCallback) },
		function(svg, seriesCallback){  optimize(svg,   seriesCallback) },
		function(svg, seriesCallback){ container(svg,   seriesCallback) },
		function(svg, seriesCallback){  optimize(svg,   seriesCallback) }
	],
	function(error, result)
	{
		if (error) throw error;
		
		callback(null, result);
	});
}



module.exports = getSVG;