angular.module('WiseHands')
    .controller('ProductReviewsController', ['$http', '$scope', '$routeParams', 'signout', function($http, $scope, $routeParams, signout) {
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/api/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    const product = response.data;
                    $scope.loading = false;
                    parseProductData(product);

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

            function parseProductData(product) {
                product.feedbackList.map(item => {
                    item.feedbackTime = moment(item.feedbackTime).format('DD MMMM YYYY h:mm:ss');
                    return item;
                })
                $scope.product = product;
            }

            $scope.goBack = function () {
                window.history.back();
            }
    }]);
