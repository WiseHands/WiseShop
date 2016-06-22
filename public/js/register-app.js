(function () {
    angular.module('sweety', [])
        .controller('ListViewController', function($scope, $http, $window) {
            $scope.signIn = function (){
                var params = {
                    email: $scope.email,
                    password: $scope.password,
                    passwordConfirmation: $scope.password,
                    shopName: $scope.shopName,
                    shopID: $scope.shopID,
                    publicLiqPayKey: $scope.publicLiqPay,
                    privateLiqPayKey: $scope.privateLiqPay,
                    clientDomain: $scope.domain

                };

                var encodedParams = encodeQueryData(params);

                $http({
                    method: 'POST',
                    url: '/signup?' + encodedParams
                })
                    .success(function (data, status, headers) {
                        // var token = headers("X-AUTH-TOKEN");
                        // var userId = data.uuid;

                        // $window.location.href = '/admin';
                    }).
                error(function (error) {
                    console.log(error);
                });
            };
        })
})();
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}