(function(){
    angular.module('WiseShop')
        .controller('ContactsController', ['$scope', '$http', '$route', '$location', function($scope, $http, $route, $location) {
            $http({
                method: 'GET',
                url: '/contact/details'
            })
                .then(function successCallback(response) {
                    $scope.contacts = response.data;
                    console.log(response);
                    initMap($scope.contacts.latLng);
                }, function errorCallback(data) {
                    $scope.status = 'Щось пішло не так...';
                });



            function initMap(latLng) {
                if (!latLng) return;
                var map;
                var cords = latLng.split(',');
                var lat = cords[0];
                var lng = cords[1];
                var var_location = new google.maps.LatLng(lat, lng);
                var var_map_options = {
                    center: var_location,
                    zoom: 15
                };
                var var_marker = new google.maps.Marker({
                    position: var_location,
                    map: map
                });
                // set googleMap By Id
                map = new google.maps.Map(document.getElementById("map-container"), var_map_options);
                var_marker.setMap(map);
            };



        }]);


})();