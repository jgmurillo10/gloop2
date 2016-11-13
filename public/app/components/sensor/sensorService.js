angular.module('sensorService', [])
.factory('Sensor', function($http) {
	// create a new object
	var sensorFactory = {};

	// get a single sensor
	sensorFactory.get = function(id_user, id_sensor) {
		return $http.get('/api/users/' + id_user + '/sensors/'+id_sensor);
	};

	// get all sensors
	sensorFactory.all = function(id_user) {
		return $http.get('/api/users/'+ id_user + '/sensors');
	};

	// create a sensor
	sensorFactory.create = function(id_user, sensorData) {
		console.log(id_user);
		console.log(sensorData.name);
		sensorData.id_user=id_user;

		return $http.post('/api/sensors/', sensorData);
	};

	// update a sensor
	sensorFactory.update = function(id_user, sensorData) {
		return $http.put('/api/users/' + id_user+'/sensors', sensorData);
	};

	// delete a sensor
	sensorFactory.delete = function(id_user, id_sensor) {
		return $http.delete('/api/users/' + id_user+'/sensors/'+ id_sensor);
	};

	// return the entire sensorFactory object
	return sensorFactory;
});