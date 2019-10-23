angular.module('WiseHands')
    .controller('ProductListController', ['$scope', '$http', 'spinnerService', 'sideNavInit', 'signout',
        function ($scope, $http, spinnerService, sideNavInit, signout) {
        $scope.loading = true;
        $scope.wrongMessage = false;
        $scope.getResource = function () {
            spinnerService.show('mySpinner');
        $http({
            method: 'GET',
            url: '/products'
        })
            .then(function successCallback(response) {
                spinnerService.hide('mySpinner');
                $scope.products = response.data;
                $scope.activeShop = localStorage.getItem('activeShop');
                var maxNumberOfOrders = $scope.products.length === 0 || $scope.products.length < 12;
                if($scope.products.length === 0){
                    $scope.isProductsInShop = true;
                    $scope.hideMoreButton = true;
                } else if(maxNumberOfOrders){
                    $scope.loading = false;
                } else {
                    $scope.hideMoreButton = false;
                }
            }, function errorCallback(data) {
                spinnerService.hide('mySpinner');
                $scope.wrongMessage = true;
                $scope.loading = false;
            });
        };

        var pageNumber = 1;
        $scope.moreOrders = function () {
            $scope.hideMoreButton = false;
            var req = {
                method: 'GET',
                url: '/products?page=' + pageNumber,
                data: {}
            };

            $http(req)
                .then(function successCallback(response) {
                    if(response.data.length !== 0) {
                        $scope.products = $scope.products.concat(response.data);
                    } else {
                        $scope.hideMoreButton = true;
                    }

                    pageNumber ++;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    $scope.wrongMessage = true;
                });
        };
        sideNavInit.sideNav();

        function equalizeHeights(selector) {
            var heights = new Array();

            $(selector).each(function() {

                $(this).css('min-height', '0');
                $(this).css('max-height', 'none');
                $(this).css('height', 'auto');

                heights.push($(this).height());
            });

            var max = Math.max.apply( Math, heights );

            $(selector).each(function() {
                $(this).css('height', max + 'px');
            });
        }
        $scope.search = function (product) {
            if (!$scope.query){
                return true;
            }
            var searcText = $scope.query.toLowerCase();
            var lowerCaseName = product.name.toLowerCase();
            var total = product.price.toString();
            return lowerCaseName.indexOf(searcText) != -1 || total.indexOf(searcText) !== -1;

        };
        
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            equalizeHeights(".fixed-height");

            $(window).resize(function() {

                setTimeout(function() {
                    equalizeHeights(".fixed-height");
                }, 120);
            });
        });
       
    }]);