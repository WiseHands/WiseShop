angular.module('WiseHands')
    .controller('FilterOptionsController', function ($scope, shared){
        $scope.filterOptions = shared.filterOptions || [];

        $scope.orderStateFilter = function (orderState) {
            var i = $.inArray(orderState, $scope.filterOptions);
            if (i > -1) {
                $scope.filterOptions.splice(i, 1);
                shared.setFilterOptions($scope.filterOptions);
            } else {
                $scope.filterOptions.push(orderState);
                shared.setFilterOptions($scope.filterOptions);
            }
        };

        $scope.isOptionChecked = function (type) {
            return $.inArray(type, $scope.filterOptions) > -1;
        };
        function loadOptions() {
            $scope.filterOptions = shared.getFilterOptions();
        }
        loadOptions();
    });