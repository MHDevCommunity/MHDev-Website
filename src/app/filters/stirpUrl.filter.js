angular.module('website')
  .filter('stripurl', function () {
    return function (text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, '');
    };
  });