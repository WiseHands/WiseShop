angular.module('WiseShop')
    .directive('orderModal', [function () {
        return {
            scope: true,
            restrict: 'AE',
            replace: 'true',
            templateUrl: 'wisehands/shop/partials/orderModal.html'
        };
    }]);