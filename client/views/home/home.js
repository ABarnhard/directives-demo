(function(){
  'use strict';

  angular.module('dirdemo')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.title = 'Home Page';

    $scope.people = [{name:'Bob', age:25}];
    $scope.symbols = ['AAPL', 'GOOG'];
  }]);
})();

