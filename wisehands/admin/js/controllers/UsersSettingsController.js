angular.module('WiseHands')
    .controller('UsersSettingsController', function ($scope, $route, $http, signout, sideNavInit) {
        $scope.$route = $route;
        $scope.loading = true;

        $scope.activeShop = {
            domain: '',
            shopName: ''
        };

        $http({
            method: 'GET',
            url: '/shop/details',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;

            }, function errorCallback(response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.status = 'Щось пішло не так...';
            });

        $http({
            method: 'GET',
            url: '/shop/user',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.users = response.data;
            }, function errorCallback(data) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });

        $scope.hideCreateUserModal = function () {
            $('#createNewUserModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };

        $scope.getUserImage = function (user) {
          if (user.profileUrl) {
              return user.profileUrl;
          } else {
              return '/wisehands/assets/images/onerror_image/onerror_image.png';
          }
        };
        $scope.getUserName = function (user) {
            if (user.name) {
                return user.name;
            } else {
                return 'No Name';
            }
        };

        $scope.createNewUser = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/shop/user?email=' + $scope.newUser.email,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.users.push(response.data);
                    $scope.hideCreateUserModal();
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };


        $scope.activeUser = function (index){
            $scope.userIndex = $scope.users[index].email;
            $scope.spliceIndex = index;
        };

        $scope.deleteMessage = 'Ви дійсно хочете видалити даного користувача?';
        $scope.hideModal = function () {
            $('#deleteUser').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.succesfullDelete = false;
            $scope.deleteMessage = 'Ви дійсно хочете видалити даного користувача?';
            $scope.deleteButton = true;

        };
        $scope.deleteButton = true;
        $scope.deleteUser = function () {
            $scope.deleteButton = false;
            $scope.modalSpinner = true;
            $http({
                method: 'DELETE',
                url: '/shop/user?email=' + $scope.userIndex,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.users.splice($scope.spliceIndex, 1);
                    $scope.modalSpinner = false;
                    $scope.succesfullDelete = true;
                    $scope.deleteMessage = 'Користувач видалений.';

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.modalSpinner = false;
                    console.log(response);
                });

        };

        $scope.getUrl = function (shop) {
            return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
        };
        $scope.signOut = signout.signOut;
        sideNavInit.sideNav();
        $scope.profile = JSON.parse(localStorage.getItem('profile'));
        $scope.getProfileImage = function () {
            if ($scope.profile.profileUrl) {
                return $scope.profile.profileUrl;
            } else {
                return '/wisehands/assets/images/onerror_image/onerror_image_white.png';
            }
        };
    });
