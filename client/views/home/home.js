(function(){
  'use strict';

  angular.module('dirdemo')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.title = 'Home Page';
  }]);
})();

