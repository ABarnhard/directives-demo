(function(){
  'use strict';

  angular.module('abStockModule', [])
  .factory('StockApi', ['$http', function($http){
    function quote(symbol){
      return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=JSON_CALLBACK');
    }
    return {quote:quote};
  }])
  .directive('abStock', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ab-stock/ab-stock.html';
    o.scope       = {symbol:'@'};
    o.link        = function(scope, element, attrs){
                      element.on('$destroy', function(){
                        console.log('I Fired');
                        $interval.cancel(scope.id);
                      });
                    };
    o.controller  = ['$scope', 'StockApi', function($scope, StockApi){
                      function getQuote(){
                        StockApi.quote($scope.symbol).then(function(res){
                          $scope.quote = res.data.LastPrice;
                          $scope.name = res.data.Name;
                        });
                      }
                      getQuote();

                      $scope.id = $interval(getQuote, 300000);
                    }];
    return o;
  }]);
})();
