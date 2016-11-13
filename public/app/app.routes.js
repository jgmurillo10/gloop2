angular.module('app.routes', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/home");
  $locationProvider.html5Mode(true);
  $stateProvider

  //login page
  .state('login', {
    url        :    "/login",
    templateUrl:    "app/views/pages/login.html",
    controllerAs: "main"
  })
  .state('home', {
    url        :  "/home",
    templateUrl:  "app/views/pages/home.html"
  })
  .state('users', {
    url        : "/users/",
    templateUrl: "app/views/pages/users/all.html",
    controller:   "userController",
    controllerAs: "user"
  })
    .state('createUser', {
      url         : "/users/create",
      templateUrl : "app/views/pages/users/single.html",
      controller  : "userCreateController",
      controllerAs: "user"
    })
    .state('editUser', {
      url         : "/users/edit/:user_id",
      templateUrl : "app/views/pages/users/single.html",
      controller  : "userEditController",
      controllerAs: "user"
    })
    .state('sensors', {
      url         : "/users/:user_id/sensors",
      templateUrl : "app/views/pages/sensors/all.html",
      controller  : "sensorController",
      controllerAs: "sensor"
    })
     .state('createSensor', {
      url         : "/users/:user_id/sensors/create",
      templateUrl : "app/views/pages/sensors/single.html",
      controller  : "sensorCreateController",
      controllerAs: "sensor"
    })
    .state('editSensor', {
      url         : "/users/:user_id/sensors/edit/:sensor_id",
      templateUrl : "app/views/pages/sensors/single.html",
      controller  : "sensorEditController",
      controllerAs: "sensor"
    })
});