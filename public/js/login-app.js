(function () {
    angular.module('sweety', [])
        .controller('LoginFormController', function($scope, $http) {
            $scope.logIn = function (){
                var params = {
                    email: $scope.email,
                    password: $scope.password
                };

                var encodedParams = encodeQueryData(params);

                $http({
                    method: 'POST',
                    url: '/signin?' + encodedParams
                })
                    .success(function (data, status, headers) {
                        var token = headers("X-AUTH-TOKEN");
                        var userId = data.uuid;

                        if(!token || !userId){
                            $scope.deniedMsg = false;
                            console.error('Token or userID not returned in server response');
                            return;
                        }

                        localStorage.setItem('X-AUTH-USER-ID', userId) ;
                        localStorage.setItem('X-AUTH-TOKEN', token) ;

                        if (data.shopList.length === 1){
                            var shop = data.shopList[0];
                            var domain = shop.domain;
                            window.location.href = window.location.protocol + '//' + domain + ':' + window.location.port + '/admin' +
                                '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN="+token;
                        }
                        if (data.shopList.length > 1) {
                            $scope.showShopList = true;
                            $scope.user = data;


                        }


                    }).
                error(function (data, status) {
                    console.log(JSON.stringify(data));

                    console.log(JSON.stringify(status));
                    $scope.deniedMsg = true;
                    $scope.accessDeniedMessage = data.status;
                });

            };
            $scope.properShop = function (shop) {
                var domain = shop.domain;
                var userId = localStorage.getItem('X-AUTH-USER-ID');
                var token = localStorage.getItem('X-AUTH-TOKEN');
                window.location.href = window.location.protocol + '//' + domain + ':' + window.location.port + '/admin' +
                    '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN="+token;
            }
        })
})();

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}