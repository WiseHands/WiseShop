angular.module('WiseShop')
    .service('shared', [ function() {
        var productsToBuy = [];
        var total = 0;
        var categoryUuid = '';
        var paymentButton = '';
        var currentOrderUuid = '';
        return {
            getProductsToBuy: function () {
                return productsToBuy;
            },
            setProductsToBuy: function (value) {
                productsToBuy = value;
            },

            getCategoryUuid: function () {
                return categoryUuid;
            },
            setCategoryUuid: function (value) {
                categoryUuid = value;
            },
            getTotal: function () {
                return total;
            },
            setTotal: function (value) {
                total = value;
            },
            getPaymentButton: function () {
                return paymentButton;
            },
            setPaymentButton: function (value) {
                paymentButton = value;
            },
            getCurrentOrderUuid: function () {
                return currentOrderUuid;
            },
            setCurrentOrderUuid: function (value) {
                currentOrderUuid = value;
            }
        }
    }]);