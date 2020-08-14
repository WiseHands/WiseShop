angular.module('WiseHands')
    .controller('ContactsController', ['$scope', '$http', 'sideNavInit', 'signout', '$window',function ($scope, $http, sideNavInit, signout, $window) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/shop/details',
        })
            .then((response) => {
                $scope.activeShop = response.data;
                console.log("$scope.activeShop", $scope.activeShop);
                $scope.loading = false;
            }, errorCallback = (response) => {
            });

        $http({
            method: 'GET',
            url: '/contact/details'
        })
            .then((response) => {
                $scope.loading = false;
                $scope.contacts = response.data;
                $scope.shopLocation = response.data.shopLocation;
                console.log("$scope.contacts", $scope.contacts);
            }, (errorCallback) => {
                $scope.loading = false;
            });

        $scope.redirectToTranslationForContactStreet = () => {
                $http({
                    method: 'GET',
                    url: `/api/get/translation/contact/street/${$scope.contacts.uuid}`
                })
                    .then((response) => {
                        const translation = response.data;
                        $window.location.href = `#/translation/${$scope.contacts.uuid}/${translation.uuid}`;
                    }, (errorCallback) => {
                        $scope.loading = false;
                        console.log(error);
                    });
        }

        $scope.redirectToTranslationForContactCity = () => {
                $http({
                    method: 'GET',
                    url: `/api/get/translation/contact/city/${$scope.contacts.uuid}`
                })
                    .then((response) => {
                        const translation = response.data;
                        $window.location.href = `#/translation/${$scope.contacts.uuid}/${translation.uuid}`;
                    }, (errorCallback) => {
                        $scope.loading = false;
                        console.log(error);
                    });
        }


        $scope.updateContacts = () => {
            console.log("$scope.contacts", $scope.contacts);

            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/contact',
                data: $scope.contacts,

            })
                .then((response) => {
                    $scope.loading = false;
                    showInfoMsg("SAVED");
                },(errorCallback) => {
                    $scope.loading = false;
                    console.log('/contact put', response);
                    showWarningMsg("ERROR");
                });

        };

        sideNavInit.sideNav();
    }]);
showWarningMsg = (msg) => {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}
showInfoMsg = (msg) => {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.info(msg);
}