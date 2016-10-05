angular.module('SuperWiseHands')
    .controller('SideNavController', ['$scope', '$http', '$route', '$location',
        function($scope, $http, $route, $location) {
            $scope.$route = $route;

    }]);