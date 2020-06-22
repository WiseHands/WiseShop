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
            })
                .then(function successCallback(response) {
                    $scope.balance = response.data;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;

                });

            $http({
                method: 'GET',
                url: '/shop/details'
            })
                .then(function successCallback(response) {
                    $scope.activeShop = response.data;
                    console.log('details value of checkbox whenClosed:', $scope.activeShop.isTemporaryClosed);
                    // $scope.activeShop.startTime = new Date ($scope.activeShop.startTime);
                    // $scope.activeShop.endTime = new Date ($scope.activeShop.endTime);
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                });


            $scope.whenShopClosed = function(){
                if ($scope.activeShop.isTemporaryClosed){
                    console.log('$scope.activeShop.isTemporaryClosed', $scope.activeShop.isTemporaryClosed);
                    $scope.activeShop.isTemporaryClosed = true;

                } else {
                    console.log('$scope.activeShop.isTemporaryClosed', $scope.activeShop.isTemporaryClosed);
                    $scope.activeShop.isTemporaryClosed = false;
                }
            };


                $http({
                    method: 'GET',
                    url: '/shop/details/public'
                })
                    .then(function successCallback(response) {
                        $scope.workDay = response.data;
                        console.log('details of works days: ', $scope.workDay);

                        $scope.workDay.monStartTime = setWorkingTime($scope.workDay.monStartTime);
                        $scope.workDay.monEndTime = setWorkingTime($scope.workDay.monEndTime);
                        $scope.workDay.tueStartTime = setWorkingTime($scope.workDay.tueStartTime);
                        $scope.workDay.tueEndTime = setWorkingTime($scope.workDay.tueEndTime);
                        $scope.workDay.wedStartTime = setWorkingTime($scope.workDay.wedStartTime);
                        $scope.workDay.wedEndTime = setWorkingTime($scope.workDay.wedEndTime);
                        $scope.workDay.thuStartTime = setWorkingTime($scope.workDay.thuStartTime);
                        $scope.workDay.thuEndTime = setWorkingTime($scope.workDay.thuEndTime);
                        $scope.workDay.friStartTime = setWorkingTime($scope.workDay.friStartTime);
                        $scope.workDay.friEndTime = setWorkingTime($scope.workDay.friEndTime);
                        $scope.workDay.satStartTime = setWorkingTime($scope.workDay.satStartTime);
                        $scope.workDay.satEndTime = setWorkingTime($scope.workDay.satEndTime);
                        $scope.workDay.sunStartTime = setWorkingTime($scope.workDay.sunStartTime);
                        $scope.workDay.sunEndTime = setWorkingTime($scope.workDay.sunEndTime);
                        $scope.loading = false;
                    }, function errorCallback(response) {
                        $scope.loading = false;
                    });

                function setWorkingTime(time){
                    let parseStartDate = time.split(/[^0-9]/);
                    return new Date (parseStartDate[0],parseStartDate[1]-1,parseStartDate[2],parseStartDate[3],parseStartDate[4],parseStartDate[5] );
                }


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
                            $scope.workDay = response;
                            $scope.workDay.monStartTime = setWorkingTime($scope.workDay.monStartTime);
                            $scope.workDay.monEndTime = setWorkingTime($scope.workDay.monEndTime);
                            $scope.workDay.tueStartTime = setWorkingTime($scope.workDay.tueStartTime);
                            $scope.workDay.tueEndTime = setWorkingTime($scope.workDay.tueEndTime);
                            $scope.workDay.wedStartTime = setWorkingTime($scope.workDay.wedStartTime);
                            $scope.workDay.wedEndTime = setWorkingTime($scope.workDay.wedEndTime);
                            $scope.workDay.thuStartTime = setWorkingTime($scope.workDay.thuStartTime);
                            $scope.workDay.thuEndTime = setWorkingTime($scope.workDay.thuEndTime);
                            $scope.workDay.friStartTime = setWorkingTime($scope.workDay.friStartTime);
                            $scope.workDay.friEndTime = setWorkingTime($scope.workDay.friEndTime);
                            $scope.workDay.satStartTime = setWorkingTime($scope.workDay.satStartTime);
                            $scope.workDay.satEndTime = setWorkingTime($scope.workDay.satEndTime);
                            $scope.workDay.sunStartTime = setWorkingTime($scope.workDay.sunStartTime);
                            $scope.workDay.sunEndTime = setWorkingTime($scope.workDay.sunEndTime);
                            $scope.loading = false;
                        }).
                    error(function (response) {
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
                    }).
                error(function (response) {
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

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}
