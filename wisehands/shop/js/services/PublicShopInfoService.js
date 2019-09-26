function workStartDay(response) {
    let now = moment(currentTime());
    let mon = new Date(response.data.monStartTime);
    let tue = new Date(response.data.tueStartTime);
    let wed = new Date(response.data.wedStartTime);
    let thu = new Date(response.data.thuStartTime);
    let fri = new Date(response.data.friStartTime);
    let sat = new Date(response.data.satStartTime);
    let sun = new Date(response.data.sunStartTime);

    if (now.weekday() === 0){
        return sun;
    }
    if (now.weekday() === 1){
        return mon;
    }
    if (now.weekday() === 2){
        return tue;
    }
    if (now.weekday() === 3){
        return wed;
    }
    if (now.weekday() === 4){
        return thu;
    }
    if (now.weekday() === 5){
        return fri;
    }
    if (now.weekday() === 6){
        return sat;
    }


}
function workEndDay(response) {
    let now = moment(currentTime());
    let mon = new Date(response.data.monEndTime);
    let tue = new Date(response.data.tueEndTime);
    let wed = new Date(response.data.wedEndTime);
    let thu = new Date(response.data.thuEndTime);
    let fri = new Date(response.data.friEndTime);
    let sat = new Date(response.data.satEndTime);
    let sun = new Date(response.data.sunEndTime);

    if (now.weekday() === 0){
        return sun;
    }
    if (now.weekday() === 1){
        return mon;
    }
    if (now.weekday() === 2){
        return tue;
    }
    if (now.weekday() === 3){
        return wed;
    }
    if (now.weekday() === 4){
        return thu;
    }
    if (now.weekday() === 5){
        return fri;
    }
    if (now.weekday() === 6){
        return sat;
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
                scope.startTime = workStartDay(response);
                scope.startHour = (scope.startTime.getHours()<10?'0':'') + scope.startTime.getHours();
                scope.startMinute = (scope.startTime.getMinutes()<10?'0':'') + scope.startTime.getMinutes();
                scope.endTime = workEndDay(response);
                scope.endHour = (scope.endTime.getHours()<10?'0':'') + scope.endTime.getHours();
                scope.endMinute = (scope.endTime.getMinutes()<10?'0':'') + scope.endTime.getMinutes();
                scope.alwaysOpen = response.data.alwaysOpen;

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

