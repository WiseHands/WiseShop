angular.module('WiseHands')
  .controller('TranslationController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', function ($scope, $http, $location, sideNavInit, signout) {
    // $scope.loading = true;

      $http({
          method: 'GET',
          url: '/delivery',

      })
          .then(function successCallback(response) {
              $scope.loading = false;
              $scope.delivery = response.data;
          }, function errorCallback(response) {
              $scope.loading = false;
          });



    sideNavInit.sideNav();

  }]);

function showWarningMsg(msg) {
  toastr.clear();
  toastr.options = {
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true
  };
  toastr.warning(msg);
}

function showInfoMsg(msg) {
  toastr.clear();
  toastr.options = {
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true
  };
  toastr.info(msg);
}