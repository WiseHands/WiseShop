angular.module('WiseHands')
    .controller('AddNewPageController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
        $scope.loading = true;
        sideNavInit.sideNav();
                    $scope.loading = false;




                    // end of some code for coupons
    }]);
