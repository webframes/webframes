var expect = require("chai").expect;
var util   = require("./util");



describe("Translucent sequence", function()
{
	/*it.only("BUILD FILES", function(done)
	{
		require("async").parallel(
		[
			function(callback)
			{
				// Expected SVG result
				util.run(
				{
					options: { input:util.resolvePath("2-frames/translucent/png24"), output:util.resolvePath("2-frames/translucent/png24-expected.svg") },
					callback: callback
				});
			},
			function(callback)
			{
				// Expected WFP result
				util.run(
				{
					options: { input:util.resolvePath("2-frames/translucent/png24"), output:util.resolvePath("2-frames/translucent/png24-expected.wfp"), project:true },
					callback: callback
				});
			}
		],
		function(error)
		{
			done();
		});
	});*/
		
	
		
	describe("of 24-bit PNGs", function()
	{
		it("should output lossless and unminified SMIL", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { input:util.resolvePath("2-frames/translucent/png24"), output:true },
				expected: "2-frames/translucent/png24-expected.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should output lossless and unminified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { inputProject:util.resolvePath("2-frames/translucent/png24-expected.wfp"), output:true },
				expected: "2-frames/translucent/png24-expected.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should output lossless and minified SMIL", function(done)
		{
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { input:util.resolvePath("2-frames/translucent/png24"), output:true, minify:true },
				expected: "2-frames/translucent/png24-expected.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result) ).to.be.below( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should output lossless and minified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { inputProject:util.resolvePath("2-frames/translucent/png24-expected.wfp"), output:true, minify:true },
				expected: "2-frames/translucent/png24-expected.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result) ).to.be.below( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should output lossy and unminified SMIL", function(done)
		{
			// TODO :: use cheerio to check image mimetypes?
			// TODO :: use cheerio to check css image-mask (disable auto-prefixer)?
			
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { input:util.resolvePath("2-frames/translucent/png24"), output:true, lossy:true },
				expected: "2-frames/translucent/png24-expected.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
		
		
		
		it("should output lossy and unminified SMIL (from project)", function(done)
		{
			// TODO :: use cheerio to check image mimetypes?
			// TODO :: use cheerio to check css image-mask (disable auto-prefixer)?
			
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { inputProject:util.resolvePath("2-frames/translucent/png24-expected.wfp"), output:true, lossy:true },
				expected: "2-frames/translucent/png24-expected.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
		
		
		
		it("should output lossy and minified SMIL", function(done)
		{
			// Nothing to compare to
			// Just check that it doesn't crash
			util.run(
			{
				options: { input:util.resolvePath("2-frames/translucent/png24"), output:true, lossy:true, minify:true },
				callback: function(error, result)
				{
					expect(error).to.be.null;
					done();
				}
			});
		});
		
		
		
		it("should output lossy and minified SMIL (from project)", function(done)
		{
			// Nothing to compare to
			// Just check that it doesn't crash
			util.run(
			{
				options: { inputProject:util.resolvePath("2-frames/translucent/png24-expected.wfp"), output:true, lossy:true, minify:true },
				callback: function(error, result)
				{
					expect(error).to.be.null;
					done();
				}
			});
		});
		
		
		
		it("should output an unminified project", function(done)
		{
			// Compare to expected WFP result
			util.run(
			{
				options: { input:util.resolvePath("2-frames/translucent/png24"), output:true, project:true },
				expected: "2-frames/translucent/png24-expected.wfp",
				callback: function(error, result, expectedResult)
				{
					expect(result).to.deep.equal(expectedResult);
					done();
				}
			});
		});
		
		
		
		it("should output a minified project", function(done)
		{
			// Compare to expected WFP result (unminified)
			util.run(
			{
				options: { input:util.resolvePath("2-frames/translucent/png24"), output:true, project:true, minify:true },
				expected: "2-frames/translucent/png24-expected.wfp",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
	});
});
