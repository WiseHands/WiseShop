angular.module('WiseHands')
    .controller('AddNewPageController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
        $scope.loading = true;
        sideNavInit.sideNav();
        $scope.loading = false;

        CKEDITOR.replace('editor');

        $scope.saveThisPage = function () {

            var htmlData = CKEDITOR.instances["editor"].getData();
            $scope.setting = htmlData;

            $http({
                method: 'POST',
                url: '/pageconstructor',
                data: $scope.settings
            })
                .then(function successCallback(response) {
                    $scope.settings = response.data;
                    console.log("POST $scope.settings", response.data);
                    $scope.loading = false;
                }, function errorCallback(response) {
                    console.log("POST $scope.settings", response);
                    console.log("$scope.settings", $scope.settings);
                    $scope.loading = false;
                });
        }

    }]);
