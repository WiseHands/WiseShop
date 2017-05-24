angular.module('WiseHands')
    .controller('AddPropertyController', ['$scope', '$http', 'signout', '$routeParams', '$location', function ($scope, $http, signout, $routeParams, $location) {
        $scope.loading = false;
        $scope.productUuid = $routeParams.productUuid;
        $scope.categoryUuid = $routeParams.categoryUuid;

        $scope.createProperty = function () {

            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/category/' + $scope.categoryUuid + '/property',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                },
                data: $scope.property
            })
                .then(function successCallback(response) {
                    console.log(response);
                    $location.path('/product/details/' + $scope.productUuid);
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });
        }
    }]);




