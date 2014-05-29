var expect    = require("chai").expect;
var util      = require("./util");
var webframes = require("../lib");



describe("JPEG sequence", function()
{
	describe("that's already compressed", function()
	{
		it("should convert", function(done)
		{
			this.timeout(15000);
			
			var files = util.getFileList(__dirname+"/fire/jpg/compressed/");
			
			webframes( files, function(svg)
			{
				//expect(svg).to.equal(expectedResult);
				
				require("fs").writeFileSync( require("path").resolve(__dirname+"/fire/test.svg"), svg);
				
				done();
			});
		});
	});
});
