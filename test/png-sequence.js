var expect    = require("chai").expect;
var util      = require("./util");
var webframes = require("../lib");



describe("PNG sequence", function()
{
	describe("with transparency", function()
	{
		it("should convert", function(done)
		{
			this.timeout(55000);
			
			var files = util.getFileList(__dirname+"/fire/png24/matted/");
			
			webframes( files, function(svg)
			{
				//expect(svg).to.equal(expectedResult);
				
				require("fs").writeFileSync( require("path").resolve(__dirname+"/fire/test-png24.svg"), svg );
				
				done();
			});
		});
	});
});
