angular.module('WiseHands')
    .controller('AddNewPageController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
        $scope.loading = true;
        sideNavInit.sideNav();
        $scope.loading = false;

        CKEDITOR.replace('editor');

        $scope.saveThisPage = function () {


            let htmlData = CKEDITOR.instances["editor"].getData();
            let requestBody = {
                title: $scope.title,
                url: $scope.url,
                body: htmlData
            };

            $http({
                method: 'POST',
                url: '/pageconstructor',
                data: requestBody
            })
                .then(function successCallback(response) {
                    $scope.settings = response.data;
                    console.log("POST $scope.settings", response.data);
                    $scope.loading = false;
                }, function errorCallback(response) {
                    console.log("POST $scope.settings", response);
                    $scope.loading = false;
                });
        }

    }]);
