var User = require('../models/user');
var Sensor = require('../models/sensor');
var Record = require('../models/record');
var jwt = require('jsonwebtoken');
var config = require('../../config');

//superSecret for creating tokens
var superSecret = config.secret;

module.exports = function(app,express){
	var apiRouter = express.Router();
	 // route to authenticate a user (POST http://localhost:8080/api/authenticate)
	 apiRouter.post('/authenticate',function(req,res){
	 	console.log(req.body.username);

	 	//find the user
	 	//select the password explicitly since mongoose is not returning it by default

	 	User.findOne({
	 		username: req.body.username
	 	}).select('password').exec(function(err,user){
	 		if(err) throw err;

	 		//no user with that id was found

	 		if(!user){
	 			res.json({
	 				success: false,
	 				message: 'Authentication failed. User not found. '
	 			});
	 		}else if(user){
	 			//check if password matches

	 			var validPassword = user.comparePassword(req.body.password);
	 			if(!validPassword){
	 				res.json({
	 					success: false,
	 					message: 'Autentication failed. Wrong password. '
	 				});
	 			}else {
	 				//if user is found and password is right
	 				//create token
	 				var token = jwt.sign(user, superSecret, {
	 					expiresIn: 1440 // expires in 24 hours
	 				});
	 				//return the information including token as json
	 				res.json({
	 					success: true,
	 					message: 'Enjoy your token! ',
	 					token: token
	 				});
	 			}
	 		}
	 	});
	 });
	 //route middleware to verify a token


	apiRouter.use(function(req,res,next){
	
	//check header or url parameters of post parameters for token

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//decode token
	if(token){
		//verifies secret and checks exp
		jwt.verify(token, config.secret, function(err,decoded){
			if(err){
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token. '
				});
			} else {
				//if everything is good, save to request to use in other routes
				req.decoded = decoded;

				next();
			}
		});
	}else {
		//if there is no token
		// return an HTTP response  of 403 (access forbidden) and an error message
		return res.status(403).send({
			succes: false,
			message: 'No token provided. '
		});
	}


});
	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api 

	apiRouter.get('/',function(req,res){
		res.json({message: 'hooray! welcome to our api'});
	});


apiRouter.get('/me',function(req,res){
	res.send(req.decoded);
});
 // more routes for our API will happen here 
 apiRouter.route('/records')
 	.post(function(req,res){
 	// 	sensor.ph=req.body.ph;
		// sensor.conductivity=req.body.conductivity;
		// sensor.turbidity=req.body.turbidity;
		// sensor.temperature=req.body.temperature;
		// sensor.id_user=req.body.id_user;
		// sensor.latitude=req.body.latitude;
		// sensor.longitude=req.body.longitude;
 	})
 	.get(function(req,res){
		Record.find(function(err,records){
 			if(err) res.send(err);
 			//return the sensors

 			res.json(records);

 		});
	})

apiRouter.route('/sensors')
	.post(function(req,res){
		var sensor = new Sensor();
		sensor.name=req.body.name;
		sensor.id_user=req.body.id_user;
		sensor.save(function(err){

 		 	if(err){
 		 		//duplicate entry
 		 		if(err.code == 11000)
 		 			return res.json({success: false, message:' A user  that username already exists. '});

 		 		else
 		 			return res.send(err);
 		 		}


 		 			res.json({message: 'sensor created!'});
 		 });
	})
	.get(function(req,res){
		Sensor.find(function(err,sensors){
 			if(err) res.send(err);
 			//return the sensors

 			res.json(sensors);

 		});
	})
