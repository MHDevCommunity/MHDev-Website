angular.module('website')
  .directive('imageBackground', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      'use strict';

      element.css('background-image', 'url("' + attrs.imageBackground + '")');
            
    }
  };
});
