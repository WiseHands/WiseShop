angular.module('WiseHands')
    .controller('EditPageTranslationController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit', '$window',
                function ($scope, $http, signout, $routeParams, sideNavInit, $window) {
        $scope.loading = true;
        sideNavInit.sideNav();

        $scope.translationObjectUuid = $routeParams.objectUuid;
        $scope.translationBucketUuid = $routeParams.translationUuid;

        console.log('$scope.objectForTranslation', $scope.translationObjectUuid);
        console.log('$scope.translationBucket', $scope.translationBucketUuid);

        getRequest = (url) => {
            $http({
                method: 'GET',
                url: url
            })
                .then((response) => {
                    if (response.data === null){ return }
                    $scope.loading = false;
                    $scope.translationObject = response.data;
                    console.log('$scope.translationObject',$scope.translationObject);
                    setContentForBodyPage($scope.translationObject);
                }, (error) => {
                    $scope.loading = false;
                    console.log(error);
                });
        };

        getRequest(`/pageconstructor/${$scope.translationObjectUuid}`);

        setContentForBodyPage = (page) => {
            if (!page) { return }
            let pageBodyTextTranslationBucket = '';
            let englishNameLabel = '';
            let ukrainianNameLabel = '';
            if(page.pageBodyTextTranslationBucket){
                pageBodyTextTranslationBucket = page.pageBodyTextTranslationBucket.uuid;
                ukrainianNameLabel = page.pageBodyTextTranslationBucket.translationList[0].content;
                englishNameLabel = page.pageBodyTextTranslationBucket.translationList[1].content;
            }

            let isTranslationForCategory = $scope.translationBucketUuid === pageBodyTextTranslationBucket;
            if (isTranslationForCategory){
                if(ukrainianNameLabel === ""){
                   CKEDITOR.replace('uk');
                   CKEDITOR.instances["uk"].setData(page.body);
                } else {
                    CKEDITOR.replace('uk');
                    CKEDITOR.instances["uk"].setData(ukrainianNameLabel);
                }
                CKEDITOR.replace('en');
                CKEDITOR.instances["en"].setData(ukrainianNameLabel);
            }

        };



        $scope.loadImage = function () {
            $('#imageLoader').click();
        };

        $scope.saveThisPage = function () {
            $scope.loading = true;

            showInfoMsg("SAVED");
            let htmlData = CKEDITOR.instances["editor"].getData();
            let requestBody = {
                title: $scope.title,
                url: $scope.url,
                body: htmlData
            };

            $http({
                method: 'PUT',
                url: '/pageconstructor/' + $routeParams.uuid,
                data: requestBody
            })
                .then(function successCallback(response) {
                    console.log("PUT $scope.settings", response.data);
                    $scope.loading = false;
                    showInfoMsg("SAVED");
                }, function errorCallback(response) {
                    showWarningMsg("UNKNOWN ERROR");
                    console.log("PUT $scope.settings", response);
                    $scope.loading = false;
                });
        };


    }]);

function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}
function showInfoMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.info(msg);
}