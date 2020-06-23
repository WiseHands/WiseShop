angular.module('WiseHands')
    .controller('WorkinghoursController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', 'shared', '$rootScope',
        function ($scope, $http, $location, sideNavInit, signout, shared, $rootScope) {
            $scope.loading = true;

            $scope.hoursSetting = function () {
                $location.path('/hourssetting');
            };

            $http({
                method: 'GET',
                url: '/balance'
            }).then(function successCallback(response) {
                    $scope.balance = response.data;
                    $scope.loading = false;
            }, function errorCallback(response) {
                    $scope.loading = false;
            });

            $http({
                method: 'GET',
                url: '/shop/details'
            }).then(function successCallback(response) {
                    $scope.activeShop = response.data;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                });


            $scope.whenShopClosed = function () {
                if ($scope.activeShop.isTemporaryClosed) {
                    $scope.activeShop.isTemporaryClosed = true;
                } else {
                    $scope.activeShop.isTemporaryClosed = false;
                }
            };

            $http({
                method: 'GET',
                url: '/shop/details/public'
            }).then(function successCallback(response) {
                    $scope.workDay = response.data;
                    $scope.loading = false;
            }, function errorCallback(response) {
                    $scope.loading = false;
            });



            $scope.validateHhMm = function (inputField, id) {
                let isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField);
                if (!isValid) {
                    document.getElementById(id).value = 'Введіть правильний час';
                }
            };

            $scope.clearError = function (id){
                let error = document.getElementById(id).value;
                if(error.length > 5){
                    this.error = "";
                }
            };

            $scope.setWorkingHour = function () {
                console.log('$scope.workDay before put', $scope.workDay);
                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/shop/update/working-hours',
                    data: $scope.workDay
                })
                    .success(function (response) {
                        showInfoMsg("SAVED");
                        console.log('$scope.workDay response put', response);
                        $scope.loading = false;
                    }).error(function (response) {
                    showWarningMsg("ERROR");
                    $scope.loading = false;
                    console.log(response);
                });

                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/shop',
                    data: $scope.activeShop
                })
                    .success(function (response) {
                        $scope.activeShop = response;
                        showInfoMsg("SAVED");
                        console.log('after PUT whenClosed', $scope.activeShop.whenClosed);
                        localStorage.setItem('activeShopName', $scope.activeShop.shopName);
                        // $scope.activeShop.endTime = new Date ($scope.activeShop.endTime);
                        // $scope.activeShop.startTime = new Date ($scope.activeShop.startTime);
                        document.title = $scope.activeShop.shopName;
                        $scope.loading = false;
                    }).error(function (response) {
                    $scope.loading = false;
                    showWarningMsg("UNKNOWN ERROR");
                    console.log(response);
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

function encodeQueryData(data) {
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}
