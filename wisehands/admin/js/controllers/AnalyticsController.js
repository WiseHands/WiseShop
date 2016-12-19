angular.module('WiseHands')
    .controller('AnalyticsController', ['$scope', '$http', 'sideNavInit', 'signout',
        function ($scope, $http, sideNavInit, signout) {
            $scope.loading = true;

            var token = localStorage.getItem('X-AUTH-TOKEN');
            var userId = localStorage.getItem('X-AUTH-USER-ID');


            $http({
                method: 'GET',
                url: '/analytics',
                headers: {
                    'X-AUTH-TOKEN': token,
                    'X-AUTH-USER-ID': userId
                }
            })
                .then(function successCallback(response) {
                    $scope.analytics = response.data;
                    if(!$scope.analytics.totalToday){
                        $scope.analytics.totalToday = 0;
                    }
                    $scope.labels = $scope.analytics.namesOfWeek;
                    $scope.data = $scope.analytics.totalsOfEachDay;

                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.status = 'Щось пішло не так...';
                });


            sideNavInit.sideNav();

// chart data example
            var now = moment().endOf('day').toDate();
            var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
            var chartData = d3.time.days(yearAgo, now).map(function (dateElement) {
                return {
                    date: dateElement,
                    count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 10)
                };
            });
            var heatmap = calendarHeatmap()
                .data(chartData)
                .selector('.container')
                .tooltipEnabled(true)
                .colorRange(['#f4f7f7', '#79a8a9'])
                .onClick(function (data) {
                    console.log('data', data);
                });
            heatmap();  // render the chart

        }]);




