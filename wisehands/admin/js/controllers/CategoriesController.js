angular.module('WiseHands')
    .controller('CategoriesController', ['$scope', '$http', 'sideNavInit', 'signout', '$window', function ($scope, $http, sideNavInit, signout, $window) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/shop/details'
        })
            .then(function successCallback(response) {
                $scope.language = (response.data.locale).slice(0, 2);
                $scope.loading = false;
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });

        $http({
            method: 'GET',
            url: '/api/category'
        })
            .then(function successCallback(response) {
                $scope.categories = response.data;
                setCategoryName($scope.categories);
                $scope.loading = false;
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });

        setCategoryName = (categories) => {
            console.log('$scope.categories', categories);
            categories.forEach(category => {
                if (category.categoryNameTextTranslationBucket) {
                    category.categoryNameTextTranslationBucket.translationList.forEach(item => {
                        if (item.language === $scope.language) {
                            category.name = item.content;
                        }
                    });
                }
            }) ;
        };

        $scope.$on('ngRepeatFinished', () => setCategoryName($scope.categories));

        $scope.redirectToTranslationPage = function (category) {
        $http({
            method: 'GET',
            url: '/api/get/translation/category/' + category.uuid
        })
            .then(function successCallback(response) {
                $('#categoryModal').modal('hide');
                const translationBucket = response.data;
                $window.location.href = `#/translation/${category.uuid}/${translationBucket.uuid}`;
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });
        };
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
                url: '/api/category/' + $scope.thisCategory.uuid + '/name/' + $scope.thisCategory.name,
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
                url: '/api/category',
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

        $scope.showDeleteModal = function (category) {
            $scope.succesfullDelete = false;
            $scope.deleteButton = true;
            $scope.hideModal();
        };

        $scope.deleteCategory = function () {
            $scope.deleteButton = false;
            $scope.modalSpinner = true;
            $http({
                method: 'DELETE',
                url: '/api/category/' + $scope.thisCategory.uuid,
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
