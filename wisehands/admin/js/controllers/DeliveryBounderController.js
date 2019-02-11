(function(){
    angular.module('WiseHands')
        .controller('DeliveryBounderController', ['$scope', '$http', '$route', '$location', function($scope, $http, $route, $location) {
            $http({
                method: 'GET',
                url: '/contact/details'
            })
                .then(function successCallback(response) {
                    $scope.contacts = response.data;
                    window.init_map($scope.contacts.latLng);
                    console.log($scope.contacts.latLng);
                }, function errorCallback(data) {
                    $scope.status = 'Щось пішло не так...';
                });

        }]);


})();