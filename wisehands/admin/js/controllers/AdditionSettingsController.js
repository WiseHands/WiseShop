
angular.module('WiseHands')
    .controller('AdditionSettingsController', ['$scope', '$http', 'sideNavInit', 'signout', 'shared', '$rootScope',
    		function ($scope, $http, sideNavInit, signout, shared, $rootScope) {
        $scope.loading = true;


        $http({
            method: 'GET',
            url: '/payment/detail'
        })
            .then(function successCallback(response) {
                $scope.paymentSettings = response.data;
                console.log("GET $scope.paymentSettings", $scope.paymentSettings);
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;
            });

        $http({
            method: 'GET',
            url: '/delivery'
        })
            .then(function successCallback(response) {
                $scope.additionalSettings = response.data;
                console.log("GET $scope.Settings", $scope.additionalSettings);
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;
            });


        $scope.updateAdditionalSetting = function () {
            $scope.loading = true;
            // $http({
            //     method: 'PUT',
            //     url: '/payment/update',
            //     data: $scope.paymentSettings
            // })                .success(function (response) {
            //         $scope.paymentSettings = response;
            //         console.log('after PUT update additionalSetting', $scope.paymentSettings);
            //         $scope.loading = false;
            //     }).
            // error(function (response) {
            //     $scope.loading = false;
            //     console.log(response);
            // });

            $http({
                method: 'PUT',
                url: '/delivery',
                data: $scope.additionalSettings
            }).success(function (response) {
                $scope.paymentSettings = response;
                console.log('after PUT update additionalSetting', $scope.additionalSettings);
                $scope.loading = false;
            }).
            error(function (response) {
                $scope.loading = false;
                console.log(response);
            });


        };


        sideNavInit.sideNav();

    }]);

