(function(){
  'use strict';

  angular.module('dirdemo')
  .controller('LogoutCtrl', ['$location', 'User', function($location, User){
    User.logout().then(function(){
      toastr.success('Successful logout.');
      $location.path('/');
    });
  }]);
})();

