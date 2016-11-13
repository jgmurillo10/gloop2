angular.module('GloopApp', 
  [
  'app.routes',
  'authService',
  'mainCtrl',
  'userCtrl',
  'userService',
  'sensorService',
  'sensorCtrl',
  'recordService',
  'recordCtrl'
])

// application configuration to integrate token into requests
.config(function($httpProvider, $stateProvider) {

  // attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');

});