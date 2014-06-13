var expect = require("chai").expect;
var util   = require("./util");



describe("Command line", function()
{
	it.skip("should import files and export", function(done)
	{
		var input  = __dirname+"/simple/test.svg";
		var output = __dirname+"/simple/test_output.svg";
		
		//util.shell(["--input",input,"--output",output], function(error, stdout, stderr)
		util.shell(["--help"], function(error, stdout, stderr)
		{
			console.log(stdout);
			
			// Remove file
			//if (!error) fs.unlinkSync(output);
			
			//expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it.skip("should import folder and export", function(done)
	{
		done();
	});
	
	
	
	it.skip("should import folder and save", function(done)
	{
		done();
	});
	
	
	
	it.skip("should import folder, export and save", function(done)
	{
		done();
	});
	
	
	
	it.skip("should set custom duration", function(done)
	{
		done();
	});
});
