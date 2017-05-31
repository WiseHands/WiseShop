    angular.module('WiseHands')
        .controller('OrderListController', ['$scope', '$http', 'shared', 'spinnerService', 'sideNavInit', 'signout', function ($scope, $http, shared, spinnerService, sideNavInit, signout) {
            $scope.isSortingActive = shared.isSortingActive;
            $scope.wrongMessage = false;
            $scope.loading = true;
            $scope.hideMoreButton = true;
            var locale = localStorage.getItem('locale');

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
                    localStorage.setItem('activeShop', $scope.activeShop.uuid);
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                });


            $http({
                method: 'GET',
                url: '/contact/details'
            })
                .then(function successCallback(response) {
                    var req = {
                        method: 'GET',
                        url: '/orders',
                        headers: {
                            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                            'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                        },
                        data: {}
                    };
                        $http(req)
                            .then(function successCallback(response) {
                                $scope.orders = response.data;
                                var maxNumberOfOrders = $scope.orders.length === 0 || $scope.orders.length < 12;
                                if (maxNumberOfOrders) {
                                    $scope.loading = false;
                                } else {
                                    $scope.hideMoreButton = false;

                                }

                                $scope.isAllOrdersDeleted = true;
                                var now = new Date();
                                var dateNow = new Date(now.getUTCFullYear(), now.getMonth(), now.getDate());
                                var startOfToday = dateNow.getTime();
                                var oneDayInMs = 86400000;
                                $scope.orders.forEach(function(order) {
                                    order.yesterdayString = false;
                                    if (startOfToday - oneDayInMs < order.time && startOfToday > order.time){
                                        order.yesterdayString = true;
                                    } else if (startOfToday < order.time) {
                                        var date = new Date(order.time);
                                        var hour = (date.getHours()<10?'0':'') + date.getHours();
                                        var minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
                                        order.properDate = hour + ':' + minute;
                                    } else {
                                        var orderDate = new Date(order.time);
                                        var orderDay = ("0" + orderDate.getDate()).slice(-2);
                                        var orderMonth = ("0" + (orderDate.getMonth() + 1)).slice(-2);
                                        order.properDate = orderDay + '.' + orderMonth;
                                    }
                                    if (order.state !== 'DELETED') {
                                        $scope.isAllOrdersDeleted = false;
                                    }
                                    $scope.loading = false;
                                });
                            }, function errorCallback(response) {
                                if (response.data === 'Invalid X-AUTH-TOKEN') {
                                    signout.signOut();
                                }
                                $scope.loading = false;
                                $scope.wrongMessage = true;
                            });
                    var contacts = response.data;
                    $scope.shopLatLng = contacts.latLng.replace(":", ",");
                }, function errorCallback(data) {
                    console.log(data);
                    $scope.loading = false;
                });




            $http({
                method: 'GET',
                url: '/balance',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.balanceWarning = false;
                    $scope.balance = response.data;
                    if ($scope.balance.balance < 0) {
                        $scope.balanceWarning = true;
                    }
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.wrongMessage = true;
                });

            var pageNumber = 1;
            $scope.moreOrders = function () {
                $scope.hideMoreButton = false;
                var req = {
                    method: 'GET',
                    url: '/orders?page=' + pageNumber,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    },
                    data: {}
                };

                $http(req)
                    .then(function successCallback(response) {
                        if(response.data.length !== 0) {
                            $scope.orders = $scope.orders.concat(response.data);
                        } else {
                            $scope.hideMoreButton = true;
                        }
                        $scope.isAllOrdersDeleted = true;
                        var now = new Date();
                        var dateNow = new Date(now.getUTCFullYear(), now.getMonth(), now.getDate());
                        var startOfToday = dateNow.getTime();
                        var oneDayInMs = 86400000;
                        $scope.orders.forEach(function(order){
                            order.yesterdayString = false;
                            if (startOfToday - oneDayInMs < order.time && startOfToday > order.time){
                                order.yesterdayString = true;
                            } else if (startOfToday < order.time) {
                                var date = new Date(order.time);
                                var hour = (date.getHours()<10?'0':'') + date.getHours();
                                var minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
                                order.properDate = hour + ':' + minute;
                            } else {
                                var orderDate = new Date(order.time);
                                var orderDay = ("0" + orderDate.getDate()).slice(-2);
                                var orderMonth = ("0" + (orderDate.getMonth() + 1)).slice(-2);
                                order.properDate = orderDay + '.' + orderMonth;
                            }
                            if (order.state !== 'DELETED') {
                                $scope.isAllOrdersDeleted = false;
                            }
                        });
                        pageNumber ++;
                        $scope.loading = false;
                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        $scope.wrongMessage = true;
                    });
            };

            $scope.orderState = function(item){
                if (item.state === "NEW"){
                    return 'flash_on';
                } else if (item.state === "PAYED") {
                    return 'credit_card';
                } else if (item.state === "CANCELLED") {
                    return 'highlight_off';
                } else if (item.state === "SHIPPED") {
                    return 'flight_land';
                } else if (item.state === "MANUALLY_PAYED") {
                    return 'attach_money';
                } else if (item.state === "PAYMENT_ERROR") {
                    return 'error_outline';
                }
            };

            $scope.orderStateString = function(order){
                if (!order) return;
                if (order.state === "NEW") {
                    if (locale === 'en_US') {
                        return 'New';
                    } else if (locale === 'uk_UA') {
                        return 'Нове';
                    }
                } else if (order.state === "PAYED") {
                    if (locale === 'en_US'){
                        return 'Payed';
                    } else if (locale === 'uk_UA') {
                        return 'Оплачено';
                    }
                } else if (order.state === "CANCELLED") {
                    if (locale === 'en_US'){
                        return 'Cancelled';
                    } else if (locale === 'uk_UA') {
                        return 'Скасовано';
                    }
                } else if (order.state === "SHIPPED") {
                    if (locale === 'en_US'){
                        return 'Shipped';
                    } else if (locale === 'uk_UA') {
                        return 'Надіслано';
                    }
                } else if (order.state === "MANUALLY_PAYED") {
                    if (locale === 'en_US'){
                        return 'Pay by cash';
                    } else if (locale === 'uk_UA') {
                        return 'Оплата на місці';
                    }
                } else if (order.state === "PAYMENT_ERROR") {
                    if (locale === 'en_US'){
                        return 'Payment error';
                    } else if (locale === 'uk_UA') {
                        return 'Помилка оплати';
                    }
                } else if (order.state === "DELETED") {
                    if (locale === 'en_US'){
                        return 'Deleted';
                    } else if (locale === 'uk_UA') {
                        return 'Видалене';
                    }
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
                    return 'lightseagreen';
                } else {
                    return 'white';
                }
            };
            sideNavInit.sideNav();

        }]);
