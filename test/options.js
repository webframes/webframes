var expect = require("chai").expect;
var fs     = require("fs");
var util   = require("./util");



describe("Options", function()
{
	/*it.only("BUILD FILES", function(done)
	{
		require("async").parallel(
		[
			function(callback)
			{
				// Container expected SVG result
				util.run(
				{
					options: { input:util.resolvePath("2-frames/opaque/gif"), output:util.resolvePath("2-frames/opaque/gif-expected-(contained).svg"), contain:true },
					callback: callback
				});
			},
			function(callback)
			{
				// bgcolor expected SVG result
				util.run(
				{
					options: { input:util.resolvePath("2-frames/opaque/gif"), output:util.resolvePath("2-frames/opaque/gif-expected-(bgcolor).svg"), bgcolor:"blue" },
					callback: callback
				});
			}
		],
		function(error)
		{
			done();
		});
	});*/
	
	
	
	it("bgcolor", function(done)
	{
		util.run(
		{
			options: { input:util.resolvePath("2-frames/opaque/gif"), output:true, bgcolor:"blue" },
			expected: "2-frames/opaque/gif-expected-(bgcolor).svg",
			callback: function(error, result, expectedResult)
			{
				expect(result).to.equal( expectedResult.toString() );
				done();
			}
		});
	});
	
	
	
	it("contain", function(done)
	{
		util.run(
		{
			options: { input:util.resolvePath("2-frames/opaque/gif"), output:true, contain:true },
			expected: "2-frames/opaque/gif-expected-(contained).svg",
			callback: function(error, result, expectedResult)
			{
				expect(result).to.equal( expectedResult.toString() );
				done();
			}
		});
	});
	
	
	
	it("css", function(done)
	{
		// Compare size to expected SVG result (unminified SMIL)
		util.run(
		{
			options: { input:util.resolvePath("2-frames/opaque/gif"), output:true, css:true },
			expected: "2-frames/opaque/gif-expected.svg",
			callback: function(error, result, expectedResult)
			{
				expect( util.sizeOf(result) ).to.be.above( util.sizeOf(expectedResult) );
				done();
			}
		});
	});
	
	
	
	it("gzip", function(done)
	{
		var output = util.resolvePath("2-frames/gzip-test.svgz");
		
		// Compare size to expected SVG result (unminified SMIL)
		util.run(
		{
			options: { input:util.resolvePath("2-frames/opaque/gif"), output:output, gzip:true },
			expected: "2-frames/opaque/gif-expected.svg",
			callback: function(error, result, expectedResult)
			{
				if (!error)
				{
					result = fs.readFileSync(output);	// Use result from file
					fs.unlinkSync(output);	// Remove file
				}
				
				expect( util.sizeOf(result) ).to.be.below( util.sizeOf(expectedResult) );
				
				done();
			}
		});
	});
});
