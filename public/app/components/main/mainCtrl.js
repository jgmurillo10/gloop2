angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $state, Auth) {
  var vm = this;

  // get info if a person is logged in
  vm.loggedIn = Auth.isLoggedIn();

  // check to see if a user is logged in on every request
  $rootScope.$on('$routeChangeStart', function() {
    vm.loggedIn = Auth.isLoggedIn();

    // get user information on route change
    Auth.getUser().then(function(data) {
        vm.user = data;
      }
    );
  });

  vm.doLogin = function() {
    vm.processing = true;

    // clear the error
    vm.error = '';

    // call the Auth.login() function
    Auth.login(vm.loginData.username, vm.loginData.password)
    .success(function(data) {
      vm.processing = false;
      // if a user logs in successfully, redirect to users page
      if (data.success) {
        $state.go('users');
      } else {
        vm.error = data.message;
      }
    });
  };

  // function to handle logging out
  vm.doLogout = function() {
    Auth.logout();
    // reset all user info
    vm.user = {};
    $state.('login');
  };

});