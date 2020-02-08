angular.module('WiseHands')
    .controller('HoursSettingController', ['$scope', '$location', '$http', 'sideNavInit',
        function ($scope, $location, $http, sideNavInit) {
            $scope.loading = true;

            function addDays(date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }

            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    $scope.workDay = response.data;
                    console.log('details of works days: ', $scope.workDay);
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
                        showInfoMsg("SAVED");
                        $scope.workDay = response;

                        $scope.workDay.monStartTime = new Date ($scope.workDay.monStartTime);
                        console.log('monStartTime', $scope.workDay.monStartTime);
                        $scope.workDay.monEndTime = new Date ($scope.workDay.monEndTime);
                        $scope.workDay.tueStartTime = new Date ($scope.workDay.tueStartTime);
                        console.log('tueStartTime', $scope.workDay.tueStartTime);
                        $scope.workDay.tueEndTime = new Date ($scope.workDay.tueEndTime);
                        $scope.workDay.wedStartTime = new Date ($scope.workDay.wedStartTime);
                        console.log('wedStartTime', $scope.workDay.wedStartTime);
                        $scope.workDay.wedEndTime = new Date ($scope.workDay.wedEndTime);
                        $scope.workDay.thuStartTime = new Date ($scope.workDay.thuStartTime);
                        console.log('thuStartTime', $scope.workDay.thuStartTime);
                        $scope.workDay.thuEndTime = new Date ($scope.workDay.thuEndTime);
                        $scope.workDay.friStartTime = new Date ($scope.workDay.friStartTime);
                        console.log('friStartTime', $scope.workDay.friStartTime);
                        $scope.workDay.friEndTime = new Date ($scope.workDay.friEndTime);
                        $scope.workDay.satStartTime = new Date ($scope.workDay.satStartTime);
                        console.log('satStartTime', $scope.workDay.satStartTime);
                        $scope.workDay.satEndTime = new Date ($scope.workDay.satEndTime);
                        $scope.workDay.sunStartTime = new Date ($scope.workDay.sunStartTime);
                        console.log('sunStartTime', $scope.workDay.sunStartTime);
                        $scope.workDay.sunEndTime = new Date ($scope.workDay.sunEndTime);
                        $scope.loading = false;
                    }).
                error(function (response) {
                    showWarningMsg("ERROR");
                    $scope.loading = false;
                    console.log(response);
                });

            };



            sideNavInit.sideNav();
}]);
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
