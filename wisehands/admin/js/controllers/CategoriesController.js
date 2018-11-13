angular.module('WiseHands')
    .controller('CategoriesController', ['$scope', '$http', 'sideNavInit', 'signout', function ($scope, $http, sideNavInit, signout) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/category'
        })
            .then(function successCallback(response) {
                $scope.categories = response.data;
                $scope.loading = false;
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });
        
        $scope.getCategory = function (category) {
            $scope.thisCategory = category;
            $scope.succesfullDelete = false;
            $scope.deleteButton = true;

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
                data: $scope.newCategory
            })
                .then(function successCallback(response) {
                    $scope.createdCategory = response.data;
                    $scope.categories.push($scope.createdCategory);
                    $scope.loading = false;
                    $scope.hideModal2();
                    $scope.newCategory = '';
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });
        };

        $scope.deleteCategory = function () {
            $scope.deleteButton = false;
            $scope.modalSpinner = true;
            $http({
                method: 'DELETE',
                url: '/category/' + $scope.thisCategory.uuid,
            })
                .then(function successCallback(response) {
                    $scope.categories.forEach(function(category, index){
                        if(category.uuid === $scope.thisCategory.uuid) {
                            $scope.categories.splice(index, 1);
                        }
                    });
                    $scope.modalSpinner = false;
                    $scope.succesfullDelete = true;

                }, function errorCallback(response) {
                    $scope.modalSpinner = false;
                    console.log(response);
                });

        };
        
        sideNavInit.sideNav();
    }]);
