angular.module('WiseHands')
    .controller('DeliverySettingsController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', function ($scope, $http, $location, sideNavInit, signout) {
        $scope.loading = true;
        
        $http({
            method: 'GET',
            url: '/delivery',

        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.delivery = response.data;
            }, function errorCallback(response) {
                $scope.loading = false;
            });


        $scope.setDeliveryOptions = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/delivery',
                data: $scope.delivery,

            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $location.path('/delivery');
                    showInfoMsg("SAVED");
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                    showWarningMsg("ERROR");
                });

        };
        
        sideNavInit.sideNav();
       //google map init//

        $http({
            method: 'GET',
            url: '/shop/details'
        })
            .then(response => {
                if (response.data.delivery.courierPolygonData) $scope.courierPolygonData = JSON.parse(response.data.delivery.courierPolygonData);
                _getContactDetails();
            }, error => {
                $scope.status = 'Щось пішло не так з координатами.';
                console.log(error);
            });

        function _getContactDetails() {
            $http({
                method: 'GET',
                url: '/contact/details'
            })
                .then(response => {
                    const contacts = response.data;
                    if (contacts.latLng) _initMap(contacts.latLng);
                }, error => {
                    $scope.status = 'Щось пішло не так...';
                    console.log(error);
                });
        }

        function _initMap(latLng) {
            const cords = latLng.split(',');
            const lat = cords[0];
            const lng = cords[1];
            const var_location = new google.maps.LatLng(lat, lng);
            $scope.var_map_options = {
                streetViewControl: false,
                center: var_location,
                zoom: 10
            };
            $scope.map = new google.maps.Map(document.getElementById('googleMap'), $scope.var_map_options);
            const var_marker = new google.maps.Marker({
                position: var_location,
                map: $scope.map
            });
            var_marker.setMap($scope.map);
            _loadPolygon($scope.map, $scope.courierPolygonData);
        }
        function _loadPolygon(map, data) {
            if (Object.keys(data).length) map.data.addGeoJson(data);
        }
    }]);

function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}
function showInfoMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.info(msg);
}