function workStratDay(response) {
    let toDay = new Date().getDay();
    let monStartTime = new Date(response.data.monStartTime);
    if (toDay === monStartTime.getDay()){
        return monStartTime;
    }
};
function workEndDay(response) {
    let toDay = new Date().getDay();
    let monEndTime = new Date(response.data.monEndTime);
    if (toDay === monEndTime.getDay()){
        return monEndTime;
    }
};
angular.module('WiseShop')
    .service('PublicShopInfo', ['shared', function(shared) {
        return {
            handlePublicShopInfo: function (scope, response) {
                scope.shopName = response.data.name;
                scope.shopId = response.data.uuid;
                // scope.isShopOpenNow = response.data.isShopOpenNow;

                scope.startTime = workStratDay(response);
                scope.startHour = (scope.startTime.getHours()<10?'0':'') + scope.startTime.getHours();
                scope.startMinute = (scope.startTime.getMinutes()<10?'0':'') + scope.startTime.getMinutes();


                scope.endTime = workEndDay(response);
                scope.endHour = (scope.endTime.getHours()<10?'0':'') + scope.endTime.getHours();
                scope.endMinute = (scope.endTime.getMinutes()<10?'0':'') + scope.endTime.getMinutes();
                scope.alwaysOpen = response.data.alwaysOpen
            },


            handleWorkingHours: function (scope) {
                if (scope.alwaysOpen === true) {
                    scope.isNotWorkingTime = false;
                } else {
                    scope.isNotWorkingTime = !scope.isShopOpenNow;
                }
            },
            calculateTotal: function () {
                var products = shared.getProductsToBuy();
                var total = 0;
                for(var i = 0; i < products.length; i++){
                    total += products[i].price;
                }
                shared.setTotal(total);
            }
        }
    }]);

