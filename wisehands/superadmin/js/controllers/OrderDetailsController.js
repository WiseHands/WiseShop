angular.module('SuperWiseHands')
    .controller('OrderDetailsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
        function($scope, $http, sideNavInit, $routeParams) {
            sideNavInit.sideNav();
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/sudo/order/' + $routeParams.uuid,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.order = response.data;
                    var date = new Date($scope.order.time);
                    var ddyymm = new Date($scope.order.time).toISOString().slice(0,10);
                    var hour = (date.getHours()<10?'0':'') + date.getHours();
                    var minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
                    $scope.properDate = ddyymm + ' ' + hour + ':' + minute;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    $scope.status = 'Щось пішло не так...';
                });

            $scope.orderState = function(order){
                if (!order) return;
                if (order.state === "NEW"){
                    return 'Нове';
                } else if (order.state === "PAYED") {
                    return 'Оплачено';
                } else if (order.state === "CANCELLED") {
                    return 'Скасовано';
                } else if (order.state === "SHIPPED") {
                    return 'Надіслано';
                } else if (order.state === "MANUALLY_PAYED") {
                    return 'Оплата на місці';
                } else if (order.state === "PAYMENT_ERROR") {
                    return 'Помилка оплати';
                } else if (order.state === "DELETED") {
                    return 'Видалене';
                }
            };
            $scope.deleteMessage = 'Ви дійсно хочете видалити дане замовлення?';
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
                    url: '/sudo/order/' + $routeParams.uuid,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.deleteMessage = 'Замовлення видалене.';
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

        }]);