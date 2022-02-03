angular.module('WiseHands')
    .controller('BannersController', ['$scope', '$http', 'signout', 'sideNavInit', function ($scope, $http, signout, sideNavInit) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/api/banners',
        })
            .then(({data}) => {
                $scope.loading = false;
                $scope.bannerProductOfDay = data.find?.(item => item.type === 'DISH_OF_DAY') || {};
                $scope.bannerForShopBasket = data.find?.(item => item.type === 'BASKET') || {};
            }, error => {
                $scope.loading = false;
                console.log(error);
            });


        $scope.setBannerForProductOfDay = () => {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/api/banner/for/product',
                data: $scope.bannerProductOfDay
            })
                .success(() => {
                    $scope.loading = false;
                    showInfoMsg("SAVED");
                }).error(error => {
                $scope.loading = false;
                showWarningMsg("ERROR");
                console.log(error);
            });
        };

        $scope.setBannerForShopBasket = () => {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/api/banner/in/basket',
                data: $scope.bannerForShopBasket
            })
                .success(() => {
                    $scope.loading = false;
                    showInfoMsg("SAVED");
                }).error(error => {
                $scope.loading = false;
                showWarningMsg("ERROR");
                console.log(error);
            });
        };

        sideNavInit.sideNav();
    }]);
