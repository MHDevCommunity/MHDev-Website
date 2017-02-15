angular.module('website')
  .controller('PostsCtrl', ['$scope', 'Config', function ($scope, Config) {
    'use strict';

    Config.getArticles().then(
      function success(data) {
        $scope.posts = data;
        $scope.loaded = true;

        if ($scope.articleID) {
          $scope.post = $.grep($scope.posts, function(e){ return e.id == $scope.articleID; })[0];
        }
      },
      function error(e) { console.log('Couldn\'t get articles', e); }
    );

  }]);
