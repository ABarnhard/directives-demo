(function(){
  'use strict';

  angular.module('abLocateModule', [])
  .factory('LocationService', ['$q', function($q){
    function locate(){
      var deferred = $q.defer(),
          options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          };

      navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);

      return deferred.promise;
    }

    return {locate:locate};
  }])
  .directive('abLocate', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ab-locate/ab-locate.html';
    o.scope       = {};
    o.link        = function(scope, element, attrs){
                    };
    o.controller  = ['$rootScope', '$scope', 'LocationService', function($rootScope, $scope, LocationService){
                      $scope.findMe = function(){
                        LocationService.locate().then(success, error);
                      };

                      function success(pos){
                        console.log(pos);
                        $rootScope.$broadcast('position', pos);
                      }

                      function error(err){
                        console.log(err);
                      }
                    }];
    return o;
  }]);
})();
