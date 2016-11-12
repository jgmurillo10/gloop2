angular.module('app.routes', ['ui.router'])

.config(function($routeProvider, $locationProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/home");
  $locationProvider.html5Mode(true);
  $stateProvider

  //login page
  .state('login', {
    url        :    "/login",
    templateUrl:    "app/views/pages/login.html"
  })
  .state('home', {
    url        :  "/home",
    templateUrl:  "app/views/pages/home.html"
  })
});