// var mysql = require('./mysql');
// var alerts = require('./model/alert_model');
// var Sequelize = require('sequelize');
// var sequelize = mysql.sequelize;
// var resGen = require('./commons/responseGenerator');

exports.getAlerts = function(req, res){

	// var email = req.param("email");
	// var pass = req.param("pass");
	// var json_responses;
	// console.log("here");
	// alerts.sync();

	// alerts.findAll({})
	// .then(function(results) {
	// 	//here result is a large object from which data comes in dataValues object
	// 	//console.log(result);
	// 	var data = [];
	// 	console.log(results[0].dataValues);
	// 	if(results == null){
	// 		console.log("Unsuccessful Login!");
	// 	}else {
	// 		for(result in results){
	// 			data.push(results[result].dataValues);
	// 		}
	// 		console.log(data);
	// 		res.send(resGen.responseGenerator(200,data));
	// 		//console.log(result.dataValues);
	// 	}
	// })
	// .catch(function(error) {
	// 	console.log("Error : " + error);
	// });
}


exports.createAlert = function(req,res){
	// alerts.sync();
	// //add data in mysql
 //    alerts.create({
 //        //id - autoIncrement by default by sequelize
 //        beacon: req.param("beacon"),
 //        name: req.param("name"),
 //        status: req.param("status"),
 //        createdAt: Date.now(),
 //        image: "/img/image-"+req.param("alert_type")+".jpg"
	// }).then(function(result){
	// 	if(result == null){
	// 		console.log("resulr null addAlert");
	// 		res.send(resGen.responseGenerator(400,null));
	// 	}
	// 	else{
	// 		res.send(resGen.responseGenerator(200,result));
	// 	}
	// })
	// .catch(function(error) {
	// 	console.log("Error : " + error);
	// 	res.send(resGen.responseGenerator(400,null));
	// });
}

