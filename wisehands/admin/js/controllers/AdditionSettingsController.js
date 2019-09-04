
angular.module('WiseHands')
    .controller('AdditionSettingsController', ['$scope', '$http', 'sideNavInit', 'signout', 'shared', '$rootScope',
    		function ($scope, $http, sideNavInit, signout, shared, $rootScope) {
        $scope.loading = true;


        $http({
            method: 'GET',
            url: 'additional-setting/detail',
        })
            .then(function successCallback(response) {
                $scope.additionalSetting = response.data;
                console.log("GET $scope.additionalSetting", $scope.additionalSetting)
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;
            });


        $scope.updateAdditionalSetting = function () {
            console.log("$scope.additionalSetting before PUT", $scope.additionalSetting);
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/additional-setting/update',
                data: $scope.additionalSetting
            })
                .success(function (response) {
                    $scope.additionalSetting = response;
                    console.log('after PUT update additionalSetting', $scope.additionalSetting);
                    $scope.loading = false;
                }).
            error(function (response) {
                $scope.loading = false;
                console.log(response);
            });

        };


        sideNavInit.sideNav();

    }]);

