angular.module('WiseHands')
    .controller('ProductTranslationController', ['$scope', '$http', 'signout', 'sideNavInit', '$routeParams',
        function ($scope, $http, signout, sideNavInit, $routeParams) {
            $scope.loading = true;

            $scope.translationObjectUuid = $routeParams.objectUuid;
            $scope.translationBucketUuid = $routeParams.translationUuid;

            console.log('$scope.objectForTranslation', $scope.translationObjectUuid);
            console.log('$scope.translationBucket', $scope.translationBucketUuid);
            const textInUkrainian = document.querySelector('#uk');
            const textInEnglish = document.querySelector('#en');

            getRequest = (url) => {
                $http({
                    method: 'GET',
                    url: url
                })
                    .then((response) => {
                        if (response.data === null){ return }
                        $scope.loading = false;
                        $scope.translationObject = response.data;
                        setContentForCategoryLabel($scope.translationObject);
                        setContentForProductLabel($scope.translationObject);
                    }, (error) => {
                        $scope.loading = false;
                        console.log(error);
                    });
            };

            getRequest(`/api/category/details/${$scope.translationObjectUuid}`);
            getRequest(`/api/product/${$scope.translationObjectUuid}`);

            setContentForCategoryLabel = (category) => {
                if (!category) { return }
                let categoryNameTextTranslationBucket = '';
                let englishNameLabel = '';
                let ukrainianNameLabel = '';
                if(category.categoryNameTextTranslationBucket){
                    categoryNameTextTranslationBucket = category.categoryNameTextTranslationBucket.uuid;
                    ukrainianNameLabel = category.categoryNameTextTranslationBucket.translationList[0].content;
                    englishNameLabel = category.categoryNameTextTranslationBucket.translationList[1].content;
                }

                let isTranslationForCategory = $scope.translationBucketUuid === categoryNameTextTranslationBucket;
                if (isTranslationForCategory){
                    if(ukrainianNameLabel === ""){
                        textInUkrainian.value = category.name;
                    } else {
                        textInUkrainian.value = ukrainianNameLabel;
                    }
                    textInEnglish.value = englishNameLabel;
                }

            };

            setContentForProductLabel = (product) => {
                if (!product){ return }
                let productNameTextTranslationBucket = '';
                let englishNameLabel = '';
                let ukrainianNameLabel = '';
                if(product.productNameTextTranslationBucket){
                    productNameTextTranslationBucket = product.productNameTextTranslationBucket.uuid;
                    ukrainianNameLabel = product.productNameTextTranslationBucket.translationList[0].content;
                    englishNameLabel = product.productNameTextTranslationBucket.translationList[1].content;
                }
                let isTranslationForProductName = $scope.translationBucketUuid === productNameTextTranslationBucket;
                if (isTranslationForProductName){
                    if(ukrainianNameLabel === ""){
                        textInUkrainian.value = product.name;
                    } else {
                        textInUkrainian.value = ukrainianNameLabel;
                    }
                    textInEnglish.value = englishNameLabel;
                }
                let productDescriptionTextTranslationBucket = '';
                let englishDescriptionLabel = '';
                let ukrainianDescriptionLabel = '';
                if (product.productDescriptionTextTranslationBucket){
                    productDescriptionTextTranslationBucket = product.productDescriptionTextTranslationBucket.uuid;
                    ukrainianDescriptionLabel = product.productDescriptionTextTranslationBucket.translationList[0].content;
                    englishDescriptionLabel = product.productDescriptionTextTranslationBucket.translationList[1].content;
                }
                let  isTranslationForDescription = $scope.translationBucketUuid === productDescriptionTextTranslationBucket;
                if (isTranslationForDescription){
                    if(ukrainianDescriptionLabel === ""){
                        textInUkrainian.value = product.description;
                    } else {
                        textInUkrainian.value = ukrainianDescriptionLabel;
                    }
                    textInEnglish.value = englishDescriptionLabel;
                }
            };

            $scope.saveTranslation = () => {
                saveTranslationForProduct($scope.translationObject);
                saveTranslationForCategory($scope.translationObject);
                const data = {
                    translationUuid: $scope.translationBucketUuid,
                    translationList: [
                        {
                            uuid: $scope.ukUuid,
                            language: 'uk',
                            content: textInUkrainian.value
                        },
                        {
                            uuid: $scope.enUuid,
                            language: 'en',
                            content: textInEnglish.value
                        }
                    ]
                };
                sendData(data);
            };

            saveTranslationForProduct = (product) => {
                if (!product){ return }
                let nameTranslationBucketUuid = '';
                if (product.productNameTextTranslationBucket){
                    nameTranslationBucketUuid = product.productNameTextTranslationBucket.uuid;
                }
                let isTranslationForProductName = $scope.translationBucketUuid === nameTranslationBucketUuid;
                if (isTranslationForProductName){
                    $scope.ukUuid = product.productNameTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = product.productNameTextTranslationBucket.translationList[1].uuid;
                }
                let descriptionTranslationBucketUuid = '';
                if (product.productDescriptionTextTranslationBucket){
                    descriptionTranslationBucketUuid = product.productDescriptionTextTranslationBucket.uuid;
                }
                let isTranslationForDescription = $scope.translationBucketUuid === descriptionTranslationBucketUuid;
                if (isTranslationForDescription){
                    $scope.ukUuid = product.productDescriptionTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = product.productDescriptionTextTranslationBucket.translationList[1].uuid;
                }
            }

            saveTranslationForCategory = (category) => {
                if (!category){ return }
                let translationBucketUuid = '';
                if (!!category.categoryNameTextTranslationBucket){
                    translationBucketUuid = category.categoryNameTextTranslationBucket.uuid;
                }
                let isTranslationForProductName = $scope.translationBucketUuid === translationBucketUuid;
                if (isTranslationForProductName){
                    $scope.ukUuid = category.categoryNameTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = category.categoryNameTextTranslationBucket.translationList[1].uuid;
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

            sideNavInit.sideNav();
        }]);

showWarningMsg = (msg) => {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}
showInfoMsg = (msg) => {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.info(msg);
}

