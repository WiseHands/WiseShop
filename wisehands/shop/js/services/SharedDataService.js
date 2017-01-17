angular.module('WiseShop')
    .service('shared', [ function() {
        var selectedItems = [];
        var totalItems = 0;
        var total = 0;
        var categoryUuid = '';
        var paymentButton = '';
        var currentOrderUuid = '';
        return {
            getSelectedItems: function () {
                return selectedItems;
            },
            setSelectedItems: function (value) {
                selectedItems = value;
            },
            getTotalItems: function () {
                return totalItems;
            },
            setTotalItems: function (value) {
                totalItems = value;
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