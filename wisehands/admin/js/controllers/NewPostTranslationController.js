angular.module('WiseHands')
  .controller('NewPostTranslationController', ['$scope', '$http', '$location', 'sideNavInit', '$routeParams', function ($scope, $http, $location, sideNavInit, $routeParams) {
    // $scope.loading = true;
      const textInUkrainian = document.querySelector('#uk');
      const textInEnglish = document.querySelector('#en');

      $http({
          method: 'GET',
          url: '/delivery',

      })
          .then((response) => {
              $scope.loading = false;
              $scope.data = response.data;
              $scope.uuid= $scope.data.newPostTranslationBucket.translationList;
              $scope.content = $scope.data.newPostTranslationBucket.translationList;
              $scope.translationUuid = response.data.newPostTranslationBucket.uuid;

              setContent($scope.content);
              console.log("NewPost.translationUuid => ", $scope.translationUuid, $scope.data);

          },errorCallback =  (errorCallback) => $scope.loading = false);

    setContent = (translationContent) =>{
        textInUkrainian.value = translationContent[0].content;
        textInEnglish.value = translationContent[1].content;
    };

    $scope.setTranslation = () => {
        const data = {
            translationUuid: $scope.translationUuid,
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