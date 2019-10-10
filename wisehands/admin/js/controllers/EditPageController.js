angular.module('WiseHands')
    .controller('EditPageController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
        $scope.loading = true;
        sideNavInit.sideNav();
        $scope.loading = false;

        CKEDITOR.replace('editor');

        $http({
            method: 'GET',
            url: '/pageconstructor/' + $routeParams.uuid
        })
            .then(function successCallback(response) {
                $scope.title = response.data.title;
                $scope.url = response.data.url;
                CKEDITOR.instances["editor"].setData(response.data.body);

                console.log("POST $scope.settings", response.data);
                $scope.loading = false;
            }, function errorCallback(response) {
                console.log("POST $scope.settings", response);
                $scope.loading = false;
        });

        $scope.saveThisPage = function () {

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
                }, function errorCallback(response) {
                    console.log("PUT $scope.settings", response);
                    $scope.loading = false;
                });
        }

    }]);
