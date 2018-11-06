    angular.module('WiseHandsMain')
        .controller('LoginFormController', ['$scope', '$http', 'userService', function($scope, $http, userService) {
            $scope.logIn = function (){
                var params = {
                    phone: $scope.phone,
                    password: $scope.password
                };

                var encodedParams = encodeQueryData(params);

                $http({
                    method: 'POST',
                    url: '/signin?' + encodedParams
                })
                .success(successLoginHandler)
                .error(errorLoginHandler);

            };
            $scope.properShop = function (shop) {
				var domain = shop.domain;
            	if (shop.domain === 'localhost') {
            		domain = document.domain;
            	}
                var userId = localStorage.getItem('X-AUTH-USER-ID');
                var token = localStorage.getItem('X-AUTH-TOKEN');
                window.location.href = window.location.protocol + '//' + domain + ':' + window.location.port + '/admin' +
                    '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN="+token;
            };

            
            
            $scope.googleSignIn = function () {
                window.auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(signInCallback);

            };

            function signInCallback(authResult) {
                if (authResult['code']) {
					$http({
						method: 'POST',
						url: '/storeauthcode?authCode=' + authResult['code']
					})
					.success(successLoginHandler)
					.error(errorLoginHandler);
                }
            }

            function successLoginHandler(data, status, headers) {
				var token = headers("X-AUTH-TOKEN");
				var jwtToken = headers("JWT_TOKEN");
				var userId = data.uuid;
				if(!token || !userId){
					$scope.deniedMsg = false;
					console.error('Token or userID not returned in server response');
					return;
				}

				localStorage.setItem('X-AUTH-USER-ID', userId);
				localStorage.setItem('X-AUTH-TOKEN', token);
				localStorage.setItem('JWT_TOKEN', jwtToken);

                if(data.email === 'patlavovach@gmail.com' || data.email === 'bohdaq@gmail.com'){
                    if (data.shopList && data.shopList.length === 0){
                        window.location.href = window.location.protocol + '//' + window.location.host + '/superadmin';
                        return;
                    } else	if (data.shopList && data.shopList.length >= 1) {
                        $scope.goToSuperWiseHands = function () {
                            window.location.href = window.location.protocol + '//' + window.location.host + '/superadmin';
                        };
                        $scope.showShopList = true;
                        $scope.showSuperWiseHands = true;
                        $scope.user = data;
                        return;
                    }
                }

				if (data.shopList && data.shopList.length === 1){
					var shop = data.shopList[0];
					var domain = shop.domain;
					window.location.href = window.location.protocol + '//' + domain + ':' + window.location.port + '/admin' +
					'?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN="+token;
				} else	if (data.shopList && data.shopList.length > 1) {
					$scope.showShopList = true;
					$scope.user = data;
				} if (!data.shopList || data.shopList.length === 0) {
                    window.location = '#/registerbygoogle';
                    data.isGoogleSignIn = true;
                    userService.user = data;
                }


			}

			function errorLoginHandler (data, status) {
				console.log('errorLoginHandler', data, status);
				$scope.errorCode = 'error.' + data.code;
				$scope.deniedMsg = true;
			}

        }]);
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}





