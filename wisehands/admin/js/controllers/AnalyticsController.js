angular.module('WiseHands')
    .controller('AnalyticsController', ['$scope', '$http', 'sideNavInit', 'signout', '$timeout',
        function ($scope, $http, sideNavInit, signout, $timeout) {
            // $scope.loading = true;

            var token = localStorage.getItem('X-AUTH-TOKEN');
            var userId = localStorage.getItem('X-AUTH-USER-ID');


            $http({
                method: 'GET',
                url: '/shops',
                headers: {
                    'X-AUTH-TOKEN': token,
                    'X-AUTH-USER-ID': userId
                }
            })
                .then(function successCallback(response) {
                    $scope.requestQueue -= 1;
                    if ($scope.requestQueue === 0) {
                        $scope.loading = false;
                    }
                    $scope.shops = response.data;

                    $scope.shops.forEach(function(shop, key, array) {
                        if (shop.domain === $scope.hostName){
                            shop.startTime = new Date(shop.startTime);
                            shop.endTime = new Date(shop.endTime);
                            $scope.selectedShop = shop;
                        }
                    });

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.requestQueue -= 1;
                    if ($scope.requestQueue === 0) {
                        $scope.loading = false;
                    }
                    $scope.status = 'Щось пішло не так...';
                });


            sideNavInit.sideNav();
            var option = {
                responsive: true,
            };
            var data = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };
            var ctx = document.getElementById("myChart").getContext('2d');
            var myLineChart = new Chart(ctx).Line(data, option);

        }]);


