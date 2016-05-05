/**
 * http://usejsdoc.org/
 */
exports.getHelloWorld = function(req, res){
	console.log('getHelloWorld Method Call..');
	
	var response = { "message": "Hello World"};
	res.send(JSON.stringify(response));
	res.end();
};