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
      .state('frontpage', {
      templateUrl: '/app/templates/frontpage.html'
    })
      .state('frontpage.home', {
      url: '/',
      templateUrl: '/app/pages/home.html'
    })
      .state('page.dev', {
      url: '/developer-network',
      templateUrl: '/app/pages/developer-network.html'
    })
      .state('page.learning', {
      url: '/learning-center',
      templateUrl: '/app/pages/learning-center.html'
    })
      .state('page.social', {
      url: '/social-feed',
      templateUrl: '/app/pages/social-feed.html'
    })
      .state('page.about', {
      url: '/about',
      templateUrl: '/app/pages/about.html'
    })
      .state('page.article', {
      url: '/article/:articleID',
      templateUrl: '/app/pages/article.html',
      controller: function ($stateParams, $scope) {
          $scope.articleID = $stateParams.articleID;
        }
    });

    /*
        Use HTML5 History API to remove the '#'
     */

    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
  }]);

