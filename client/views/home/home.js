(function(){
  'use strict';

  angular.module('dirdemo')
  .controller('HomeCtrl', ['$scope', 'Home', 'Movie', function($scope, Home, Movie){
    $scope.pageTitle = 'Home Page';

    $scope.people = [{name:'Bob', age:25}];
    $scope.symbols = ['AAPL', 'GOOG'];
    $scope.movies = [];

    Movie.all().then(function(res){
      $scope.movies = res.data.movies;
    });

    $scope.addMovie = function(){
      Movie.create($scope.title).then(function(res){
        $scope.movies.push(res.data.movie);
      });
      $scope.title = '';
    };

    $scope.deleteMovie = function(index){
      // console.log($scope.movies[index]);
      Movie.remove($scope.movies[index]).then(function(err){
        $scope.movies.splice(index, 1);
      });
    };

  }]);
})();

