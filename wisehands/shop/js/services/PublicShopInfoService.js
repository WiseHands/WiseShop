function workStartDay(response) {
    let now = moment(currentTime());
    let monStartTime = new Date(response.data.monStartTime);
    if (now.weekday() === 1){
        return monStartTime;
    }
}
function workEndDay(response) {
    let now = moment(currentTime());
    let monEndTime = new Date(response.data.monEndTime);
    if (now.weekday() === 1){
        return monEndTime;
    }
}
function currentTime(){
    let currDate =  new Date();
    return currDate.toUTCString();
}
angular.module('WiseShop')
    .service('PublicShopInfo', ['shared', function(shared) {
        return {
            handlePublicShopInfo: function (scope, response) {

                scope.shopName = response.data.name;
                scope.shopId = response.data.uuid;
                // scope.isShopOpenNow = response.data.isShopOpenNow;
                scope.startTime = workStartDay(response);
                scope.startHour = (scope.startTime.getHours()<10?'0':'') + scope.startTime.getHours();
                scope.startMinute = (scope.startTime.getMinutes()<10?'0':'') + scope.startTime.getMinutes();
                scope.endTime = workEndDay(response);
                scope.endHour = (scope.endTime.getHours()<10?'0':'') + scope.endTime.getHours();
                scope.endMinute = (scope.endTime.getMinutes()<10?'0':'') + scope.endTime.getMinutes();
                scope.alwaysOpen = response.data.alwaysOpen;
                debugger;

            },


            // handleWorkingHours: function (scope) {
            //     if (scope.alwaysOpen === true) {
            //         scope.isNotWorkingTime = false;
            //     } else {
            //         scope.isNotWorkingTime = !scope.isShopOpenNow;
            //     }
            // },
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

