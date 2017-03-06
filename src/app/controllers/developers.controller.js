angular.module('website')
  .controller('DevelopersCtrl', ['$rootScope', 'Config', '$window', '$state', '$cookies', '$scope', function ($rootScope, Config, $window, $state, $cookies, $scope) {
    'use strict';

    var _ = $window._;

    Config.getRepos().then( 
      function success(data) { $scope.repos = data.data; },
      function error(e) { console.log('Couldn\'t get repos', e); } 
    );

    $scope.getRepoHistory = function(repo){
      Config.getRepoHistory(repo).then( 
        function success(data) { $scope.history = data.data; },
        function error(e) { console.log('Couldn\'t get repo history', e); } 
      );
    };

    $scope.getOpenIssues = function(repo){
      Config.getOpenIssues(repo).then( 
        function success(data) { $scope.issues = data.data; },
        function error(e) { console.log('Couldn\'t get repo issues', e); } 
      );
    };

    $scope.getReadme = function(repo){
      Config.getReadme(repo).then( 
        function success(data) { $scope.readme = data.data; console.log(data.data); },
        function error(e) { console.log('Couldn\'t get README', e); } 
      );
    };

  }]);
