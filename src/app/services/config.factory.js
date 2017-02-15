angular.module('website').factory('Config', ['$http', '$location', function ConfigFactory($http, $location) {
  'use strict';
    
  return {
    
    getArticles: function() {
      return $http.get('http://localhost:3009/get-articles').then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get articles', e); }
      );
    },
    
    getResources: function() {
      return $http.get('http://localhost:3009/get-resources').then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get resources', e); }
      );
    }
    
  };
}]);
