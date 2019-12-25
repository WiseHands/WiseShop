angular.module('WiseHands')
    .controller('AnalyticsController', ['$scope', '$http', '$route', 'sideNavInit', 'signout',
        function ($scope, $http, $route, sideNavInit, signout) {
            $scope.loading = true;

            let fromDate = document.getElementById("seventhDayForAnalytics");
            let toDate = document.getElementById("firstDayForAnalytics");

            $scope.getMainAnalyticsData = function (days) {
                $scope.loading = true;
                $scope.days = days;
                $http({
                    method: 'GET',
                    url: '/analytics' + days,
                })
                    .then(function successCallback(response) {
                        $scope.analytics = response.data;
                        $scope.popularProducts = response.data.popularProducts;
                        $scope.frequentBuyers = response.data.frequentBuyers;
                        let arrayTime = $scope.analytics.chartData;

                        fromDate.value = arrayTime[arrayTime.length - 1].day.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
                        toDate.value = arrayTime[0].day.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");

                        console.log('fromDate.value ', fromDate.value);
                        console.log('toDate.value ', toDate.value);

                        // setDataTypeForAnalytics(response.data.chartData);
                        console.log('$scope.analytics:____ ', $scope.analytics);
                        console.log('$scope.frequentBuyers:____ ', $scope.frequentBuyers);

                        if(!$scope.analytics.totalToday){
                            $scope.analytics.totalToday = 0;
                        }

                        var labels = [];
                        var data = [];
                        for(var i=0; i<$scope.analytics.chartData.length; i++) {
                            var item = $scope.analytics.chartData[i];
                            labels.push(item.day);
                            if(!item.total.totalSum) {
                                item.total.totalSum = 0;
                            }
                            data.push(item.total.totalSum);
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

            function convertDateToMilissecondsWithoutTimezoneOffset(date) {
                let myDate = new Date(date);
                let offset = myDate.getTimezoneOffset() * 60 * 1000;

                let withOffset = myDate.getTime();
                let withoutOffset = withOffset - offset;
                console.log(withOffset);
                console.log(withoutOffset);
                return withoutOffset;
            }

            $scope.calculateDayRange = function(){
                let fromDate = new Date(document.getElementById("seventhDayForAnalytics").value);
                let toDate = new Date(document.getElementById("firstDayForAnalytics").value);
                console.log('fromDate.value for calculateDayRange: ', fromDate);
                console.log('toDate.value for calculateDayRange: ', toDate);

                $http({
                    method: 'GET',
                    url:
                    '/analytics/from/' +
                    convertDateToMilissecondsWithoutTimezoneOffset(fromDate) +
                    '/to/' +
                    convertDateToMilissecondsWithoutTimezoneOffset(toDate)
                })
                    .then(function successCallback(response) {
                      console.log(response.data);
                      $scope.analytics = response.data;
                      var labels = [];
                      var data = [];
                      for(var i=0; i<$scope.analytics.chartData.length; i++) {
                          var item = $scope.analytics.chartData[i];
                          labels.push(item.day);
                          if(!item.total.totalSum) {
                              item.total.totalSum = 0;
                          }
                          data.push(item.total.totalSum);
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
              }).then(function successCallback(response) {
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
