angular.module('WiseShop')
    .directive('deliveryCost', [function () {
        return {
            restrict: 'A',
            link: function(scope) {
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