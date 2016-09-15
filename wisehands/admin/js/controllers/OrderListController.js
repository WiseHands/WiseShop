    angular.module('WiseHands')
        .controller('OrderListController', function ($scope, $http, shared, $route, spinnerService, signout, sideNavInit) {
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

            $scope.refreshOrders = function() {
                return new Promise( function( resolve, reject ) {

                    spinnerService.show('mySpinner');

                    $http(req)
                        .then(function successCallback(response) {
                            spinnerService.hide('mySpinner');
                            resolve();
                            var data = response.data;
                            if(data.length === 0) {
                                $scope.status = 'Замовлення відсутні';
                            } else {
                                $scope.orders = response.data;
                            }
                        }, function errorCallback(response) {
                            if (response.data === 'Invalid X-AUTH-TOKEN') {
                                reject();
                                signout.signOut();
                            }
                            spinnerService.hide('mySpinner');
                            $scope.status = 'Щось пішло не так...';
                        });
                } );
            };

            WebPullToRefresh.init( {
                loadingFunction: $scope.refreshOrders
            } );

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
                    return 'rgb(100, 181, 246)';
                } else if (item.state === "PAYED") {
                    return 'rgb(129, 199, 132)';
                } else if (item.state === "CANCELLED") {
                    return 'rgb(255, 183, 77)';
                } else if (item.state === "SHIPPED") {
                    return 'rgb(207, 216, 220)';
                } else if (item.state === "MANUALLY_PAYED") {
                    return 'rgb(221, 201, 230)';
                } else if (item.state === "PAYMENT_ERROR") {
                    return 'rgb(255, 171, 145)';
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
                var searcText = $scope.query.toLowerCase();
                var lowerCaseName = item.name.toLowerCase();
                var total = item.total.toString();
                return lowerCaseName.indexOf(searcText) != -1 || total.indexOf(searcText) !== -1;
                
            };
            $scope.setSortOption = function () {
                shared.setSortOptions($scope.isSortingActive);
            };

            $scope.isFilterOn = function(){
                if ($scope.filterOptions.length > 0){
                    return '#5AD43D';
                } else {
                    return 'white';
                }
            };

            $scope.getUrl = function (shop) {
                return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
            };
            $scope.signOut = signout.signOut;
            sideNavInit.sideNav();
            $scope.profile = JSON.parse(localStorage.getItem('profile'));

        });
