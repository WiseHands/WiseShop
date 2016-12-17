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

                    var data = {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [
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

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.status = 'Щось пішло не так...';
                });


            sideNavInit.sideNav();

            var option = {
                responsive: true
            };
            var data = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
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
                    ,
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


