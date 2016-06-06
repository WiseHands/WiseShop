    angular.module('WiseHands')
        .controller('OrderListController', function ($scope, $http, shared) {
            $http({
                method: 'GET',
                url: '/orders'
            })
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
            function loadOptions() {
                $scope.options = shared.getFilterOptions();
            }

            loadOptions();

            $scope.orderFilter = function(item) {
                if ($scope.options.length > 0) {
                    if ($.inArray(item.state, $scope.options) < 0)
                        return;
                }

                return item;
            };
        });
