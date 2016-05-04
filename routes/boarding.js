var Boarding = require('./model/boarding');

exports.addPage = function(req, res){
	console.log('add');

	res.render('add-boarding',{user: req.session.user});
}

exports.add = function(req, res){
	console.log('add');

	console.log(req.param('conf'));
	b = new Boarding();

	b.conf = req.param('conf');
	b.fname = req.param('fname');
	b.lname = req.param('lname');
	b.flight_no = req.param('flight_no');
	b.from = req.param('from');
	b.to = req.param('to');
	b.boarding_time = req.param('boarding_time');
	b.boarding_group = req.param('boarding_group');
	b.boarding_position = req.param('boarding_position');
	b.airline_name = req.param('airline_name');
	b.gate = req.param('gate');

	b.save(function(err){
		console.log(err);
		if(err){
			res.end(JSON.stringify('no'));
		}else{
			res.end(JSON.stringify('yes'));
		}
	});
}


exports.passPage = function(req, res){
	console.log('add');

	Boarding.find({}, function(err, passengers){
		console.log(passengers);
		
		res.render('boarding-pass',{user: req.session.user, passengers: passengers});

	});
}
exports.removePage = function(req, res){
	console.log('add');

	Boarding.find({}, function(err, passengers){
		console.log(passengers);
		res.render('delete-boarding',{user: req.session.user, passengers: passengers});
	});
}

exports.removePass = function(req, res){
	console.log(req.param('b_id'));
	Boarding.remove({b_id: req.param('b_id')}, function(err){
		res.end(JSON.stringify('yes'));
	})
}

exports.info = function(req, res){
	console.log(req.param('id'));
	var data = {feed:[]},feed;
	Boarding.findOne({conf: req.param('id')}, function(err, feed){
		data.feed.push(feed);	
		//data.push(feed);
		console.log(data);
		res.send(data);
	});
}
