angular.module('WiseHands')
    .service('shared', [ function() {
        var filterOptions = [];
        var isSortingActive = true;
        var discountCards = [];
        return {
            getFilterOptions: function () {
                return filterOptions;
            },
            setFilterOptions: function (value) {
                filterOptions = value;
            },
            getSortOptions: function () {
                return isSortingActive;
            },
            setSortOptions: function (sortOption) {
                isSortingActive = sortOption;
            },
            getDiscountCards: function () {
                return  discountCards;
            },
            setDiscountCards: function (discountCard) {
                discountCards = discountCard;
            }
        }
    }]);