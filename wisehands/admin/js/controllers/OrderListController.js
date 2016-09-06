    angular.module('WiseHands')
        .controller('OrderListController', function ($scope, $http, shared, $route, spinnerService, signout) {
            $scope.$route = $route;
            $scope.isSortingActive = shared.isSortingActive;

            $scope.activeShop = {
                domain: '',
                shopName: ''
            };
            
            var req = {
                method: 'GET',
                url: '/orders',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                },
                data: {}
            };

            $scope.getResource = function () {
                spinnerService.show('mySpinner');

            $http(req)
                .then(function successCallback(response) {
                    spinnerService.hide('mySpinner');
                    var data = response.data;
                    if(data.length === 0) {
                        $scope.status = 'Замовлення відсутні';
                    } else {
                        $scope.orders = response.data;
                    }
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    spinnerService.hide('mySpinner');
                    $scope.status = 'Щось пішло не так...';
                });
            };

            $http({
                method: 'GET',
                url: '/shop/details',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.activeShop = response.data;

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
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
                } else if (item.state === "MANUALLY_PAYED") {
                    return '#A27C20';
                } else if (item.state === "PAYMENT_ERROR") {
                    return '#14CCC5';
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
                return ((item.name.toLowerCase().indexOf($scope.query) || '') !== -1) ||
                    ((item.total.toString().indexOf($scope.query) || '') !== -1) || ((item.name.indexOf($scope.query) || '') !== -1);
                
            };
            $scope.setSortOption = function () {
                shared.setSortOptions($scope.isSortingActive);
            };

            $scope.isFilterOn = function(){
                if ($scope.filterOptions.length > 0){
                    return '#5AD43D';
                } else {
                    return '#000000';
                }
            };

            $scope.getUrl = function (shop) {
                return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
            };
            $scope.signOut = signout.signOut;
        });
