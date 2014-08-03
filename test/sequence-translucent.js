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
					options: { folder:util.resolvePath("2-frames/translucent/png24"), export:util.resolvePath("2-frames/translucent/png24-expected-export.svg") },
					callback: callback
				});
			},
			function(callback)
			{
				// Expected WFP result
				util.run(
				{
					options: { folder:util.resolvePath("2-frames/translucent/png24"), save:util.resolvePath("2-frames/translucent/png24-expected-save.wfp") },
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
		it("should export lossless and unminified SMIL", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/translucent/png24"), export:true },
				expected: "2-frames/translucent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result.export).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should export lossless and unminified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { open:util.resolvePath("2-frames/translucent/png24-expected-save.wfp"), export:true },
				expected: "2-frames/translucent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result.export).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should export lossless and minified SMIL", function(done)
		{
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/translucent/png24"), export:true, minifyExport:true },
				expected: "2-frames/translucent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.export) ).to.be.below( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should export lossless and minified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { open:util.resolvePath("2-frames/translucent/png24-expected-save.wfp"), export:true, minifyExport:true },
				expected: "2-frames/translucent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.export) ).to.be.below( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should export lossy and unminified SMIL", function(done)
		{
			// TODO :: use cheerio to check image mimetypes?
			// TODO :: use cheerio to check css image-mask (disable auto-prefixer)?
			
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/translucent/png24"), export:true, lossy:true },
				expected: "2-frames/translucent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.export) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
		
		
		
		it("should export lossy and unminified SMIL (from project)", function(done)
		{
			// TODO :: use cheerio to check image mimetypes?
			// TODO :: use cheerio to check css image-mask (disable auto-prefixer)?
			
			// Compare to expected SVG result (lossless and unminified)
			util.run(
			{
				options: { open:util.resolvePath("2-frames/translucent/png24-expected-save.wfp"), export:true, lossy:true },
				expected: "2-frames/translucent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.export) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
		
		
		
		it("should export lossy and minified SMIL", function(done)
		{
			// Nothing to compare to
			// Just check that it doesn't crash
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/translucent/png24"), export:true, lossy:true, minifyExport:true },
				callback: function(error, result)
				{
					expect(error).to.be.null;
					done();
				}
			});
		});
		
		
		
		it("should export lossy and minified SMIL (from project)", function(done)
		{
			// Nothing to compare to
			// Just check that it doesn't crash
			util.run(
			{
				options: { open:util.resolvePath("2-frames/translucent/png24-expected-save.wfp"), export:true, lossy:true, minifyExport:true },
				callback: function(error, result)
				{
					expect(error).to.be.null;
					done();
				}
			});
		});
		
		
		
		it("should save an unminified project", function(done)
		{
			// Compare to expected WFP result
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/translucent/png24"), save:true },
				expected: "2-frames/translucent/png24-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect(result.save).to.deep.equal(expectedResult);
					done();
				}
			});
		});
		
		
		
		it("should save a minified project", function(done)
		{
			// Compare to expected WFP result (unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/translucent/png24"), save:true, minifyImport:true },
				expected: "2-frames/translucent/png24-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.save) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
	});
});
