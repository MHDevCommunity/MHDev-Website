angular.module('website')
  .controller('UserCtrl', ['Config', '$scope', '$state', '$rootScope', function (Config, $scope, $state, $rootScope) {
    'use strict';

    $scope.loginUser = function(login) {
      Config.loginUser(login).then(
        function success(data) {
          if (data.code !== 200) {
            $scope.error = '<h3>Oops, something went wrong</h3><p>' + data.code + ': ' + data.message + '</p>';
          } else {
            $rootScope.user = data.data[0];
            $scope.updateCookie({ username: data.data[0].login, password: data.data[0].password });
            $state.transitionTo('developers.developer-network');
          }
        }, function error(e) { console.log('Couldn\'t login user', e); }
      );
    };

    $scope.registerUser = function(register) {
      if (register.password === register.repeatPassword) {
        delete register.repeatPassword;

        Config.registerUser(register).then(
          function success(data) {            
            if (data.data.code !== 200) { $scope.error = '<h3>Oops, something went wrong</h3><p>' + data.data.code + ': ' + data.data.message + '</p>'; }
            else { $scope.loginUser(data.data); }
          },
          function error(e) { console.log('Couldn\'t register user', e); }
        );
      } else {
        $scope.error = '<h3>Oops, something went wrong</h3><p>Passwords do not match</p>';
      }
    };

  }]);
