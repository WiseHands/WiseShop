angular.module('WiseShop')
    .service('shared', [ function() {
        var selectedItems = [];
        var totalItems = 0;
        
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
            }
        }
    }]);