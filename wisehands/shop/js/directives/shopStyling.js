angular.module('WiseShop')
    .directive('shopStyling', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function(scope) {
                $http({
                    method: 'GET',
                    url: '/visualsettings'
                })
                    .then(function successCallback(response) {
                        scope.shopStyling = response.data;
                        scope.activeShop = localStorage.getItem('activeShop');
                        if (scope.shopStyling.shopLogo === '' || !scope.shopStyling.shopLogo){
                            scope.logo = '';
                        } else {
                            scope.logo = 'public/shop_logo/' + scope.activeShop + '/' + scope.shopStyling.shopLogo;
                        }
                    }, function errorCallback(error) {
                        console.log(error);
                    });
            }
        };
    }]);