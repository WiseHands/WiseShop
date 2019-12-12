
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
                showInfoMsg("SAVED");
                $scope.loading = false;
            }).
            error(function (response) {
                $scope.loading = false;
                showWarningMsg("Error");
                console.log(response);
            });


        };


        sideNavInit.sideNav();

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
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true
            };
            toastr.info(msg);
        }


    }]);

