angular.module('WiseShop')
    .service('PublicShopInfo', ['shared', function(shared) {
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
            handleWorkingHours: function (scope) {
                scope.today = new Date();

                scope.startMinutes = scope.startTime.getHours() * 60 + scope.startTime.getMinutes();
                scope.endMinutes = scope.endTime.getHours() * 60 + scope.endTime.getMinutes();
                scope.nowMinutes = scope.today.getHours() * 60 + scope.today.getMinutes();

                scope.isNotWorkingTime = scope.nowMinutes < scope.startMinutes || scope.nowMinutes >= scope.endMinutes;
            },
            calculateTotal: function (scope) {
                scope.total = 0;
                scope.totalItems = 0;
                for(var i =0; i < scope.selectedItems.length; i++){
                    var item = scope.selectedItems[i];
                    scope.total += (item.quantity * item.price);
                    scope.totalItems += item.quantity;
                }
                shared.setTotalItems(scope.totalItems);
            }
        }
    }]);