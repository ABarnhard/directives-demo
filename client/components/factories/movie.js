(function(){
  'use strict';

  angular.module('dirdemo')
  .factory('Movie', ['$http', function($http){

    function create(title){
      return $http.post('/movies', {title:title});
    }

    function remove(movie){
      // console.log(movie);
      return $http.delete('/movies/' + movie._id);
    }

    function all(){
      return $http.get('/movies');
    }

    return {all:all, create:create, remove:remove};
  }]);
})();

