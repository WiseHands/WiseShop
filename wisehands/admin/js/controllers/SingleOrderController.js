    angular.module('WiseHands')
        .controller('SingleOrderController', ['$http', '$scope', '$routeParams', 'signout',
            function($http, $scope, $routeParams, signout) {
                $scope.uuid = $routeParams.uuid;
                $scope.loading = true;
                var parser = new UAParser();
                var locale = localStorage.getItem('locale');

                $http({
                    method: 'GET',
                    url: '/order/' + $routeParams.uuid,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.loading = false;
                        var data = response.data;
                        var uastring = data.userAgent;
                        parser.setUA(uastring);
                        var result = parser.getResult();
                        $scope.userAgent = result.browser.name + " " + result.os.name + " " + result.os.version;
                        if(data.length === 0) {
                            $scope.status = 'Замовлення відсутні';
                        } else {
                            $scope.order = response.data;
                            var date = new Date($scope.order.time);
                            var ddyymm = new Date($scope.order.time).toISOString().slice(0,10);
                            var hour = (date.getHours()<10?'0':'') + date.getHours();
                            var minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
                            $scope.properDate = ddyymm + ' ' + hour + ':' + minute;
                        }

                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        $scope.status = 'Щось пішло не так...';
                    });
                
                $scope.hideModal = function () {
                    $('#deleteOrder').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                };
                $scope.deleteButton = true;
                $scope.deleteOrder = function () {
                    $scope.deleteButton = false;
                    $scope.modalSpinner = true;
                    $http({
                        method: 'DELETE',
                        url: '/order/' + $routeParams.uuid,
                        headers: {
                            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                            'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                        }
                    })
                        .then(function successCallback(response) {
                            $scope.modalSpinner = false;
                            $scope.succesfullDelete = true;
                        }, function errorCallback(response) {
                            if (response.data === 'Invalid X-AUTH-TOKEN') {
                                signout.signOut();
                            }
                            $scope.modalSpinner = false;
                            console.log(response);
                        });
                };
                $scope.orderState = function(order){
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
                
                $scope.cancelledOrder = function () {
                    $scope.loading = true;
                    $http({
                        method: 'PUT',
                        url: '/order/' + $routeParams.uuid + '/cancelled',
                        headers: {
                            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                            'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                        }
                    })
                        .then(function successCallback(response){
                            $scope.loading = false;
                            $scope.order = response.data;
                        }, function errorCallback(response){
                            if (response.data === 'Invalid X-AUTH-TOKEN') {
                                signout.signOut();
                            }
                            $scope.loading = false;
                            console.log(response);
                        });
                };
                $scope.shippedOrder = function () {
                    $scope.loading = true;
                    $http({
                        method: 'PUT',
                        url: '/order/' + $routeParams.uuid + '/shipped',
                        headers: {
                            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                            'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                        }
                    })
                        .then(function successCallback(response){
                            $scope.loading = false;
                            $scope.order = response.data;
                        }, function errorCallback(response){
                            if (response.data === 'Invalid X-AUTH-TOKEN') {
                                signout.signOut();
                            }
                            $scope.loading = false;
                            console.log(response);
                        });
                };
                $scope.goBack = function () {
                    window.history.back();
                }
            }]);
