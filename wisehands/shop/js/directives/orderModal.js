angular.module('WiseShop')
    .directive('orderModal', [ function () {
        return {
            scope: true,
            restrict: 'AE',
            replace: 'true',
            templateUrl: 'wisehands/shop/partials/orderModal.html',
            link: function (scope) {
                scope.delivery = function(){
                    if (scope.deliveryType === 'NOVAPOSHTA') {
                        return '';
                    }
                    if (scope.deliveryType === 'COURIER') {
                        if(scope.total < scope.minOrderForFreeDelivery){
                            return ' + ' + scope.deliverance.courierPrice;
                        } else {
                            return '';
                        }
                    } else if (scope.deliveryType === 'SELFTAKE'){
                        return '';
                    }
                };
            }
        };
    }]);