angular.module('WiseHands')
    .controller('ProductTranslationController', ['$scope', '$http', 'signout', 'sideNavInit', '$routeParams',
        function ($scope, $http, signout, sideNavInit, $routeParams) {
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/api/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.product = response.data;
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });


            $scope.setTranslation = function () {
                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/payment/update/online/setting',
                    data: $scope.data,
                })
                    .then(function successCallback(response) {
                        $scope.payment = response.data;
                        $scope.loading = false;
                        showInfoMsg("SAVED");
                    }, function errorCallback(response) {
                        $scope.loading = false;
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

