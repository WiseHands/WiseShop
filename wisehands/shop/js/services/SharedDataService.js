angular.module('WiseShop')
    .service('shared', [ function() {
        var selectedItems = [];
        var totalItems = 0;
        var categoryUuid = '';
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
            }
        }
    }]);