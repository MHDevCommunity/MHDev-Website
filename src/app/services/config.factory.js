angular.module('website').factory('Config', ['$http', '$location', function ConfigFactory($http, $location) {
  'use strict';
    
  return {
    
    getArticles: function() {
      return $http.get('http://localhost:5000/get-articles').then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get articles', e); }
      );
    },
    
    getResources: function() {
      return $http.get('http://localhost:5000/get-resources').then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get resources', e); }
      );
    },
    
    registerUser: function(userData) {
      return $http.post('http://localhost:5000/register-user', userData).then(
        function success(data) { return data; },
        function error(e) { console.log('Couldn\'t register', e); }
      );
    },

    loginUser: function(userData) {
      return $http.post('http://localhost:5000/login-user', userData).then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t login', e); }
      );
    },

    getRepos: function() {
      return $http.get('http://localhost:5000/get-repos').then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get repos', e); }
      );
    },

    getRepoHistory: function(repo) {
      return $http.get('http://localhost:5000/get-repo-history/' + repo).then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get repos', e); }
      );
    },

    getOpenIssues: function(repo) {
      return $http.get('http://localhost:5000/get-open-issues/' + repo).then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get issues', e); }
      );
    },

    getReadme: function(repo) {
      return $http.get('http://localhost:5000/get-readme/' + repo).then(
        function success(data) { return data.data; },
        function error(e) { console.log('Couldn\'t get README', e); }
      );
    }
    
  };
}]);
