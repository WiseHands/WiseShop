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

            $http.post('/product', formdata, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                .success(function(data){
                    $location.path('/product/details/' + data.uuid);
                })
                .error(function(){
                    console.log(error);
                });
        };
    });