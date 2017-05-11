angular.module('WiseHands')
    .controller('UsersSettingsController', ['$scope', '$http', 'signout', 'sideNavInit', function ($scope, $http, signout, sideNavInit) {
        $scope.loading = true;

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
            });

        $scope.hideCreateUserModal = function () {
            $('#createNewUserModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };

        $scope.getUserImage = function (user) {
          if (user.profileUrl) {
              return user.profileUrl;
          } else if (user.profileUrl) {
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
        // $scope.isNewUserEmailValid = function () {
        //     $scope.newUserEmailValid = false;
        //     $scope.users.forEach(function (user, key, array) {
        //         $scope.newUserEmailErrorMessage = '';
        //         if ($scope.newUser.email === user.email) {
        //             $scope.newUserEmailValid = true;
        //         }
        //     });
        // };
        $scope.createNewUser = function () {
            $scope.loading = true;
            var email = $scope.newUser.email || '';
            var phone = $scope.newUser.phone || '';
            $http({
                method: 'POST',
                url: '/shop/user?email=' + email + '&phone=' + phone,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.userError = '';
                    $scope.newUser.email = '';
                    $scope.newUser.phone = '';
                    $scope.loading = false;
                    $scope.users.push(response.data);
                    $scope.hideCreateUserModal();
                }, function errorCallback(response) {
                    $scope.userError = response.data;
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };


        $scope.activeUser = function (index){
            $scope.userEmail = $scope.users[index].email || '';
            $scope.userPhone = $scope.users[index].phone || '';
            $scope.spliceIndex = index;
        };
        var currentUser = localStorage.getItem('X-AUTH-USER-ID');
        $scope.noDeleteForActiveUser = function (index) {
            if (currentUser === $scope.users[index].uuid) {
                return true;
            } else {
                return false;
            }
        };
        $scope.hideModal = function () {
            $('#deleteUser').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.succesfullDelete = false;
            $scope.deleteButton = true;
        };
        $scope.deleteButton = true;
        $scope.deleteUser = function () {
            $scope.deleteButton = false;
            $scope.modalSpinner = true;
            $http({
                method: 'DELETE',
                url: '/shop/user?email=' + $scope.userEmail + '&phone=' + $scope.userPhone,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.users.splice($scope.spliceIndex, 1);
                    $scope.modalSpinner = false;
                    $scope.succesfullDelete = true;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.modalSpinner = false;
                    console.log(response);
                });

        };
        sideNavInit.sideNav();
    }]);
