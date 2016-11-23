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
                    }, function errorCallback(error) {
                        console.log(error);
                    });
            }
        };
    }]);