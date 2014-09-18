/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('abMovieModule', [])
  .factory('MovieApi', ['$http', function($http){
    function getMovieId(movie){
      movie = movie.replace(' ', '+');
      return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json?q='+movie+'&page_limit=1&page=1&apikey=v2c29merm2sdj4hmrb3kspua&callback=JSON_CALLBACK');
    }

    function movieInfo(res){
      var id = res.data.movies[0].id;
      return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies/'+id+'.json?apikey=v2c29merm2sdj4hmrb3kspua&callback=JSON_CALLBACK');
    }

    return {getMovieId:getMovieId, movieInfo:movieInfo};
  }])
  .directive('abMovie', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ab-movie/ab-movie.html';
    o.scope       = {title:'@', remove:'&'};
    o.link        = function(scope, element, attrs){
                    };
    o.controller  = ['$scope', 'MovieApi', function($scope, MovieApi){
                      MovieApi.getMovieId($scope.title).then(MovieApi.movieInfo).then(function(res){
                        // console.log(res.data);
                        $scope.movieTitle = res.data.title;
                        $scope.posterUrl = res.data.posters.detailed.replace('_tmb', '_det');
                        $scope.release = res.data.release_dates.theater;
                        $scope.rating = res.data.mpaa_rating;
                        $scope.length = res.data.runtime;
                        $scope.actors = res.data.abridged_cast.map(function(a){return a.name;});
                      });
                    }];
    return o;
  }]);
})();
