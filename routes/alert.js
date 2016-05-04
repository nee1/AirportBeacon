// var mysql = require('./mysql');
var Alert = require('./model/alert');
// var Sequelize = require('sequelize');
// var sequelize = mysql.sequelize;
 var resGen = require('./commons/responseGenerator');

exports.getAlerts = function(req, res){

	var email = req.param("email");
	var pass = req.param("pass");
	var json_responses;
	
	Alert.find({isActive:true}, function(err,results) {
		if(err){
			console.log(err);
			res.send(resGen.responseGenerator(400,null));
		}
		else{
			console.log("results : "+results);
			if(!results){
				console.log("No alerts!");
				res.send(resGen.responseGenerator(400,null));
			}else {
				console.log(results);
				res.send(resGen.responseGenerator(200,results));
			}

		}
	});
}

exports.editAlert = function(req, res){

	
	Alert.findOne({alert_id:req.param("alert_id")}, function(err,result) {
		if(err){
			console.log(err);
			res.send(resGen.responseGenerator(400,null));
		}
		else{
			console.log("result : "+result);
			if(!result){
				console.log("No alerts!");
				res.send(resGen.responseGenerator(400,null));
			}else {
				result.beacon= req.param("beacon");
		        result.name= req.param("name");
		        result.status= req.param("status");
		        result.alert_type = req.param("alert_type");
		        result.image= "/img/image-"+req.param("alert_type")+".jpg";
		        result.save(function(err,doc){
					if(err){
						res.send(resGen.responseGenerator(400,null));
					}
				});
				console.log(result);
				res.send(resGen.responseGenerator(200,result));
			}

		}
	});
}



exports.createAlert = function(req,res){
	var alert = Alert({
		beacon: req.param("beacon"),
        name: req.param("name"),
        status: req.param("status"),
        image: "/img/image-"+req.param("alert_type")+".jpg",
        alert_type: req.param("alert_type")
	});

	alert.save(function(err,result){
		if(err){
			console.log("err:"+err);
			resGen.responseGenerator(400,null);
		}
		else{
			
			console.log("result :"+result);
			if(!result){
				console.log("result null addAlert");
				res.send(resGen.responseGenerator(400,null));
			}
			else{
				res.send(resGen.responseGenerator(200,result));
			}			
		}
	});
}

exports.deleteAlert = function(req,res){
	Alert.findOne({alert_id:req.param("alert_id")}, function(err,result) {
		if(err){
			console.log(err);
			res.send(resGen.responseGenerator(400,null));
		}
		else{
			//console.log("result : "+result);
			if(!result){
				console.log("No alerts!");
				res.send(resGen.responseGenerator(400,null));
			} else {
				result.isActive = false;
				result.save(function(err,doc){
					if(err){
						res.send(resGen.responseGenerator(400,null));
					}
				});
				console.log(result.isActive);
				res.send(resGen.responseGenerator(200,result.isActive));
			}
		}
	});	
}

