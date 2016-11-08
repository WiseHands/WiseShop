angular.module('WiseHands')
    .controller('CategoriesController', ['$scope', '$http', 'sideNavInit', 'signout', function ($scope, $http, sideNavInit, signout) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/category'
        })
            .then(function successCallback(response) {
                var data = response.data;
                if(data.length === 0){
                    $scope.status = 'Категорії відсутні';
                }
                $scope.categories = response.data;
                $scope.loading = false;
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });
        
        $scope.getCategory = function (category, $event) {
            $scope.thisCategory = category;
        };
        $scope.hideModal = function () {
            $('#categoryModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
        $scope.hideModal2 = function () {
            $('#newCategoryModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
        $scope.hideModal3 = function () {
            $('#deleteCategory').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
        $scope.updateCategory = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/category/' + $scope.thisCategory.uuid + '/name/' + $scope.thisCategory.name,
                data: $scope.thisCategory
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.hideModal();
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

        };

        $scope.createCategory = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/category',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                },
                data: $scope.newCategory
            })
                .then(function successCallback(response) {
                    $scope.createdCategory = response.data;
                    $scope.categories.push($scope.createdCategory);
                    $scope.loading = false;
                    $scope.hideModal2();

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });
        };
        $scope.deleteMessage = 'Ви дійсно хочете видалити дану категорію?';
        $scope.deleteCategoryWarning = '(Видалення категорії призведе до видалення всіх продуктів, які містяться в ній!)';
        $scope.deleteButton = true;
        $scope.deleteCategory = function () {
            $scope.deleteButton = false;
            $scope.modalSpinner = true;
            $http({
                method: 'DELETE',
                url: '/category/' + $scope.thisCategory.uuid,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.modalSpinner = false;
                    $scope.succesfullDelete = true;
                    $scope.deleteMessage = 'Категорія видалена.';

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
