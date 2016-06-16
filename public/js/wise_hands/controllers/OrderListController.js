    angular.module('WiseHands')
        .controller('OrderListController', function ($scope, $http, shared) {
            $scope.isSortingActive = shared.isSortingActive;
            
            var req = {
                method: 'GET',
                url: '/orders',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                },
                data: {}
            }
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

            function loadOptions() {
                $scope.filterOptions = shared.getFilterOptions();
                $scope.isSortingActive = shared.getSortOptions();
            }

            loadOptions();

            $scope.isOptionChecked = function (type) {
                return $.inArray(type, $scope.filterOptions) > -1;
            };
            
            $scope.orderFilter = function(item) {
                if ($scope.filterOptions.length > 0) {
                    if ($.inArray(item.state, $scope.filterOptions) < 0)
                        return;
                }

                return item;
            };
            $scope.search = function (item) {
                if (!$scope.query){
                    return true;
                }
                return ((item.name.indexOf($scope.query) || '') !== -1) ||
                    ((item.total.toString().indexOf($scope.query) || '') !== -1);
            };
            $scope.setSortOption = function () {
                shared.setSortOptions($scope.isSortingActive);
            };
        });
