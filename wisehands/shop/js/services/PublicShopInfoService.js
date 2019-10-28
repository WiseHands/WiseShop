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
function isShopOpenToday(response) {
    let now = moment(currentTime());
    let isOpenMon = response.data.monOpen;
    let isOpenTue = response.data.tueOpen;
    let isOpenWed = response.data.wedOpen;
    let isOpenThu = response.data.thuOpen;
    let isOpenFri = response.data.friOpen;
    let isOpenSat = response.data.satOpen;
    let isOpenSun = response.data.sunOpen;

    if (now.weekday() === 0){
        return isOpenSun;
    }
    if (now.weekday() === 1){
        return isOpenMon;
    }
    if (now.weekday() === 2){
        return isOpenTue;
    }
    if (now.weekday() === 3){
        return isOpenWed;
    }
    if (now.weekday() === 4){
        return isOpenThu;
    }
    if (now.weekday() === 5){
        return isOpenFri;
    }
    if (now.weekday() === 6){
        return isOpenSat;
    }
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
                scope.isShopOpenNow = isShopOpenToday(response);

            },
            handleWorkingHours: function (scope) {
                let currDate =  new Date();
                let currTime = currDate.getHours() * 60 + currDate.getMinutes();
                var firstTime = Number(scope.startHour * 60) + Number(scope.startMinute);
                var lastTime = Number(scope.endHour * 60 === 0 ? 1440 : scope.endHour * 60) + Number(scope.endMinute);
                console.log("firstTime and lasttime for shop:", firstTime, " ** ", lastTime, "isworking ", currTime >= firstTime && currTime < lastTime);
                if (scope.alwaysOpen === true) {
                    scope.isNotWorkingTime = true;
                }
                else if (currTime >= firstTime && currTime < lastTime){
                    scope.isNotWorkingTime = true;
                    console.log('$scope.isNotWorkingTime in handleWorkingHours', scope.isNotWorkingTime);
                } else {
                    scope.isNotWorkingTime = false;
                    console.log('$scope.isNotWorkingTime in handleWorkingHours', scope.isNotWorkingTime);
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

