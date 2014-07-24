var expect = require("chai").expect;
var fs     = require("fs");
var util   = require("./util");



describe("Command line", function()
{
	it("should import files and export", function(done)
	{
		var input1 = __dirname+"/2-frames/opaque/gif/1.gif";
		var input2 = __dirname+"/2-frames/opaque/gif/2.gif";
		var output = __dirname+"/2-frames/opaque_cli_test.svg";
		
		util.shell(["--file",input1,"--file",input2,"--export",output], function(error, stdout, stderr)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should import folder and export", function(done)
	{
		var input  = __dirname+"/2-frames/opaque/gif";
		var output = __dirname+"/2-frames/opaque_cli_test.svg";
		
		util.shell(["--folder",input,"--export",output], function(error, stdout, stderr)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should import folder and save", function(done)
	{
		var input  = __dirname+"/2-frames/opaque/gif";
		var output = __dirname+"/2-frames/opaque_cli_test.wfp";
		
		util.shell(["--folder",input,"--save",output], function(error, stdout, stderr)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should import folder, export and save", function(done)
	{
		var input   = __dirname+"/2-frames/opaque/gif";
		var output1 = __dirname+"/2-frames/opaque_cli_test.svg";
		var output2 = __dirname+"/2-frames/opaque_cli_test.wfp";
		
		util.shell(["--folder",input,"--export",output1,"--save",output2], function(error, stdout, stderr)
		{
			// Remove files
			if (!error)
			{
				fs.unlinkSync(output1);
				fs.unlinkSync(output2);
			}
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it.skip("should set custom duration", function(done)
	{
		done();
	});
});
