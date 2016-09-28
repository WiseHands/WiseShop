angular.module('WiseHands')
    .service('shared', [ function() {
        var filterOptions = [];
        var isSortingActive = true;
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
            }
        }
    }]);