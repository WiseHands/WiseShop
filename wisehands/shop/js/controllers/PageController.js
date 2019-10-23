(function(){
    angular.module('WiseShop')
        .controller('PageController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

            $http({
                method: 'GET',
                url: '/pageconstructor/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.page = response.data;
                    console.log("response:",response);
                }, function errorCallback(data) {
                    $scope.status = 'Щось пішло не так...';
                });


        }]);


})();