angular.module('WiseHands')
    .controller('AnalyticsController', ['$scope', '$http', 'sideNavInit', 'signout',
        function ($scope, $http, sideNavInit, signout) {
            $scope.loading = true;

            var token = localStorage.getItem('X-AUTH-TOKEN');
            var userId = localStorage.getItem('X-AUTH-USER-ID');

            $scope.getMainAnalyticsData = function (days) {
                $scope.loading = true;
                $scope.days = days;
                $http({
                    method: 'GET',
                    url: '/analytics' + days,
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
                        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                        $scope.options = {
                            scales: {
                                yAxes: [
                                    {
                                        id: 'y-axis-1',
                                        type: 'linear',
                                        display: true,
                                        position: 'left'
                                    },
                                    {
                                        id: 'y-axis-2',
                                        type: 'linear',
                                        display: true,
                                        position: 'right'
                                    }
                                ]
                            }
                        };
                        $scope.loading = false;
                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.status = 'Щось пішло не так...';
                    });

            };
            $scope.getMainAnalyticsData('');

            sideNavInit.sideNav();

        }]);




