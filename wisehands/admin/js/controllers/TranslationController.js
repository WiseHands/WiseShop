angular.module('WiseHands')
  .controller('TranslationController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', function ($scope, $http, $location, sideNavInit, signout) {
    // $scope.loading = true;

    $scope.setTranslation = function(){
        $window.location.href = `#/translation`;
    };


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