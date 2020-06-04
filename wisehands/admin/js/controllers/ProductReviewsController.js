angular.module('WiseHands')
    .controller('ProductReviewsController', ['$http', '$scope', '$routeParams', 'signout', function($http, $scope, $routeParams, signout) {
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/api/feedback/get/list/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    console.log("/api/feedback/get/list/" , response.data);
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $http({
                method: 'GET',
                url: '/api/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    console.log("/api/feedback/get/list/" , response.data);
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $scope.goBack = function () {
                window.history.back();
            }
    }]);
