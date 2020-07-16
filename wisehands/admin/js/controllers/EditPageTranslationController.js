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
                CKEDITOR.instances["en"].setData(englishNameLabel);
            }

        };

        $scope.loadImage = () => {
            $('#imageLoader').click();
        };

        $scope.saveThisPage = () => {
            $scope.loading = true;
            saveTranslationForPage($scope.translationObject);

            const data = {
                translationUuid: $scope.translationBucketUuid,
                translationList: [
                    {
                        uuid: $scope.ukUuid,
                        language: 'uk',
                        content: CKEDITOR.instances["uk"].getData()
                    },
                    {
                        uuid: $scope.enUuid,
                        language: 'en',
                        content: CKEDITOR.instances["en"].getData()
                    }
                ]
            };
            console.log(' save translationObject', data);

            sendData(data);
        };

        saveTranslationForPage = (page) => {
            if (!page){ return }
            let translationBucketUuid = '';
            if (!!page.pageBodyTextTranslationBucket){
                translationBucketUuid = page.pageBodyTextTranslationBucket.uuid;
            }
            let isTranslationForPage = $scope.translationBucketUuid === translationBucketUuid;
            if (isTranslationForPage){
                $scope.ukUuid = page.pageBodyTextTranslationBucket.translationList[0].uuid;
                $scope.enUuid = page.pageBodyTextTranslationBucket.translationList[1].uuid;
            }
        }

        sendData = (data) => {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/api/translation/save',
                data: data,
            })
                .then((response) => {
                    $scope.response = response.data;
                    $scope.loading = false;
                    showInfoMsg("SAVED");
                }, (errorCallback) => {
                    $scope.loading = false;
                    showWarningMsg("ERROR");
                });
        }

        $scope.goBack = () => {
                    window.history.back();
        }

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