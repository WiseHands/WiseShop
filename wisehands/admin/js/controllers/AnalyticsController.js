angular.module('WiseHands')
    .controller('AnalyticsController', ['$scope', '$http', '$route', 'sideNavInit', 'signout',
        function ($scope, $http, $route, sideNavInit, signout) {
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/analytics/popularproducts'
            }).then(
                function successCallback(response){
                    $scope.popularProducts = response.data;
                    console.log("popularproducts", $scope.popularProducts.length > 3, response.data);

                }, function errorCallback(data) {
                    console.log("popularproducts",data);
                }
            );


            $scope.getMainAnalyticsData = function (days) {
                $scope.loading = true;
                $scope.days = days;
                $http({
                    method: 'GET',
                    url: '/analytics' + days,
                })
                    .then(function successCallback(response) {
                        $scope.analytics = response.data;
                        console.log('$scope.analytics:____ ', $scope.analytics);
                        if(!$scope.analytics.totalToday){
                            $scope.analytics.totalToday = 0;
                        }

                        var labels = [];
                        var data = [];
                        for(var i=0; i<$scope.analytics.chartData.length; i++) {
                            var item = $scope.analytics.chartData[i];
                            labels.push(item.day);
                            data.push(item.total);
                        }

                        $scope.labels = labels;
                        $scope.series = ['Total'];
                        $scope.data = [
                            data
                        ];
                        // $scope.onClick = function (points, evt) {
                        //     console.log(points, evt);
                        // };
                        // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                        // $scope.options = {
                        //     scales: {
                        //         yAxes: [
                        //             {
                        //                 id: 'y-axis-1',
                        //                 type: 'linear',
                        //                 display: true,
                        //                 position: 'left'
                        //             },
                        //             {
                        //                 id: 'y-axis-2',
                        //                 type: 'linear',
                        //                 display: true,
                        //                 position: 'right'
                        //             }
                        //         ]
                        //     }
                        // };
                        $scope.loading = false;
                    }, function errorCallback(response) {
                        $scope.status = 'Щось пішло не так...';
                    });

            };

              $scope.calculateDayRange = function(){
                var fromDate = new Date($scope.showTotalFromDate);
                var toDate = new Date($scope.showTotalToDate);

                $http({
                    method: 'GET',
                    url: '/analytics/from/' + fromDate + '/to/' + toDate
                })
                    .then(function successCallback(response) {
                      console.log(response.data);
                      $scope.analytics = response.data;
                      var labels = [];
                      var data = [];
                      for(var i=0; i<$scope.analytics.chartData.length; i++) {
                          var item = $scope.analytics.chartData[i];
                          labels.push(item.day);
                          data.push(item.total);
                      }

                      $scope.labels = labels;
                      $scope.series = ['Total'];
                      $scope.data = [
                          data
                      ];

                    }, function errorCallback(response) {
                        $scope.status = 'Щось пішло не так...';
                    });

              };

                $scope.loading = true;
                $http({
                    method: 'GET',
                    url: '/orders',
                })
                    .then(function successCallback(response) {
                        $scope.orders = response.data;
                        $scope.ordersAdresses = [];
                        $scope.orders.forEach (function(order){
                            if (order.destinationLat) {
                                var lat = parseFloat(order.destinationLat);
                                var lng = parseFloat(order.destinationLng);
                                var latLng = [];
                                latLng.push(order.address);
                                latLng.push(lat);
                                latLng.push(lng);
                                latLng.push(order.uuid);
                                $scope.ordersAdresses.push(latLng);
                            }
                        });
                        initialize($scope.ordersAdresses);
                        console.log("$scope.ordersAdresses = []", $scope.ordersAdresses = []);
                        $scope.loading = false;
                    }, function errorCallback(response) {
                        $scope.loading = false;
                    });

            $scope.getMainAnalyticsData('');

            sideNavInit.sideNav();

        }]);

function initialize(latLng) {
    var markers = latLng;
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    map = new google.maps.Map(document.getElementById("map-container"), mapOptions);
    map.setTilt(45);

    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            uuid: markers[i][3]
        });

        map.fitBounds(bounds);
        map.panToBounds(bounds);

        marker.addListener('click', function() {
            window.location.href = 'admin#/details/' + this.uuid;
        });
    }
}
