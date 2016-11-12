//grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user schema
var SensorSchema = new Schema({
	name: String,
	id_user:{type:String, required:true}
	});


//return the model

module.exports = mongoose.model('Sensor', SensorSchema);