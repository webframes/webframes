var zlib = require("zlib");



function gzip(contents, callback)
{
	// TODO :: needs 0.12 for options
	zlib.gzip(contents, /*{level:9},*/ callback);
}



module.exports = gzip;
