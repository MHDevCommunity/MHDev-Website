angular.module('website')
  .controller('ResourcesCtrl', ['$scope', 'Config', '$window', function ($scope, Config, $window) {
    'use strict';
    
    var _ = $window._;

    Config.getResources().then(
      function success(data) {
        $scope.resources = data;
        $scope.loaded = true;
        $scope.catagories = _.map(data, 'category');
        $scope.filtered = _.groupBy(data, 'type');
      },
      function error(e) { console.log('Couldn\'t get articles', e); }
    );
    
    $scope.showSubcategories = function(category) {
      $scope.category = category;
      angular.element('#catgegory-list').hide();
      angular.element('#subcatgegory-list').show();
    };
    
    $scope.setSubcategory = function(subcategory) {
      $scope.subcategory = subcategory;
    };

  }]);
