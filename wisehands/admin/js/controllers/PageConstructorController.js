angular.module('WiseHands')
    .controller('PageConstructorController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
        $scope.loading = true;
        sideNavInit.sideNav();




        // end of some code for coupons
    }]);
