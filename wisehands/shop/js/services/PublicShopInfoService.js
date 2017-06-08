angular.module('WiseShop')
    .service('PublicShopInfo', ['shared', function(shared) {
        return {
            handlePublicShopInfo: function (scope, response) {
                scope.shopName = response.data.name;
                scope.shopId = response.data.uuid;
                scope.startTime = new Date(response.data.startTime);
                scope.startHour = (scope.startTime.getHours()<10?'0':'') + scope.startTime.getHours();
                scope.startMinute = (scope.startTime.getMinutes()<10?'0':'') + scope.startTime.getMinutes();
                scope.endTime = new Date(response.data.endTime);
                scope.endHour = (scope.endTime.getHours()<10?'0':'') + scope.endTime.getHours();
                scope.endMinute = (scope.endTime.getMinutes()<10?'0':'') + scope.endTime.getMinutes();
                scope.alwaysOpen = response.data.alwaysOpen
            },
            handleWorkingHours: function (scope) {
                scope.today = new Date();

                scope.startMinutes = scope.startTime.getHours() * 60 + scope.startTime.getMinutes();
                scope.endMinutes = scope.endTime.getHours() * 60 + scope.endTime.getMinutes();
                scope.nowMinutes = scope.today.getHours() * 60 + scope.today.getMinutes();
                if (scope.alwaysOpen === true) {
                    scope.isNotWorkingTime = false;
                } else {
                    scope.isNotWorkingTime = scope.nowMinutes < scope.startMinutes || scope.nowMinutes >= scope.endMinutes;
                }
            },
            calculateTotal: function () {
                var products = shared.getProductsToBuy();
                var total = 0;
                for(var i = 0; i < products.length; i++){
                    total += products[i].price;
                }
                shared.setTotal(total);
                console.log(total);
                debugger;
            }
        }
    }]);