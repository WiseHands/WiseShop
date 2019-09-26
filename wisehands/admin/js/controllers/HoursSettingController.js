angular.module('WiseHands')
    .controller('HoursSettingController', ['$scope', '$location', '$http', 'sideNavInit',
        function ($scope, $location, $http, sideNavInit) {
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/shop/details',
            })
                .then(function successCallback(response) {
                    $scope.workDay = response.data;
                    console.log('details value of checkbox whenClosed:', $scope.workDay);
                    $scope.workDay.monStartTime = new Date ($scope.workDay.monStartTime);
                    $scope.workDay.monEndTime = new Date ($scope.workDay.monEndTime);
                    $scope.workDay.tueStartTime = new Date ($scope.workDay.tueStartTime);
                    $scope.workDay.tueEndTime = new Date ($scope.workDay.tueEndTime);
                    $scope.workDay.wedStartTime = new Date ($scope.workDay.wedStartTime);
                    $scope.workDay.wedEndTime = new Date ($scope.workDay.wedEndTime);
                    $scope.workDay.thuStartTime = new Date ($scope.workDay.thuStartTime);
                    $scope.workDay.thuEndTime = new Date ($scope.workDay.thuEndTime);
                    $scope.workDay.friStartTime = new Date ($scope.workDay.friStartTime);
                    $scope.workDay.friEndTime = new Date ($scope.workDay.friEndTime);
                    $scope.workDay.satStartTime = new Date ($scope.workDay.satStartTime);
                    $scope.workDay.satEndTime = new Date ($scope.workDay.satEndTime);
                    $scope.workDay.sunStartTime = new Date ($scope.workDay.sunStartTime);
                    $scope.workDay.sunEndTime = new Date ($scope.workDay.sunEndTime);
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                });


            $scope.setWorkingHour = function () {

                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/shop',
                    data: $scope.workDay
                })
                    .success(function (response) {
                        $scope.workDay = response;
                        console.log('after PUT whenClosed', $scope.workDay);
                        $scope.workDay.monStartTime = new Date ($scope.workDay.monStartTime);
                        $scope.workDay.monEndTime = new Date ($scope.workDay.monEndTime);
                        $scope.workDay.tueStartTime = new Date ($scope.workDay.tueStartTime);
                        $scope.workDay.tueEndTime = new Date ($scope.workDay.tueEndTime);
                        $scope.workDay.wedStartTime = new Date ($scope.workDay.wedStartTime);
                        $scope.workDay.wedEndTime = new Date ($scope.workDay.wedEndTime);
                        $scope.workDay.thuStartTime = new Date ($scope.workDay.thuStartTime);
                        $scope.workDay.thuEndTime = new Date ($scope.workDay.thuEndTime);
                        $scope.workDay.friStartTime = new Date ($scope.workDay.friStartTime);
                        $scope.workDay.friEndTime = new Date ($scope.workDay.friEndTime);
                        $scope.workDay.satStartTime = new Date ($scope.workDay.satStartTime);
                        $scope.workDay.satEndTime = new Date ($scope.workDay.satEndTime);
                        $scope.workDay.sunStartTime = new Date ($scope.workDay.sunStartTime);
                        $scope.workDay.sunEndTime = new Date ($scope.workDay.sunEndTime);
                        $scope.loading = false;
                    }).
                error(function (response) {
                    $scope.loading = false;
                    console.log(response);
                });

            };

            sideNavInit.sideNav();
        }]);
