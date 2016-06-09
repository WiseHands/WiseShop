angular.module('WiseHands')
    .controller('SubmitNewProductController', function ($scope, $location, $http) {
        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            formdata.append('photo', $files[0]);
        };
        $scope.submitProduct = function () {
            formdata.append('name', $scope.product.name);
            formdata.append('description', $scope.product.description);
            formdata.append('price', $scope.product.price);
    
    
            var request = {
                method: 'POST',
                url: '/product',
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request)
                .success(function (data) {
                    $location.path('/product/details/' + data.uuid);
                })
                .error(function () {
                    console.log(error);
                });
        };
        // $(".button").click( function() {
        //     $('#addNewProductForm').trigger('submit');
        // });
    });