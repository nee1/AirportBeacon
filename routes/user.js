
/*
 * GET users listing.
 */

exports.list = function(req, res){
	var ans = eval("8 + 5 * 6");
	res.send(JSON.stringify(ans));
};