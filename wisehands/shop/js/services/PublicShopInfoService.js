angular.module('WiseShop')
    .service('PublicShopInfo', [ function() {
        return {
            handleDeliveranceInfo: function (scope, response) {
                scope.deliverance = response.data;
                scope.minOrderForFreeDelivery = scope.deliverance.courierFreeDeliveryLimit;
                if (scope.deliverance.isCourierAvailable){
                    $("#radio1").click();
                } else if (scope.deliverance.isNewPostAvailable){
                    $("#radio2").click();
                } else if (scope.deliverance.isSelfTakeAvailable){
                    $("#radio3").click();
                }
            },
            handlePublicShopInfo: function (scope, response) {
                scope.couponsEnabled = response.data.couponsEnabled;
                document.title = response.data.name;
                scope.shopName = response.data.name;
                scope.shopId = response.data.uuid;
                scope.payLateButton = response.data.manualPaymentEnabled;
                scope.onlinePaymentEbabled = response.data.onlinePaymentEnabled;
                scope.startTime = new Date(response.data.startTime);
                scope.startHour = (scope.startTime.getHours()<10?'0':'') + scope.startTime.getHours();
                scope.startMinute = (scope.startTime.getMinutes()<10?'0':'') + scope.startTime.getMinutes();
                scope.endTime = new Date(response.data.endTime);
                scope.endHour = (scope.endTime.getHours()<10?'0':'') + scope.endTime.getHours();
                scope.endMinute = (scope.endTime.getMinutes()<10?'0':'') + scope.endTime.getMinutes();
            },
            handleDeliveryCost: function (scope) {
                if (scope.delivery.radio === 'NOVAPOSHTA') {
                    return '';
                }
                if (scope.delivery.radio === 'COURIER') {
                    if(scope.total < scope.minOrderForFreeDelivery){
                        return ' + ' + scope.deliverance.courierPrice;
                    } else {
                        return '';
                    }
                } else if (scope.delivery.radio === 'SELFTAKE'){
                    return '';
                }
            }
        }
    }]);