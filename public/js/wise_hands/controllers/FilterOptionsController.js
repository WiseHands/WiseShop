angular.module('WiseHands')
    .controller('FilterOptionsController', function ($scope, $http, shared){
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
        var req = {
            method: 'GET',
            url: '/orders',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN')
            },
            data: {}
        };
        $http(req)
            .then(function successCallback(response) {
                var data = response.data;
                if(data.length === 0) {
                    $scope.status = 'Замовлення відсутні';
                } else {
                    $scope.orders = response.data;
                }
            }, function errorCallback(data) {
                $scope.status = 'Щось пішло не так...';
            });

        $scope.orderState = function(item){
            if (item.state === "NEW"){
                return '#0B1BF2';
            } else if (item.state === "PAYED") {
                return '#00BA0D';
            } else if (item.state === "CANCELLED") {
                return '#BC0005';
            } else if (item.state === "SHIPPED") {
                return '#9715BC';
            } else if (item.state === "RETURNED") {
                return '#A27C20';
            }
        };
    });