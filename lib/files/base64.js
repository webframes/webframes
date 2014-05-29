function base64(i, data, callback)
{
	data.files[i].contents = data.files[i].contents.toString("base64");
	
	callback();
}



module.exports = base64;
