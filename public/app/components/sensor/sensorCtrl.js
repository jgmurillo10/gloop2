angular.module('sensorCtrl', ['sensorService'])
.controller('sensorController', function(Sensor, $stateParams) {

	
  var vm = this;
  vm.user_id=$stateParams.user_id;
  vm.sensor_id=$stateParams.sensor_id;
  // set a processing variable to show loading things
  vm.processing = true;
  console.log(':)');

  // grab all the users at page load
  Sensor.all($stateParams.user_id)
  .success(function(data) {
    // when all the users come back, remove the processing variable
    vm.processing = false;
    console.log(':)');
    // bind the users that come back to vm.users
    vm.sensors = data;
  })

  // function to delete a sensor
  vm.deleteSensor = function(id) {
    vm.processing = true;

    // accepts the user id as a parameter
    Sensor.delete(id)
    .success(function(data) {

      // get all users to update the table
      // you can also set up your api
      // to return the list of users with the delete call
      Sensor.all($stateParams.user_id)
      .success(function(data) {
        vm.processing = false;
        vm.sensors = data;
      });
    });
  }

})
// controller applied to user creation page
.controller('sensorCreateController', function($stateParams, Sensor, $state) {

  var vm = this;
  	vm.user_id=$stateParams.user_id;
	vm.sensor_id=$stateParams.sensor_id;
	
  // variable to hide/show elements of the view
  // differentiates between create or edit pages
  vm.type = 'create';

  // function to create a user
  vm.saveSensor = function() {
    vm.processing = true;

    // clear the message
    vm.message = '';
    // use the create function in the userService
    console.log('hol');
    Sensor.create($stateParams.user_id, vm.sensorData)
    .success(function(data) {
      vm.processing = false;

      $state.go('sensors', {user_id: $stateParams.user_id});
      // clear the form
      vm.sensorData = {};
      vm.message = data.message;
    });

  };

})
.controller('sensorEditController', function($stateParams, Sensor, $state) {

  var vm = this;
  	vm.user_id=$stateParams.user_id;
	vm.sensor_id=$stateParams.sensor_id;
	
  // variable to hide/show elements of the view
  // differentiates between create or edit pages
  vm.type = 'edit';

  // get the user data for the user you want to edit
  // $routeParams is the way we grab data from the URL
  Sensor.get($stateParams.user_id, $stateParams.sensor_id)
    .success(function(data) {
      vm.userData = data;
      console.log(data);
    });

  // function to save the user
  vm.saveUser = function() {
    vm.processing = true;
    vm.message = '';

    // call the userService function to update
    User.update($stateParams.user_id, vm.userData)
      .success(function(data) {
        vm.processing = false;
        $state.go('sensors', {user_id: $stateParams.user_id});
			
        // clear the form
        vm.sensorData = {};

        // bind the message from our API to vm.message
        vm.message = data.message;
      });
  };

});