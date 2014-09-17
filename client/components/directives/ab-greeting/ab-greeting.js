(function(){
  'use strict';

  angular.module('abGreetingModule', [])
  .directive('abGreeting', [function(){
    var o = {};
    // A = <div ab-greeting> usage
    o.restrict = 'A';
    // Path from public directory
    o.templateUrl = '/components/directives/ab-greeting/ab-greeting.html';
    // 3 options, false/true/{}
    // false, uses scope of controller that directive is being used in.
    // true, creates new scope, but can inherit from parent
    // {}, creates a unique (isolate) scope that doesn't inherit from the controller at all
    // {name:'@'}, '@' pulls in the value of the 'name' attribute from the jade in home.jade where tag is being used
    o.scope = {name:'@', age:'@'};
    return o;
  }]);

})();
