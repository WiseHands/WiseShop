angular.module('WiseHands')
    .controller('ProductTranslationController', ['$scope', '$http', 'signout', 'sideNavInit', '$routeParams',
        function ($scope, $http, signout, sideNavInit, $routeParams) {
            $scope.loading = true;

            $scope.productUuid = $routeParams.productUuid;
            $scope.translationUuid = $routeParams.translationUuid;

            const textInUkrainian = document.querySelector('#uk');
            const textInEnglish = document.querySelector('#en');

            $http({
                method: 'GET',
                url: `/api/product/${$scope.productUuid}`
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.product = response.data;
                    console.log("product details ", response.data);
                    setContentForProductLabel($scope.product);
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            setContentForProductLabel = (product) => {
                const isTranslationForProductName = $scope.translationUuid === product.productNameTextTranslationBucket.uuid;
                const engNameLabel = product.productNameTextTranslationBucket.translationList[1].content;
                if (isTranslationForProductName){
                    textInUkrainian.value = product.name;
                    textInEnglish.value = engNameLabel;
                }

                const productDescriptionTextTranslationBucket = '';
                const engDescriptionLabel = '';
                if (product.productDescriptionTextTranslationBucket){
                    productDescriptionTextTranslationBucket = product.productDescriptionTextTranslationBucket.uuid;
                    engDescriptionLabel = product.productDescriptionTextTranslationBucket.translationList[1].content;
                }
                const isTranslationForDescription = $scope.translationUuid === productDescriptionTextTranslationBucket;
                if (isTranslationForDescription){
                    textInUkrainian.value = product.description;
                    textInEnglish.value = engDescriptionLabel;
                }
            };

            $scope.saveTranslation = function (product) {
                const isTranslationForProductName = $scope.translationUuid === product.productNameTextTranslationBucket.uuid;
                if (isTranslationForProductName){
                    $scope.ukUuid = product.productNameTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = product.productNameTextTranslationBucket.translationList[1].uuid;
                }
                const descriptionTranslationBucketUuid = '';
                if (product.productDescriptionTextTranslationBucket){
                    descriptionTranslationBucketUuid = product.productDescriptionTextTranslationBucket.uuid;
                }
                const isTranslationForDescription = $scope.translationUuid === descriptionTranslationBucketUuid;
                if (isTranslationForDescription){
                    $scope.ukUuid = product.productDescriptionTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = product.productDescriptionTextTranslationBucket.translationList[1].uuid;
                }
                const data = {
                    translationUuid: $scope.translationUuid,
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
            sendData = (data) => {
                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/api/translation/product/save',
                    data: data,
                })
                    .then(function successCallback(response) {
                        $scope.response = response.data;
                        $scope.loading = false;
                        console.log("$scope.response", $scope.response)
                        showInfoMsg("SAVED");
                    }, function errorCallback(response) {
                        $scope.loading = false;
                        showWarningMsg("ERROR");
                    });
            }
            sideNavInit.sideNav();
        }]);

function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
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

