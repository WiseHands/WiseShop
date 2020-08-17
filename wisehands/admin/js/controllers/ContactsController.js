angular.module('WiseHands')
    .controller('ContactsController', ['$scope', '$http', 'sideNavInit', 'signout', '$window',function ($scope, $http, sideNavInit, signout, $window) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/shop/details',
        })
            .then((response) => {
                $scope.activeShop = response.data;
                console.log("/shop/details", $scope.activeShop);
                $scope.loading = false;
                const locale = $scope.activeShop.locale;
                $scope.language = locale.slice(0, 2);
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
                setAddressForTextLabel($scope.contacts);
                console.log("/contact/details", $scope.contacts);
            }, (errorCallback) => {
                $scope.loading = false;
            });

        setAddressForTextLabel = (contacts) => {
            const cityLabel = document.querySelector('#city');
            const streetLabel = document.querySelector('#street');
            cityLabel.innerText = '';
            streetLabel.innerText = '';
            if (contacts.addressCity){
               cityLabel.innerText = contacts.addressCity;
            }
            if (contacts.addressStreet){
                streetLabel.innerText = contacts.addressStreet;
            }
            if(contacts.addressCityTextTranslationBucket){
                const translationList = contacts.addressCityTextTranslationBucket.translationList;
                translationList.forEach(item => {
                    if(item.language === $scope.language){
                        cityLabel.innerText = item.content;
                    }
                })
            }
            if(contacts.addressStreetTextTranslationBucket){
                const translationList = contacts.addressStreetTextTranslationBucket.translationList;
                translationList.forEach(item => {
                    if(item.language === $scope.language){
                        streetLabel.innerText = item.content;
                    }
                })
            }
        }

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