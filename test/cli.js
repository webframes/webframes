var expect = require("chai").expect;
var fs     = require("fs");
var util   = require("./util");



describe("Command line", function()
{
	it("should output an image (from files)", function(done)
	{
		var input1 = __dirname+"/2-frames/opaque/gif/1.gif";
		var input2 = __dirname+"/2-frames/opaque/gif/2.gif";
		var output = __dirname+"/2-frames/opaque-cli-test.svg";
		
		util.shell(["--input",input1,"--input",input2,"--output",output], function(error, stdout, stderr)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should output an image (from a folder)", function(done)
	{
		var input  = __dirname+"/2-frames/opaque/gif";
		var output = __dirname+"/2-frames/opaque-cli-test.svg";
		
		util.shell(["--input",input,"--output",output], function(error, stdout, stderr)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should output a project (from a folder)", function(done)
	{
		var input  = __dirname+"/2-frames/opaque/gif";
		var output = __dirname+"/2-frames/opaque-cli-test.wfp";
		
		util.shell(["--input",input,"--output",output,"--project"], function(error, stdout, stderr)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should output an image (from a project)", function(done)
	{
		var input  = __dirname+"/2-frames/opaque/gif-expected.wfp";
		var output = __dirname+"/2-frames/opaque-cli-test.svg";
		
		util.shell(["--input-project",input,"--output",output], function(error, stdout, stderr)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it.skip("should set custom duration", function(done)
	{
		done();
	});
});
