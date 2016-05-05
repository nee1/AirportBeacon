var ejs = require('ejs');
var mysql = require('mysql');

exports.signin = function(req, res){
	
	res.renderFile('./views/signin.ejs', function(err, result){
		
		//render on success
		if(!err){
			res.end(result);
		}else{
			res.end('An Error Occured');
			console.log(err);
		}
	});
};