apiRouter.route('/sensors/:id_sensor')
	.get(function(req,res){
 			Sensor.findById(req.params.id_sensor, function(err,sensor){
 				if(err) res.send(err);

 				res.json(sensor);

 			});
 		})
	.put(function(req,res){
 			//use our user model to find the user that we want

 			Sensor.findById(req.params.id_sensor, function(err,sensor){
 				if(err) res.send(err);

 				//update the users info only if its new

 				if(req.body.name) sensor.name = req.body.name;
 				if(req.body.id_user) sensor.id_user = req.body.id_user;
 				//save the user
 				sensor.save(function(err){
 					if(err) res.send(err);
 					//return a message

 					res.json({message: 'Sensor updated!'});
 				});
 			});

 		})
	.delete(function(req,res){
 			Sensor.remove({
 				_id: req.params.id_sensor
 			}, function(err,sensor){
 				if(err) return res.send(err);
 				res.json({message: 'Succesfully deleted!'});
 			});
 		});

apiRouter.route('/sensors/:id_sensor/records')
	.post(function(req,res){
		var record= new Record();
		record.date=req.body.date;
		record.ph=req.body.ph;
		record.conductivity=req.body.conductivity;
		record.turbidity=req.body.turbidity;
		record.temperature=req.body.temperature;
		record.latitude=req.body.latitude;
		record.longitude=req.body.longitude;
		record.id_sensor=req.params.id_sensor;
		record.save(function(err){
			if(err){
				if(err.code == 11000)
					return res.json({success:false,mesage:'nothing'});
				else
					return res.send(err);
			}
			res.json({message: 'Record created!'});
		})
	})

	.get(function(req,res){
		var id=req.params.id_sensor;
		Record.find({id_sensor:req.params.id_sensor}, function(err,records){
 			if(err) res.send(err);
 			//return the records

 			res.json(records);

 		});
	})
	

apiRouter.route('/users')
 // create a user (accessed at POST http://localhost:8080/api/users) 

 	.post(function(req,res){
 		 // create a new instance of the User model 
 		 var user = new User();

 		 // set the users information (comes from the request) 

 		 user.name = req.body.name;
 		 user.username = req.body.username;
 		 user.password = req.body.password;
 		 // save the user and check for errors

 		 user.save(function(err){

 		 	if(err){
 		 		//duplicate entry
 		 		if(err.code == 11000)
 		 			return res.json({success: false, message:' A user  that username already exists. '});

 		 		else
 		 			return res.send(err);
 		 		}


 		 			res.json({message: 'user created!'});
 		 });
 	})

 	 // get all the users (accessed at GET http://localhost:8080/api/users) 

 	.get(function(req,res){
 		User.find(function(err,users){
 			if(err) res.send(err);
 			//return the users

 			res.json(users);

 		});
 	});


 apiRouter.route('/users/:user_id')
 		//get the user with that id
 		// (accessed at GET http://localhost:8080/api/users/:user_id)
 		.get(function(req,res){
 			User.findById(req.params.user_id, function(err,user){
 				if(err) res.send(err);

 				res.json(user);

 			});
 		})
 		//update the user with this id
 		// (accessed at PUT http://localhost:8080/api/users/:user_id) 
 		.put(function(req,res){
 			//use our user model to find the user that we want

 			User.findById(req.params.user_id, function(err,user){
 				if(err) res.send(err);

 				//update the users info only if its new

 				if(req.body.name) user.name = req.body.name;
 				if(req.body.username) user.username = req.body.username;
 				if(req.body.password) user.password = req.body.password;
 				//save the user
 				user.save(function(err){
 					if(err) res.send(err);
 					//return a message

 					res.json({message: 'User updated!'});
 				});
 			});

 		})
 		//delete the user with this id
 		// (accessed at DELETE http://localhost:8080/api/users/:user_id) 
 		.delete(function(req,res){
 			User.remove({
 				_id: req.params.user_id
 			}, function(err,user){
 				if(err) return res.send(err);
 				res.json({message: 'Succesfully deleted!'});
 			});
 		});

 apiRouter.route('/users/:user_id/sensors')
		.get(function(req,res){
 		Sensors.findById(req.params.user_id,function(err,sensors){
 			if(err) res.send(err);
 			//return the users

 			res.json(sensors);

 		});
 	});

 		return apiRouter;

};