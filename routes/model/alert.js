var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/beacon");
autoIncrement.initialize(connection);


var alertSchema = mongoose.Schema({
	alert_id : {type: Number, required: true},
	beacon: {type: Number, required: true},
	name: {type: String, required: true},
	status: {type: String, required: true},
	image: {type: String, required: true},
	alert_type: {type: Number, required: true},
	isActive: {type: Boolean, default:true}
},
{
    timestamps: true,
    versionKey: false
});


alertSchema.plugin(autoIncrement.plugin, {
	model: 'Alert',
    field: 'alert_id',
    startAt: 10,
    incrementBy: 1});

var User = connection.model('Alert', alertSchema);

module.exports = User;