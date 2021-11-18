angular.module('WiseHands')
  .controller('PersonalDeliveryController', ['$scope', '$http', '$location', 'sideNavInit', '$window', function ($scope, $http, $location, sideNavInit, $window) {
    $scope.loading = true;

    $http({
      method: 'GET',
      url: '/delivery',

    })
      .then((response) => {
        $scope.loading = false;
        $scope.delivery = response.data;
      },errorCallback = (error) => $scope.loading = false );

// TODO change link to translation
    $scope.redirectToTranslation = () => $window.location.href = `#/translation/newPost`;

    $scope.setDeliveryOptions = () => {
      if (!validate()) return;
      $scope.loading = true;
      $http({
        method: 'PUT',
        url: '/delivery',
        data: $scope.delivery,

      })
        .then(function successCallback(response) {
          $scope.loading = false;
          showInfoMsg("SAVED");
        }, function errorCallback(response) {
          $scope.loading = false;
          console.log(response);
          showWarningMsg("ERROR");
        });

    };

    validate = () => {
      const isCourierPriceMoreThanOrEqualZero = $scope.delivery.courierPrice >= 0;
      const isFreeDeliveryPriceMoreThanOrEqualZero = $scope.delivery.courierFreeDeliveryLimit >= 0;
      const isValid = isCourierPriceMoreThanOrEqualZero && isFreeDeliveryPriceMoreThanOrEqualZero;
      $scope.showCouriePriceValidationError = !isCourierPriceMoreThanOrEqualZero;
      $scope.showFreeDeliveryPriceValidationError = !isFreeDeliveryPriceMoreThanOrEqualZero;
      return isValid;
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