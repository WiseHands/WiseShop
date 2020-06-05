angular.module('WiseHands')
    .controller('ProductReviewsController', ['$http', '$scope', '$routeParams', 'signout', function($http, $scope, $routeParams, signout) {
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/api/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.product = response.data;
                    $scope.loading = false;

                    $scope.activeShop = localStorage.getItem('activeShop');
                    $scope.product.images.forEach(function(image, index){
                        if(image.uuid === $scope.product.mainImage.uuid){
                            $scope.selected = index;
                        }
                    })

                    console.log("/api/feedback/get/list/" , response.data);
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $scope.goBack = function () {
                window.history.back();
            }
    }]);
