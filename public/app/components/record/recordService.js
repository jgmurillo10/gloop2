angular.module('recordService', [])

.factory('Record', function($http) {

	// create a new object
	var recordFactory = {};
        
  	  recordFactory.getBySensor = function(sensor_id) {
            return $http.get('/api/sensors/' + sensor_id +'/records');
        };
	// return our entire sensorFactory object
	return recordFactory;

});