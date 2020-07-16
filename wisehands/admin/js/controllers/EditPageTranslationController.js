angular.module('WiseHands')
    .controller('EditPageTranslationController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit', '$window',
                function ($scope, $http, signout, $routeParams, sideNavInit, $window) {
        $scope.loading = true;
        $scope.translationObjectUuid = $routeParams.objectUuid;
        $scope.translationBucketUuid = $routeParams.translationUuid;
        sideNavInit.sideNav();

        $http({
            method: 'GET',
            url: '/pageconstructor/' + $scope.translationObjectUuid
        }).then(function successCallback(response) {
                console.log("POST $scope.settings", response.data);
                CKEDITOR.replace('uk');
                CKEDITOR.instances["uk"].setData(response.data.body);

                console.log("POST $scope.settings", response.data);
                $scope.loading = false;
            }, function errorCallback(response) {
                console.log("POST $scope.settings", response);
                $scope.loading = false;
        });



        $scope.loadImage = function () {
            $('#imageLoader').click();
        };

        $scope.saveThisPage = function () {
            $scope.loading = true;

            showInfoMsg("SAVED");
            let htmlData = CKEDITOR.instances["editor"].getData();
            let requestBody = {
                title: $scope.title,
                url: $scope.url,
                body: htmlData
            };

            $http({
                method: 'PUT',
                url: '/pageconstructor/' + $routeParams.uuid,
                data: requestBody
            })
                .then(function successCallback(response) {
                    console.log("PUT $scope.settings", response.data);
                    $scope.loading = false;
                    showInfoMsg("SAVED");
                }, function errorCallback(response) {
                    showWarningMsg("UNKNOWN ERROR");
                    console.log("PUT $scope.settings", response);
                    $scope.loading = false;
                });
        };


    }]);

function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-center",
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