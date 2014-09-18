/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('abWeatherModule', [])
  .factory('WeatherApi', ['$http', function($http){
    function conditions(query){
      return $http.jsonp('http://api.wunderground.com/api/aad218fcd659a15a/conditions/q/' + query + '.json?callback=JSON_CALLBACK');
    }
    return {conditions:conditions};
  }])
  .directive('abWeather', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ab-weather/ab-weather.html';
    o.scope       = {zip:'@'};
    o.link        = function(scope, element, attrs){
                    };
    o.controller  = ['$scope', 'WeatherApi', function($scope, WeatherApi){

                      $scope.$on('position', function(event, pos){
                        // console.log('I am the weather', pos);
                        if($scope.zip){return;}
                        var coords = pos.coords.latitude + ',' + pos.coords.longitude;
                        weather(coords);
                      });

                      function weather(query){
                        WeatherApi.conditions(query).then(function(res){
                          $scope.city = res.data.current_observation.display_location.full;
                          $scope.temp = res.data.current_observation.temp_f;
                          $scope.iconUrl = res.data.current_observation.icon_url;
                        });
                      }

                      if($scope.zip){weather($scope.zip);}

                    }];
    return o;
  }]);
})();
