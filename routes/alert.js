// var mysql = require('./mysql');
var Alert = require('./model/alert');
// var Sequelize = require('sequelize');
// var sequelize = mysql.sequelize;
 var resGen = require('./commons/responseGenerator');
var Canvas = require('canvas')
, Image = Canvas.Image
  , canvas = new Canvas(600, 300)
  , ctx = canvas.getContext('2d')
,fs = require('fs');

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
			//console.log("results : "+results);
			if(!results){
				console.log("No alerts!");
				res.send(resGen.responseGenerator(400,null));
			}else {
				//console.log(results);
				

				// Grab the Canvas and Drawing Context
				//var canvas = document.getElementById('c');
				//var ctx = canvas.getContext('2d');
				ctx.fillStyle = "rgba(255, 255, 255, 1)";
				ctx.fillRect(0, 0, 600, 300);


				function circle(x, y, r, c) {
				  ctx.beginPath();
				  var rad = ctx.createRadialGradient(x, y, 1, x, y, r);
				  rad.addColorStop(0, c);
				  rad.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
				  ctx.fillStyle = rad;
				  //gradient.addColorStop(0,"white");
				  //gradient.addColorStop(1,"green");
				  //ctx.fillStyle = gradient;
				  ctx.arc(x, y, r, 0, Math.PI * 2, false);
				  ctx.fill();
				}
				var x,y,beacon;
				for(result in results){
					beacon = results[result].beacon;						
					if(beacon<4){
						y=75;
					}else{
						y=225;
					}
					if(beacon%3 == 1){x=75;}
					else if(beacon%3 == 2){x=225;}
					else {x=375;}
					//console.log(x+" "+y+" beacon:"+beacon);
					circle(x,y,75,'red');
				}
				for(i=1;i<7;i++){
					ctx.font = '25px Impact';
					//ctx.rotate(.1);
					if(i<4){ y=75 } else { y=225 }					
					if(i%3==1){x=70} else if(i%3==2){x=220} else {x=370}	
					//console.log(i+"x :: "+x+" y::"+y);
					ctx.fillStyle = "#00ff00";  //<======= and here

					ctx.fillText(i, x, y);
				}
					
				//circle(75, 75, 75, 'red');
				//circle(225, 75, 75, 'red');
				//circle(375, 75, 75, 'red');
				//circle(75, 225, 75, 'red');
				//circle(225, 225, 75, 'red');
				//circle(375, 225, 75, 'red');

				//circle(75, 75, 75, 'yellow');

				ctx.save();
				//var img = document.createElement('IMG');
				//img.src = "E:/user.jpg";
				//ctx.drawImage(img, 10, 10);
				//	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";  
				//		ctx.fillRect(50, 0, 50, 50);

				//ctx.font = '30px Impact';
				//ctx.rotate(.1);
				//ctx.fillText("Awesome!", 50, 100);

				//var te = ctx.measureText('Awesome!');
				//ctx.strokeStyle = 'rgba(0,0,0,0.5)';
				//ctx.beginPath();
				//ctx.lineTo(50, 102);
				//ctx.lineTo(50 + te.width, 102);
				//ctx.stroke();
				//var lingrad = ctx.createLinearGradient(0,0,0,150);
				//lingrad.addColorStop(0, '#00ABEB');
				//lingrad.addColorStop(0.5, '#fff');
				//lingrad.addColorStop(0.5, '#26C000');
				//lingrad.addColorStop(1, '#fff');

				//var lingrad2 = ctx.createLinearGradient(0,50,0,95);
				//lingrad2.addColorStop(0.5, '#000');
				//lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

				// assign gradients to fill and stroke styles
				//ctx.fillStyle = lingrad;
				//ctx.strokeStyle = lingrad2;

				// draw shapes
				//ctx.fillRect(10,10,130,130);
				//ctx.strokeRect(50,50,50,50);

				var out = fs.createWriteStream(__dirname + '/gradients.png')
				  , stream = canvas.createPNGStream();

				stream.on('data', function(chunk){
				  out.write(chunk);
				});
				//console.log('<img src="' + canvas.toDataURL() + '" />');
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
						console.log(err)
						res.send(resGen.responseGenerator(400,null));
						// Grab the Canvas and Drawing Context
						//var canvas = document.getElementById('c');
						//var ctx = canvas.getContext('2d');
						ctx.fillStyle = "rgba(255, 255, 255, 1)";
						ctx.fillRect(0, 0, 600, 300);


						function circle(x, y, r, c) {
						  ctx.beginPath();
						  var rad = ctx.createRadialGradient(x, y, 1, x, y, r);
						  rad.addColorStop(0, c);
						  rad.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
						  ctx.fillStyle = rad;
						  //gradient.addColorStop(0,"white");
						  //gradient.addColorStop(1,"green");
						  //ctx.fillStyle = gradient;
						  ctx.arc(x, y, r, 0, Math.PI * 2, false);
						  ctx.fill();
						}
						var x,y,beacon;
						for(result in results){
							beacon = results[result].beacon;						
							if(beacon<4){
								y=75;
							}else{
								y=225;
							}
							if(beacon%3 == 1){x=75;}
							else if(beacon%3 == 2){x=225;}
							else {x=375;}
							//console.log(x+" "+y+" beacon:"+beacon);
							circle(x,y,75,'red');
						}
						for(i=1;i<7;i++){
							ctx.font = '25px Impact';
							//ctx.rotate(.1);
							if(i<4){ y=75 } else { y=225 }					
							if(i%3==1){x=70} else if(i%3==2){x=220} else {x=370}	
							//console.log(i+"x :: "+x+" y::"+y);
							ctx.fillStyle = "#00ff00";  //<======= and here

							ctx.fillText(i, x, y);
						}
					
						//circle(75, 75, 75, 'red');
						//circle(225, 75, 75, 'red');
						//circle(375, 75, 75, 'red');
						//circle(75, 225, 75, 'red');
						//circle(225, 225, 75, 'red');
						//circle(375, 225, 75, 'red');

						//circle(75, 75, 75, 'yellow');

						ctx.save();
						//var img = document.createElement('IMG');
						//img.src = "E:/user.jpg";
						//ctx.drawImage(img, 10, 10);
						//	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";  
						//		ctx.fillRect(50, 0, 50, 50);

						//ctx.font = '30px Impact';
						//ctx.rotate(.1);
						//ctx.fillText("Awesome!", 50, 100);

						//var te = ctx.measureText('Awesome!');
						//ctx.strokeStyle = 'rgba(0,0,0,0.5)';
						//ctx.beginPath();
						//ctx.lineTo(50, 102);
						//ctx.lineTo(50 + te.width, 102);
						//ctx.stroke();
						//var lingrad = ctx.createLinearGradient(0,0,0,150);
						//lingrad.addColorStop(0, '#00ABEB');
						//lingrad.addColorStop(0.5, '#fff');
						//lingrad.addColorStop(0.5, '#26C000');
						//lingrad.addColorStop(1, '#fff');

						//var lingrad2 = ctx.createLinearGradient(0,50,0,95);
						//lingrad2.addColorStop(0.5, '#000');
						//lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

						// assign gradients to fill and stroke styles
						//ctx.fillStyle = lingrad;
						//ctx.strokeStyle = lingrad2;

						// draw shapes
						//ctx.fillRect(10,10,130,130);
						//ctx.strokeRect(50,50,50,50);

						var out = fs.createWriteStream(__dirname + '/gradients.png')
						  , stream = canvas.createPNGStream();

						stream.on('data', function(chunk){
						  out.write(chunk);
						});

					}
				});
				console.log(result);
				res.send(resGen.responseGenerator(200,null));
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

