angular.module('WiseHands')
    .controller('AddPropertyController', ['$scope', '$http', 'signout', '$routeParams', '$location', function ($scope, $http, signout, $routeParams, $location) {
        $scope.loading = false;
        $scope.productUuid = $routeParams.productUuid;
        $scope.categoryUuid = $routeParams.categoryUuid;
        var locale = localStorage.getItem('locale');

        $scope.addTag = function () {
            var e = jQuery.Event("keypress");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            $("#theInputToTest").trigger(e);
        };

        $scope.createProperty = function () {
            if (locale === 'en_US'){
                var emptyTagWarning = 'Create, please, one or more property option';
            } else if (locale === 'uk_UA') {
                emptyTagWarning = 'Створіть, будь ласка, одну або більше опцію властивості';
            }
            if (!$scope.property.tags) {
                toastr.error(emptyTagWarning)

            } else {
                $scope.loading = true;
                $http({
                    method: 'POST',
                    url: '/api/category/' + $scope.categoryUuid + '/property',
                    data: $scope.property
                })
                    .then(function successCallback(response) {
                        $location.path('/products/details/' + $scope.productUuid + '/edit');
                        $scope.loading = false;
                    }, function errorCallback(response) {
                        $scope.loading = false;
                        console.log(response);
                    });
            }

        }
    }]);




