angular.module('WiseHands')
    .controller('AnalyticsController', ['$scope', '$http', '$route', 'sideNavInit', 'signout',
        function ($scope, $http, $route, sideNavInit, signout) {
            $scope.loading = true;

            let fromDateInput = document.getElementById("fromDateForAnalytics");
            let toDateInput = document.getElementById("toDateForAnalytics");

            $scope.getMainAnalyticsData = function (days) {
                let format = "YYYY-MM-DD";

                const currentDate = new Date();
                const to = convertDateToMilissecondsWithoutTimezoneOffset(currentDate);

                fromDateInput.value = moment(to).format(format);


                let oneDayInMillis = 24*60*60*1000;
                let from = to - parseInt(days) * oneDayInMillis;

                toDateInput.value = moment(from).format(format);


                $scope.calculateDayRange(to, from);
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

            $scope.performRequestInGivenRange = function () {
                let fromDateInput = document.getElementById("fromDateForAnalytics");
                let toDateInput = document.getElementById("toDateForAnalytics");

                let fromDate = convertDateToMilissecondsWithoutTimezoneOffset(fromDateInput.value);
                let toDate = convertDateToMilissecondsWithoutTimezoneOffset(toDateInput.value);

                $scope.calculateDayRange(fromDate, toDate);
            };

            $scope.calculateDayRange = function(today, pastWeekDate){
                let fromDate = pastWeekDate;
                let toDate = today;
                console.log('fromDate.value for calculateDayRange: ', fromDate);
                console.log('toDate.value for calculateDayRange: ', toDate);

                $http({
                    method: 'GET',
                    url:
                    '/analytics/from/' +
                    fromDate +
                    '/to/' +
                    toDate
                })
                    .then(function successCallback(response) {
                      console.log(response.data);
                      $scope.analytics = response.data;

                      $scope.popularProducts = response.data.popularProducts;
                      $scope.frequentBuyers = response.data.frequentBuyers;

                        let arrayTime = $scope.analytics.chartData;

                        fromDateInput.value = arrayTime[arrayTime.length - 1].day.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
                        toDateInput.value = arrayTime[0].day.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");

                      $scope.loading = false;

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
            let week = 7;

            const currentDate = new Date();
            const formattedCurrentDate = convertDateToMilissecondsWithoutTimezoneOffset(currentDate);
            const pastWeekDate = currentDate.setDate(currentDate.getDate()- week);
            const formattedPassWeekDate = convertDateToMilissecondsWithoutTimezoneOffset(pastWeekDate);
            $scope.calculateDayRange(formattedCurrentDate, formattedPassWeekDate);

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
