    angular.module('WiseHandsMain')
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
            };

            var googleUser = {};
            var startApp = function() {
                gapi.load('auth2', function(){
                    // Retrieve the singleton for the GoogleAuth library and set up the client.
                    auth2 = gapi.auth2.init({
                        client_id: '226448583548-f0d5694lbcpl72juk3ul53utg6gl92hj.apps.googleusercontent.com',
                        scope: 'profile email'
                    });
                    attachSignin(document.getElementById('my-signin2'));
                });
            };
            function attachSignin(element) {
                console.log(element.id);
                auth2.attachClickHandler(element, {},
                    function(googleUser) {
                        var profile = googleUser.getBasicProfile();
                        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                        console.log('Name: ' + profile.getName());
                        console.log('Image URL: ' + profile.getImageUrl());
                        console.log('Email: ' + profile.getEmail());

                        $http({
                            method: 'POST',
                            url: '/login/google?email=' + profile.getEmail()
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


                        });
            }
            
            $scope.googleSignIn = function () {
                window.auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(signInCallback);

            };

            function signInCallback(authResult) {
                if (authResult['code']) {
                    // Send the code to the server //TODO: change to http://wisehands.me
                    $.ajax({
                        type: 'POST',
                        url: '/storeauthcode?authCode=' + authResult['code'],
                        contentType: 'application/octet-stream; charset=utf-8',
                        success: function(user) {
                            console.log(user);
                        },
                        processData: false,
                        data: authResult['code']
                    });
                } else {
                    // There was an error.
                }
            }

            window.startApp = startApp;
        });
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}





