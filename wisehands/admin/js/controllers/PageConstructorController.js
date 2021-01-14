angular.module('WiseHands')
    .controller('PageConstructorController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
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

        sideNavInit.sideNav();
                    $scope.loading = false;

        $http({
            method: 'GET',
            url: '/pageconstructor'
        })
            .then(function successCallback(response) {

                response.data.forEach(item => {
                   let backGroundImageIndex = Math.floor(Math.random() * 10) + 1;
                   let imageUrl =  "/wisehands/assets/images/pages-bg/pagebg" +backGroundImageIndex+ ".jpg";
                    item.imageUrl = imageUrl;
                });

                $scope.pagesList = response.data;
                setPageName($scope.pagesList);
                console.log("GET response.data: ", response.data);
                $scope.loading = false;
            }, function errorCallback(response) {
                console.log("GET response.data error: ", response);

                $scope.loading = false;
            });

            setPageName = (pagesList) => {
                console.log('$scope.pagesList', pagesList);
                pagesList.forEach(page => {
                    if (page.pageTitleTextTranslationBucket) {
                        page.pageTitleTextTranslationBucket.translationList.forEach(item => {
                            if (item.language === $scope.language) {
                                page.title = item.content;
                            }
                        });
                    };
                }) ;
            };



                    // end of some code for coupons
    }]);
