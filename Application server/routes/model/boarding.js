var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/beacon");
autoIncrement.initialize(connection);


var boardingSchema = mongoose.Schema({
	b_id: {type: Number, required: true, index: true},
	conf: {type: String, required: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	flight_no: {type: String, required: true},
	from: {type: String, required: true},
	to: {type: String, required: true},
	boarding_time: {type: String, required: true},
	boarding_group: {type: String, required: true},
	boarding_position: {type: String, required: true},
	airline_name: {type: String, required: true},
	gate: {type: String, required: true},
},
{
	collection: 'boarding',
    timestamps: true,
    versionKey: false
});


boardingSchema.plugin(autoIncrement.plugin, {
	model: 'Boarding',
    field: 'b_id',
    startAt: 500000001,
    incrementBy: 1});

var Boarding = connection.model('Boarding', boardingSchema);

module.exports = Boarding;