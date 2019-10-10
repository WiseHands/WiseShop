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
                $scope.page = response.data;
                CKEDITOR.instances["editor"].setData(response.data.body);

                console.log("POST $scope.settings", response.data);
                $scope.loading = false;
            }, function errorCallback(response) {
                console.log("POST $scope.settings", response);
                $scope.loading = false;
            });

    }]);
