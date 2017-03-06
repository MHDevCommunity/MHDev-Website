angular.module('website.routes', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router'
])
  .config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$urlMatcherFactoryProvider',
  function (
  $stateProvider,
   $urlRouterProvider,
   $locationProvider,
   $urlMatcherFactoryProvider
  ) {
    'use strict';

    /*
        Enables trailing slashes (only locally, though)
     */

    $urlMatcherFactoryProvider.strictMode(false);

    /*
        Define routes and templates
     */

    $stateProvider
      .state('page', {
      templateUrl: '/app/templates/page.html'
    })
      .state('developers', {
      templateUrl: '/app/templates/developers.html',
      redirectTo: 'developers.developer-network'
    })
      .state('developers.developer-network', {
      url: '/',
      templateUrl: '/app/pages/developers/developer-home.html'
    })
      .state('developers.project', {
      url: '/project/:projectID',
      templateUrl: '/app/pages/developers/project.html',
      controller: function ($stateParams, $scope) {
        $scope.projectID = $stateParams.projectID;
      }
    })
      .state('page.learning', {
      url: '/learning-center',
      templateUrl: '/app/pages/learning-center.html'
    })
      .state('page.social', {
      url: '/social-feed',
      templateUrl: '/app/pages/social-feed.html'
    })
      .state('page.article', {
      url: '/article/:articleID',
      templateUrl: '/app/pages/article.html',
      controller: function ($stateParams, $scope) {
        $scope.articleID = $stateParams.articleID;
      }
    })
      .state('page.register', {
      url: '/register',
      templateUrl: '/app/pages/register.html'
    })
      .state('page.login', {
      url: '/login',
      templateUrl: '/app/pages/login.html'
    });
    
    $urlRouterProvider.when('/', '/developer-network');

    /*
        Use HTML5 History API to remove the '#'
     */

    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
  }]);

