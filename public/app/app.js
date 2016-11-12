angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'userCtrl',
  'userService',
  'sensorService',
  'sensorCtrl',
  'recordService',
  'recordCtrl',
  'recordService'
])

// application configuration to integrate token into requests
.config(function($httpProvider, $stateProvider) {

  // attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');

});