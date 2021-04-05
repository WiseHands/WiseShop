angular.module('WiseHands')
    .controller('AnalyticsController', ['$scope', '$http', '$route', 'sideNavInit',
        function ($scope, $http, $route, sideNavInit) {
            $scope.loading = true;

            let fromDateInput = document.getElementById("fromDateForAnalytics");
            let toDateInput = document.getElementById("toDateForAnalytics");

            $scope.getMainAnalyticsData = (days) => {
                const currentDate = new Date();
                const to = convertDateToMilissecondsWithoutTimezoneOffset(currentDate);

                let oneDayInMillis = 24*60*60*1000;
                let from = to - parseInt(days) * oneDayInMillis;

                let format = "YYYY-MM-DD";
                fromDateInput.value = moment(to).format(format);
                toDateInput.value = moment(from).format(format);

                $scope.calculateDayRange(from, to);
            };

            convertDateToMilissecondsWithoutTimezoneOffset = (date) => {
                let myDate = new Date(date);
                let offset = myDate.getTimezoneOffset() * 60 * 1000;

                let withOffset = myDate.getTime();
                let withoutOffset = withOffset - offset;

                return withoutOffset;
            };

            $scope.performRequestInGivenRange = () => {
                let fromDate = convertDateToMilissecondsWithoutTimezoneOffset(fromDateInput.value);
                let toDate = convertDateToMilissecondsWithoutTimezoneOffset(toDateInput.value);
                $scope.calculateDayRange(fromDate, toDate);
            };

            $scope.calculateDayRange = (from, to) => {
                let fromDate = from;
                let toDate = to;
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
                    .then((response) => {
                      console.log('/analytics/from/ => ', response.data);
                      $scope.analytics = response.data;
                      $scope.popularProducts = response.data.popularProducts;
                      $scope.frequentBuyers = response.data.frequentBuyers;

                      let arrayTime = $scope.analytics.chartData;

                      toDateInput.value = arrayTime[arrayTime.length - 1].day.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
                      fromDateInput.value = arrayTime[0].day.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");

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

                    }, (error) =>{
                        $scope.status = 'Щось пішло не так...';
                    });

            };

            let week = 7;
            const currentDate = new Date();
            const formattedCurrentDate = convertDateToMilissecondsWithoutTimezoneOffset(currentDate);
            const pastWeekDate = currentDate.setDate(currentDate.getDate()- week);
            const formattedPastWeekDate = convertDateToMilissecondsWithoutTimezoneOffset(pastWeekDate);

            $scope.calculateDayRange(formattedPastWeekDate, formattedCurrentDate);

            sideNavInit.sideNav();

        }]);


