(function(){
  'use strict';

  angular.module('abClockModule', [])
  .directive('abClock', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ab-clock/ab-clock.html';
    o.scope       = {frequency:'@'};
    o.link        = function(scope, element, attrs){
                      function updateTime(){
                        scope.date = new Date();
                      }

                      var id = $interval(updateTime, parseInt(scope.frequency));
                      element.on('$destroy', function(){
                        $interval.cancel(id);
                      });
                      updateTime();
                    };
    return o;
  }]);
})();
