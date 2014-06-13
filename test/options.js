var expect = require("chai").expect;
var util   = require("./util");



describe("Options", function()
{
	it("contain", function(done)
	{
		// Compare size to expected SVG result (unminified SMIL)
		util.run(
		{
			options: { folder:util.resolvePath("2-frames/opaque/gif"), export:true, contain:true },
			expected: "2-frames/opaque/gif-expected-export.svg",
			callback: function(error, result, expectedResult)
			{
				expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
				done();
			}
		});
	});
	
	
	
	it("css-export", function(done)
	{
		// Compare size to expected SVG result (unminified SMIL)
		util.run(
		{
			options: { folder:util.resolvePath("2-frames/opaque/gif"), export:true, "css-export":true },
			expected: "2-frames/opaque/gif-expected-export.svg",
			callback: function(error, result, expectedResult)
			{
				expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
				done();
			}
		});
	});
});
