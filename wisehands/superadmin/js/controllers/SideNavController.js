angular.module('SuperWiseHands')
    .controller('SideNavController', ['$scope', '$http', '$route', '$location', 'signout',
        function($scope, $http, $route, $location, signout) {
            $scope.$route = $route;
            $scope.signOut = signout.signOut;

    }]);