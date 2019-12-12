
angular.module('WiseHands')
    .controller('AdditionSettingsController', ['$scope', '$http', 'sideNavInit', 'signout', 'shared', '$rootScope',
    		function ($scope, $http, sideNavInit, signout, shared, $rootScope) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/shop/details/public'
        })
            .then(function successCallback(response) {
                $scope.additionSetting = response.data;
                console.log("GET $scope.Settings", $scope.additionalSettings);
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;
            });


        $scope.updateAdditionalSetting = function () {
            $scope.loading = true;

            $http({
                method: 'PUT',
                url: '/shop',
                data: $scope.additionSetting
            }).success(function (response) {
                console.log('after PUT update additionalSetting', $scope.additionSetting, response);
                $scope.loading = false;
            }).
            error(function (response) {
                $scope.loading = false;
                console.log(response);
            });


        };


        sideNavInit.sideNav();

    }]);

