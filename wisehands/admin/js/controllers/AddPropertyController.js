angular.module('WiseHands')
    .controller('AddPropertyController', ['$scope', '$http', 'signout', '$routeParams', function ($scope, $http, signout, $routeParams) {
        $scope.loading = true;
        $scope.uuid = $routeParams.uuid;
        $scope.tags = [];

    }]);




