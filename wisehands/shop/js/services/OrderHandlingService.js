angular.module('WiseShop')
    .service('OrderHandling', [function() {
        return {
            prepareOrderInfo: function (scope) {
                scope.loading = true;
                var deliveryType;
                if (document.getElementById('radio1').checked) {
                    deliveryType = document.getElementById('radio1').value;
                } else if (document.getElementById('radio2').checked) {
                    deliveryType = document.getElementById('radio2').value;
                } else if(document.getElementById('radio3').checked) {
                    deliveryType = document.getElementById('radio3').value;
                }
                scope.params = {
                    deliveryType: deliveryType,
                    phone: new String(document.getElementById('phone').value),
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
                    newPostDepartment: document.getElementById('newPostDepartment').value,
                    selectedItems: scope.selectedItems,
                    comment: document.getElementById('comment').value,
                    coupon: document.getElementById('couponId').value
                };
                var encodedParams = encodeQueryData(scope.params);
            },
            handleOrderData: function (scope, response) {
                scope.loading = false;
                scope.successfullResponse = true;
                var modalContent = document.querySelector(".proceedWithPayment");
                modalContent.innerHTML = response.data.button;
                scope.currentOrderUuid = response.data.uuid;
            },
            payOrder: function (){
                $("#paymentButton").click(function(e) {
                    var rootDiv = document.querySelector('.proceedWithPayment');
                    rootDiv.firstChild.submit();
                });
            },
            couponSuccess: function(scope, response) {
                scope.couponPlans = response.data;
                var discountTotalMatch = [];
                scope.couponPlans.forEach(function (couponPlan) {
                    if (couponPlan.minimalOrderTotal <= scope.total){
                        discountTotalMatch.push(couponPlan.minimalOrderTotal);
                    }
                });
                var largest = Math.max.apply(0, discountTotalMatch);
                scope.couponPlans.forEach(function (couponPlan) {
                    if (couponPlan.minimalOrderTotal === largest){
                        scope.currentPlan = couponPlan.minimalOrderTotal;
                        scope.total = scope.total - (scope.total * couponPlan.percentDiscount)/100;
                    }
                });
                scope.discountError = '';
                scope.loading = false;
            }
        }
    }]);
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}