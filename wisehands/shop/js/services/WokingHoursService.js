
function workStartDay(data) {
    let now = moment(currentTime());
    let mon = new Date(data.monStartTime);
    let tue = new Date(data.tueStartTime);
    let wed = new Date(data.wedStartTime);
    let thu = new Date(data.thuStartTime);
    let fri = new Date(data.friStartTime);
    let sat = new Date(data.satStartTime);
    let sun = new Date(data.sunStartTime);

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

function workEndDay(data) {
    let now = moment(currentTime());
    let mon = new Date(data.monEndTime);
    let tue = new Date(data.tueEndTime);
    let wed = new Date(data.wedEndTime);
    let thu = new Date(data.thuEndTime);
    let fri = new Date(data.friEndTime);
    let sat = new Date(data.satEndTime);
    let sun = new Date(data.sunEndTime);

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

function isShopClosedToday(data) {
    let now = moment(currentTime());
    let isOpenMon = data.monOpen;
    let isOpenTue = data.tueOpen;
    let isOpenWed = data.wedOpen;
    let isOpenThu = data.thuOpen;
    let isOpenFri = data.friOpen;
    let isOpenSat = data.satOpen;
    let isOpenSun = data.sunOpen;

    if (now.weekday() === 0){
        return !isOpenSun;
    }
    if (now.weekday() === 1){
        return !isOpenMon;
    }
    if (now.weekday() === 2){
        return !isOpenTue;
    }
    if (now.weekday() === 3){
        return !isOpenWed;
    }
    if (now.weekday() === 4){
        return !isOpenThu;
    }
    if (now.weekday() === 5){
        return !isOpenFri;
    }
    if (now.weekday() === 6){
        return !isOpenSat;
    }
}

function workingHoursHandler(data) {

    let startTime = workStartDay(data);
    let startHour = (startTime.getHours()<10?'0':'') + startTime.getHours();
    let startMinute = (startTime.getMinutes()<10?'0':'') + startTime.getMinutes();

    let endTime = workEndDay(data);
    let endHour = (endTime.getHours()<10?'0':'') + endTime.getHours();
    let endMinute = (endTime.getMinutes()<10?'0':'') + endTime.getMinutes();

    let currDate =  new Date();
    let currTime = currDate.getHours() * 60 + currDate.getMinutes();
    let firstTime = Number(startHour * 60) + Number(startMinute);
    let lastTime = Number(endHour * 60 === 0 ? 1440 : endHour * 60) + Number(endMinute);

    let isNotWorkingTime;
    let alwaysOpen = data.alwaysOpen;
    if (alwaysOpen === true) {
        isNotWorkingTime = true;
        console.log('shop is working, shop configured to be always opened');
    } else if (currTime >= firstTime && currTime < lastTime){
        isNotWorkingTime = true;
    } else {
        isNotWorkingTime = false;
        console.log('shop is not working, current datetime is not in working range');
    }

    let isShopClosedNow = isShopClosedToday(data);
    console.log("isShopClosedNow", isShopClosedNow);
    let IS_SHOP_OPENED = false;
    let MESSAGE = '';
    if(!isShopClosedNow){
        MESSAGE = 'Сьогодні не працюємо';
    } else if (!isNotWorkingTime) {
        MESSAGE = 'Ми працюємо з ' + startHour + '-' + startMinute + ' до ' + endHour + '-' + endMinute;
    } else {
        IS_SHOP_OPENED = true;
        MESSAGE = '';
        console.log('Працюємо');
    }
    window.IS_SHOP_OPENED = IS_SHOP_OPENED;
    window.MESSAGE = MESSAGE;

    isShopClosedNow = isNotWorkingTime;
    return isShopClosedNow;
}

function getData() {
    let isShopWorkingForSellProduct;
    fetch('/shop/details/public', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        isShopWorkingForSellProduct = workingHoursHandler(data);
        console.log("isShopWorking for buy product", isShopWorkingForSellProduct);
        return isShopWorkingForSellProduct;

    });
}

function setWorkingHoursService() {
   const isShopWorking = getData();
   console.log("get isShopWorking from getData()", isShopWorking);
   return isShopWorking;
}

setWorkingHoursService();



