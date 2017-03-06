angular.module('website')
  .controller('ResourcesCtrl', ['$scope', 'Config', '$window', function ($scope, Config, $window) {
    'use strict';
    
    var _ = $window._;

    Config.getResources().then(
      function success(data) {
        $scope.resources = data;
        $scope.catagories = _.map(data, 'category');
        $scope.grouped = _.groupBy(data, 'type');
        $scope.loaded = true;
      },
      function error(e) { console.log('Couldn\'t get articles', e); }
    );
    
    $scope.showSubcategories = function(category) {
      $scope.category = category;
    };
    
    $scope.setSubcategory = function(subcategory) {
      $scope.subcategory = subcategory;
    };
    
    $scope.removeCategory = function() {
      $scope.category = null;
    };

  }]);
