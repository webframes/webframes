var expect = require("chai").expect;
var util   = require("./util");



describe("Transparent sequence", function()
{
	/*it.only("BUILD FILES", function(done)
	{
		var exports =
		[
			function(callback)
			{
				// GIF :: expected SVG result
				util.run(
				{
					options: { folder:util.resolvePath("2-frames/transparent/gif"), export:util.resolvePath("2-frames/transparent/gif-expected-export.svg") },
					callback: callback
				});
			},
			function(callback)
			{
				// PNG (8-bit) :: expected SVG result
				util.run(
				{
					options: { folder:util.resolvePath("2-frames/transparent/png8"), export:util.resolvePath("2-frames/transparent/png8-expected-export.svg") },
					callback: callback
				});
			},
			function(callback)
			{
				// PNG (24-bit) :: expected SVG result
				util.run(
				{
					options: { folder:util.resolvePath("2-frames/transparent/png24"), export:util.resolvePath("2-frames/transparent/png24-expected-export.svg") },
					callback: callback
				});
			}
		];
		
		var projects =
		[
			function(callback)
			{
				// GIF :: expected WFP result
				util.run(
				{
					options: { folder:util.resolvePath("2-frames/transparent/gif"), save:util.resolvePath("2-frames/transparent/gif-expected-save.wfp") },
					callback: callback
				});
			},
			function(callback)
			{
				// PNG (8-bit) :: expected WFP result
				util.run(
				{
					options: { folder:util.resolvePath("2-frames/transparent/png8"), save:util.resolvePath("2-frames/transparent/png8-expected-save.wfp") },
					callback: callback
				});
			},
			function(callback)
			{
				// PNG (24-bit) :: expected WFP result
				util.run(
				{
					options: { folder:util.resolvePath("2-frames/transparent/png24"), save:util.resolvePath("2-frames/transparent/png24-expected-save.wfp") },
					callback: callback
				});
			}
		];
		
		require("async").parallel( exports.concat(projects), function(){done()} );
	});*/
	
	
	
	describe("of GIFs", function()
	{
		it("should export unlossy and unminified SMIL", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/gif"), export:true },
				expected: "2-frames/transparent/gif-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result.export).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should export unlossy and unminified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { open:util.resolvePath("2-frames/transparent/gif-expected-save.wfp"), export:true },
				expected: "2-frames/transparent/gif-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result.export).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should export unlossy and minified SMIL", function(done)
		{
			// Compare size to expected SVG result (unlossy and unminified SMIL)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/gif"), export:true, "minify-export":true },
				expected: "2-frames/transparent/gif-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.export) ).to.be.below( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should export unlossy and minified SMIL (from project)", function(done)
		{
			// Compare size to expected SVG result (unlossy and unminified SMIL)
			util.run(
			{
				options: { open:util.resolvePath("2-frames/transparent/gif-expected-save.wfp"), export:true, "minify-export":true },
				expected: "2-frames/transparent/gif-expected-export.svg",
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
			// Compare to expected SVG result (unlossy and unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/gif"), export:true, lossy:true },
				expected: "2-frames/transparent/gif-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					// Two JPEGs are larger than a single GIF
					expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should export lossy and unminified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result (unlossy and unminified)
			util.run(
			{
				options: { open:util.resolvePath("2-frames/transparent/gif-expected-save.wfp"), export:true, lossy:true },
				expected: "2-frames/transparent/gif-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					// Two JPEGs are larger than a single GIF
					expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
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
				options: { folder:util.resolvePath("2-frames/transparent/gif"), export:true, lossy:true, "minify-export":true },
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
				options: { open:util.resolvePath("2-frames/transparent/gif-expected-save.wfp"), export:true, lossy:true, "minify-export":true },
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
				options: { folder:util.resolvePath("2-frames/transparent/gif"), save:true },
				expected: "2-frames/transparent/gif-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect(result.save).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should save a minified project", function(done)
		{
			// Compare to expected WFP result (unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/gif"), save:true, "minify-import":true },
				expected: "2-frames/transparent/gif-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.save) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
	});
	
	
	
	describe("of PNGs (8-bit)", function()
	{
		it("should export unlossy and unminified SMIL", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/png8"), export:true },
				expected: "2-frames/transparent/png8-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result.export).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should export unlossy and unminified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { open:util.resolvePath("2-frames/transparent/png8-expected-save.wfp"), export:true },
				expected: "2-frames/transparent/png8-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect(result.export).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should export unlossy and minified SMIL", function(done)
		{
			// Compare to expected SVG result (unlossy and unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/png8"), export:true, "minify-export":true },
				expected: "2-frames/transparent/png8-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.export) ).to.be.below( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should export unlossy and minified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result (unlossy and unminified)
			util.run(
			{
				options: { open:util.resolvePath("2-frames/transparent/png8-expected-save.wfp"), export:true, "minify-export":true },
				expected: "2-frames/transparent/png8-expected-export.svg",
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
			// Compare to expected SVG result (unlossy and unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/png8"), export:true, lossy:true },
				expected: "2-frames/transparent/png8-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					// Two JPEGs are larger than a single GIF
					expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
					done();
				}
			});
		});
		
		
		
		it("should export lossy and unminified SMIL (from project)", function(done)
		{
			// Compare to expected SVG result (unlossy and unminified)
			util.run(
			{
				options: { open:util.resolvePath("2-frames/transparent/png8-expected-save.wfp"), export:true, lossy:true },
				expected: "2-frames/transparent/png8-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					// Two JPEGs are larger than a single GIF
					expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
					expect( util.sizeOf(result.export) ).to.be.above(700);	// size without images
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
				options: { folder:util.resolvePath("2-frames/transparent/png8"), export:true, lossy:true, "minify-export":true },
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
				options: { open:util.resolvePath("2-frames/transparent/png8-expected-save.wfp"), export:true, lossy:true, "minify-export":true },
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
				options: { folder:util.resolvePath("2-frames/transparent/png8"), save:true },
				expected: "2-frames/transparent/png8-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect(result.save).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should save a minified project", function(done)
		{
			// Compare to expected WFP result (unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/png8"), save:true, "minify-import":true },
				expected: "2-frames/transparent/png8-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.save) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
	});
	
	
	
	describe("of PNGs (24-bit)", function()
	{
		it("should export lossless and unminified SMIL", function(done)
		{
			// Compare to expected SVG result
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/png24"), export:true },
				expected: "2-frames/transparent/png24-expected-export.svg",
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
				options: { open:util.resolvePath("2-frames/transparent/png24-expected-save.wfp"), export:true },
				expected: "2-frames/transparent/png24-expected-export.svg",
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
				options: { folder:util.resolvePath("2-frames/transparent/png24"), export:true, "minify-export":true },
				expected: "2-frames/transparent/png24-expected-export.svg",
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
				options: { open:util.resolvePath("2-frames/transparent/png24-expected-save.wfp"), export:true, "minify-export":true },
				expected: "2-frames/transparent/png24-expected-export.svg",
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
				options: { folder:util.resolvePath("2-frames/transparent/png24"), export:true, lossy:true, "lossy-png":true },
				expected: "2-frames/transparent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					// Example with simple colors is smaller than a PNG
					expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
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
				options: { open:util.resolvePath("2-frames/transparent/png24-expected-save.wfp"), export:true, lossy:true, "lossy-png":true },
				expected: "2-frames/transparent/png24-expected-export.svg",
				callback: function(error, result, expectedResult)
				{
					// Example with simple colors is smaller than a PNG
					expect( util.sizeOf(result.export) ).to.be.above( util.sizeOf(expectedResult) );
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
				options: { folder:util.resolvePath("2-frames/transparent/png24"), export:true, lossy:true, "minify-export":true },
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
				options: { open:util.resolvePath("2-frames/transparent/png24-expected-save.wfp"), export:true, lossy:true, "minify-export":true },
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
				options: { folder:util.resolvePath("2-frames/transparent/png24"), save:true },
				expected: "2-frames/transparent/png24-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect(result.save).to.equal( expectedResult.toString() );
					done();
				}
			});
		});
		
		
		
		it("should save a minified project", function(done)
		{
			// Compare to expected WFP result (unminified)
			util.run(
			{
				options: { folder:util.resolvePath("2-frames/transparent/png24"), save:true, "minify-import":true },
				expected: "2-frames/transparent/png24-expected-save.wfp",
				callback: function(error, result, expectedResult)
				{
					expect( util.sizeOf(result.save) ).to.be.below( util.sizeOf(expectedResult) );
					done();
				}
			});
		});
	});
});
