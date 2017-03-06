angular.module('website')
  .controller('TemplateCtrl', ['$scope', '$cookies', '$rootScope', 'Config', function ($scope, $cookies, $rootScope, Config) {
    'use strict';
         
    if ($cookies.user !== "{}" && $cookies.user !== undefined) { 
      var userData = JSON.parse($cookies.user);
 
      Config.loginUser({ username: userData.username, password: userData.password, hashed: true }).then( 
        function success(data) {
          $rootScope.user = data.data[0];
          $scope.updateCookie({ username: data.data[0].login, password: data.data[0].password });
        }, function error(e) { console.log('Couldn\'t login user', e); } 
      );
    } else { $rootScope.user = {}; }
    

    // $scope function to update cookie with new user details 
    $scope.updateCookie = function(userData) {
      $cookies.user = JSON.stringify(userData);
    };
    

  }]);