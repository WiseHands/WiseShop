angular.module('WiseHands')
  .controller('TranslationController', ['$scope', '$http', '$location', 'sideNavInit', '$routeParams', function ($scope, $http, $location, sideNavInit, $routeParams) {
    // $scope.loading = true;
      const textInUkrainian = document.querySelector('#uk');
      const textInEnglish = document.querySelector('#en');

      $http({
          method: 'GET',
          url: '/delivery',

      })
          .then((response) => {
              $scope.loading = false;
              $scope.delivery = response.data;
              $scope.uuid= $scope.delivery.newPostTranslationBucket.translationList;
              $scope.content = $scope.delivery.newPostTranslationBucket.translationList;
              setContent($scope.content);
              console.log("$scope.delivery => ", $scope.delivery);

          }, (errorCallback) => $scope.loading = false);

    setContent = (translationContent) =>{
        textInUkrainian.value = translationContent[0].content;
        textInEnglish.value = translationContent[1].content;
    };

    $scope.setTranslation = () => {
        const data = {
            translationUuid: $routeParams.uuid,
            translationList: [
                {
                  uuid: $scope.uuid[0].uuid,
                  language: 'uk',
                  content: textInUkrainian.value
                },
                {
                  uuid: $scope.uuid[1].uuid,
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
               console.log("response.data from DB ", response.data);
            }, (errorCallback) => $scope.loading = false);

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