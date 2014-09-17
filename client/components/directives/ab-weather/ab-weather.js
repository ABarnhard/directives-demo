/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('abWeatherModule', [])
  .factory('WeatherApi', ['$http', function($http){
    function conditions(zip){
      return $http.jsonp('http://api.wunderground.com/api/aad218fcd659a15a/conditions/q/' + zip + '.json?callback=JSON_CALLBACK');
    }
    return {conditions:conditions};
  }])
  .directive('abWeather', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ab-weather/ab-weather.html';
    o.scope       = {zip:'@'};
    o.link        = function(scope, element, attrs){
                      element.on('$destroy', function(){
                        $interval.cancel(scope.id);
                      });
                    };
    o.controller  = ['$scope', 'WeatherApi', function($scope, WeatherApi){
                      function getConditions(){
                        WeatherApi.conditions($scope.zip).then(function(res){
                          $scope.city = res.data.current_observation.display_location.full;
                          $scope.temp = res.data.current_observation.temp_f;
                          $scope.iconUrl = res.data.current_observation.icon_url;
                        });
                      }
                      getConditions();

                      $scope.id = $interval(getConditions, 300000);
                    }];
    return o;
  }]);
})();
