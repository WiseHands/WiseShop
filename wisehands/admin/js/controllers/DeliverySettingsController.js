angular.module('WiseHands')
    .controller('DeliverySettingsController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', function ($scope, $http, $location, sideNavInit, signout) {
        $scope.loading = true;
        
        $http({
            method: 'GET',
            url: '/delivery',

        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.delivery = response.data;
            }, function errorCallback(response) {
                $scope.loading = false;
            });
        $scope.setDeliveryOptions = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/delivery',
                data: $scope.delivery,

            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $location.path('/delivery');
                    showInfoMsg("SAVED");
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                    showWarningMsg("ERROR");
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