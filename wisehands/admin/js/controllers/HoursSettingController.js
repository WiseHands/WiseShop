angular.module('WiseHands')
    .controller('HoursSettingController', ['$scope', '$location', '$http', 'sideNavInit',
        function ($scope, $location, $http, sideNavInit) {
            $scope.loading = true;


            sideNavInit.sideNav();
        }]);
