angular.module('WiseHands')
  .controller('DeliverySettingsController', ['$scope', '$http', '$location', 'sideNavInit', '$window', function ($scope, $http, $location, sideNavInit, $window) {
    $scope.loading = true;

      // TODO get info about translationDTO

      $http({
          method: 'GET',
          url: '/translation',

      })
          .then(function successCallback(response) {
              $scope.loading = false;
              $scope.translationUuid = response.data.newPostTranslationBucket.uuid;
          }, function errorCallback(response) {
              $scope.loading = false;
          });

      $scope.setTranslation = function(){
          $window.location.href = `#/translation${$scope.translationUuid}`;
          console.log("get info about translationDTO");
      };


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

    $scope.setDeliveryOptions = function () {
      if (!validate()) return;
      $scope.loading = true;
      $http({
        method: 'PUT',
        url: '/delivery',
        data: $scope.delivery,

      })
        .then(function successCallback(response) {
          $scope.loading = false;
          $location.path('/delivery');
          showInfoMsg("SAVED");
        }, function errorCallback(response) {
          $scope.loading = false;
          console.log(response);
          showWarningMsg("ERROR");
        });

    };

    function validate() {
      const isCourierPriceMoreThanOrEqualZero = $scope.delivery.courierPrice >= 0;
      const isFreeDeliveryPriceMoreThanOrEqualZero = $scope.delivery.courierFreeDeliveryLimit >= 0;
      const isValid = isCourierPriceMoreThanOrEqualZero && isFreeDeliveryPriceMoreThanOrEqualZero;
      $scope.showCouriePriceValidationError = !isCourierPriceMoreThanOrEqualZero;
      $scope.showFreeDeliveryPriceValidationError = !isFreeDeliveryPriceMoreThanOrEqualZero;
      return isValid;
    }

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