angular.module('WiseHands')
  .controller('PaymentOnlineTranslationController', ['$scope', '$http', '$location', 'sideNavInit', '$routeParams', function ($scope, $http, $location, sideNavInit, $routeParams) {
    // $scope.loading = true;
      const textInUkrainian = document.querySelector('#uk');
      const textInEnglish = document.querySelector('#en');

      $http({
          method: 'GET',
          url: '/payment/detail',

      })
          .then((response) => {
              $scope.loading = false;
              $scope.data = response.data;
              console.log("paymentOnline.translationUuid => ", $scope.data);

              $scope.uuidList = $scope.data.onlinePaymentTitleTranslationBucket.translationList;
              $scope.content = $scope.data.onlinePaymentTitleTranslationBucket.translationList;
              $scope.translationUuid = response.data.onlinePaymentTitleTranslationBucket.uuid;

              setContent($scope.content);
              console.log("Courier.translationUuid => ", $scope.translationUuid, $scope.data);


          },errorCallback = (errorCallback) => $scope.loading = false);

    setContent = (translationContent) =>{
        textInUkrainian.value = translationContent[0].content;
        textInEnglish.value = translationContent[1].content;
    };

    $scope.setTranslation = () => {
        const data = {
            translationUuid: $scope.translationUuid,
            translationList: [
                {
                  uuid: $scope.uuidList[0].uuid,
                  language: 'uk',
                  content: textInUkrainian.value
                },
                {
                  uuid: $scope.uuidList[1].uuid,
                  language: 'en',
                  content: textInEnglish.value
                }
            ]
        };
        sendData(data);
    };

    sendData = (data) =>{
        $http({
            method: 'PUT',
            url: '/api/translation/save',
            data: data
        })
            .then((response) => {
               $scope.loading = false;
                showInfoMsg("SAVED");
            }, (errorCallback) => {
                showWarningMsg("ERROR");
                $scope.loading = false
            });

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