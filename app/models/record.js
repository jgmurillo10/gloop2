//grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user schema
var RecordSchema = new Schema({
	date: String,
	ph: {type: String, required:true},
	conductivity:{type: String, required:true},
	turbidity: {type: String, required:true},
	temperature:{type: String, required:true},
	latitude:{type:String, required:true},
	longitude:{type:String, required: true},
	id_sensor:String
});



//return the model

module.exports = mongoose.model('Record', RecordSchema);