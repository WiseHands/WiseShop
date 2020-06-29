angular.module('WiseHands')
  .controller('TranslationController', ['$scope', '$http', '$location', 'sideNavInit', '$routeParams', function ($scope, $http, $location, sideNavInit, $routeParams) {
    // $scope.loading = true;

      $http({
          method: 'GET',
          url: '/delivery',

      })
          .then((response) => {
              $scope.loading = false;
              $scope.delivery = response.data;
          }, (errorCallback) => $scope.loading = false);

    $scope.setTranslation = () => {
        const textInUkrainian = document.querySelector('#uk').value;
        const textInEnglish = document.querySelector('#eu').value;
        const data = {
            translationUuid: $routeParams.uuid,
            translationList: [
                {
                    language: 'uk',
                    content: textInUkrainian
                },
                {
                    language: 'eu',
                    content: textInEnglish
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