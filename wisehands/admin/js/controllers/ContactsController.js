angular.module('WiseHands')
    .controller('ContactsController', ['$scope', '$http', 'sideNavInit', 'signout', function ($scope, $http, sideNavInit, signout) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/contact/details'
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.contacts = response.data;
            }, function errorCallback(data) {
                $scope.loading = false;
            });
        $scope.updateContacts = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/contact',
                data: $scope.contacts,

            })
                .then(function successCallback(response) {
                    $scope.loading = false;
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