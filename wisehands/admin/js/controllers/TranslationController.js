angular.module('WiseHands')
    .controller('TranslationController', ['$scope', '$http', 'signout', 'sideNavInit', '$routeParams',
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
                        console.log('getRequest for translation object ',$scope.translationObject);
                        setContentForDeliveryLabels($scope.translationObject);
                        setContentForProductLabels($scope.translationObject);
                        setContentForCategoryLabels($scope.translationObject);
                        setContentForPageLabels($scope.translationObject);
                        setContentForContactLabels($scope.translationObject);
                        setContentForShopLabels($scope.translationObject);
                        setContentForAdditionsLabels($scope.translationObject);
                    }, (error) => {
                        $scope.loading = false;
                        console.log(error);
                    });
            };

            getRequest(`/api/product/${$scope.translationObjectUuid}`);
            getRequest(`/delivery`);
            getRequest(`/api/category/details/${$scope.translationObjectUuid}`);
            getRequest(`/pageconstructor/${$scope.translationObjectUuid}`);
            getRequest(`/contact/details/${$scope.translationObjectUuid}`);
            getRequest(`/shop/translate/${$scope.translationObjectUuid}`);
            getRequest(`/api/addition/details/${$scope.translationObjectUuid}`);

            setContentForDeliveryLabels = (delivery) => {
                if (!delivery){ return }
                console.log('setContentForProductLabels', delivery);
                let specialDeliveryTranslationBucket = '';
                let englishNameLabel = '';
                let ukrainianNameLabel = '';
                if(delivery.specialDeliveryTranslationBucket){
                    specialDeliveryTranslationBucket = delivery.specialDeliveryTranslationBucket.uuid;
                    ukrainianNameLabel = delivery.specialDeliveryTranslationBucket.translationList[0].content;
                    englishNameLabel = delivery.specialDeliveryTranslationBucket.translationList[1].content;
                }
                let isTranslationForSpecialDelivery = $scope.translationBucketUuid === specialDeliveryTranslationBucket;
                if (isTranslationForSpecialDelivery){
                    if(ukrainianNameLabel === ""){
                        textInUkrainian.value = delivery.specialDeliveryAddress;
                    } else {
                        textInUkrainian.value = ukrainianNameLabel;
                    }
                    textInEnglish.value = englishNameLabel;
                }
            };

            setContentForProductLabels = (product) => {
                if (!product){ return }
                console.log('setContentForProductLabels', product);
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

            setContentForCategoryLabels = (category) => {
                if (!category) { return }
                console.log('setContentForCategoryLabels', category);

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

            setContentForPageLabels = (page) => {
                if (!page) { return }
                console.log('setContentForPageLabels', $scope.translationObject);
                let pageTitleTextTranslationBucket = '';
                let englishNameLabel = '';
                let ukrainianNameLabel = '';
                if(page.pageTitleTextTranslationBucket){
                    pageTitleTextTranslationBucket = page.pageTitleTextTranslationBucket.uuid;
                    ukrainianNameLabel = page.pageTitleTextTranslationBucket.translationList[0].content;
                    englishNameLabel = page.pageTitleTextTranslationBucket.translationList[1].content;
                }

                let isTranslationForCategory = $scope.translationBucketUuid === pageTitleTextTranslationBucket;
                if (isTranslationForCategory){
                    if(ukrainianNameLabel === ""){
                        textInUkrainian.value = page.title;
                    } else {
                        textInUkrainian.value = ukrainianNameLabel;
                    }
                    textInEnglish.value = englishNameLabel;
                }

            };

            setContentForContactLabels = (contacts) => {
                if (!contacts){ return }
                console.log('setContentForContactLabels', contacts);
                let addressCityTextTranslationBucket = '';
                let englishAddressCityLabel = '';
                let ukrainianAddressCityLabel = '';
                if(contacts.addressCityTextTranslationBucket){
                    addressCityTextTranslationBucket = contacts.addressCityTextTranslationBucket.uuid;
                    ukrainianAddressCityLabel = contacts.addressCityTextTranslationBucket.translationList[0].content;
                    englishAddressCityLabel = contacts.addressCityTextTranslationBucket.translationList[1].content;
                }
                let isTranslationForContactsCity = $scope.translationBucketUuid === addressCityTextTranslationBucket;
                if (isTranslationForContactsCity){
                    if(ukrainianAddressCityLabel === ""){
                        textInUkrainian.value = contacts.addressCity;
                    } else {
                        textInUkrainian.value = ukrainianAddressCityLabel;
                    }
                    textInEnglish.value = englishAddressCityLabel;
                }
                let addressStreetTextTranslationBucket = '';
                let englishAddressStreetLabel = '';
                let ukrainianAddressStreetLabel = '';
                if (contacts.addressStreetTextTranslationBucket){
                    addressStreetTextTranslationBucket = contacts.addressStreetTextTranslationBucket.uuid;
                    ukrainianAddressStreetLabel = contacts.addressStreetTextTranslationBucket.translationList[0].content;
                    englishAddressStreetLabel = contacts.addressStreetTextTranslationBucket.translationList[1].content;
                }
                let  isTranslationForAddressStreet = $scope.translationBucketUuid === addressStreetTextTranslationBucket;
                if (isTranslationForAddressStreet){
                    if(ukrainianAddressStreetLabel === ""){
                        textInUkrainian.value = contacts.addressStreet;
                    } else {
                        textInUkrainian.value = ukrainianAddressStreetLabel;
                    }
                    textInEnglish.value = englishAddressStreetLabel;
                }
            };

            setContentForShopLabels = (shop) => {
                if (!shop) { return }
                console.log('setContentForShopLabels', shop);

                let shopNameTextTranslationBucket = '';
                let englishNameLabel = '';
                let ukrainianNameLabel = '';
                if(shop.shopNameTextTranslationBucket){
                    shopNameTextTranslationBucket = shop.shopNameTextTranslationBucket.uuid;
                    ukrainianNameLabel = shop.shopNameTextTranslationBucket.translationList[0].content;
                    englishNameLabel = shop.shopNameTextTranslationBucket.translationList[1].content;
                }

                let isTranslationForShop = $scope.translationBucketUuid === shopNameTextTranslationBucket;
                if (isTranslationForShop){
                    if(ukrainianNameLabel === ""){
                        textInUkrainian.value = shop.shopName;
                    } else {
                        textInUkrainian.value = ukrainianNameLabel;
                    }
                    textInEnglish.value = englishNameLabel;
                }

            };
	
	        setContentForAdditionsLabels = (addition) => {
	        	if (!addition) {return}
	        	console.log('setContentForAdditionsLabels', addition);
		        let additionTranslationBucket = '';
		        let englishNameLabel = '';
		        let ukrainianNameLabel = '';
		        if(addition.additionNameTranslationBucket){
			        additionTranslationBucket = addition.additionNameTranslationBucket.uuid;
			        ukrainianNameLabel = addition.additionNameTranslationBucket.translationList[0].content;
			        englishNameLabel = addition.additionNameTranslationBucket.translationList[1].content;
		        }
		
		        let isTranslationForAddition = $scope.translationBucketUuid === additionTranslationBucket;
		        if (isTranslationForAddition){
			        if(ukrainianNameLabel === ""){
				        textInUkrainian.value = addition.title;
			        } else {
				        textInUkrainian.value = ukrainianNameLabel;
			        }
			        textInEnglish.value = englishNameLabel;
		        }
		
	        };



            $scope.saveTranslation = () => {
                saveTranslationForSpecialDelivery($scope.translationObject);
                saveTranslationForProduct($scope.translationObject);
                saveTranslationForCategory($scope.translationObject);
                saveTranslationForPage($scope.translationObject);
                saveTranslationForContacts($scope.translationObject);
                saveTranslationForShop($scope.translationObject);
                saveTranslationForAddition($scope.translationObject);
                const data = {
                    objectUuid: $scope.translationObjectUuid,
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
                console.log('sendData to create transl bucket => ', data);
                sendData(data);
            };

            saveTranslationForSpecialDelivery = (delivery) => {
                if (!delivery){ return }
                let specialDeliveryTranslationBucketUuid = '';
                if (delivery.specialDeliveryTranslationBucket){
                    specialDeliveryTranslationBucketUuid = delivery.specialDeliveryTranslationBucket.uuid;
                }
                let isTranslationForDelivery = $scope.translationBucketUuid === specialDeliveryTranslationBucketUuid;
                if (isTranslationForDelivery){
                    $scope.ukUuid = delivery.specialDeliveryTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = delivery.specialDeliveryTranslationBucket.translationList[1].uuid;
                }
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
            };

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
            };

            saveTranslationForPage = (page) => {
                if (!page){ return }
                let translationBucketUuid = '';
                if (!!page.pageTitleTextTranslationBucket){
                    translationBucketUuid = page.pageTitleTextTranslationBucket.uuid;
                }
                let isTranslationForPage = $scope.translationBucketUuid === translationBucketUuid;
                if (isTranslationForPage){
                    $scope.ukUuid = page.pageTitleTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = page.pageTitleTextTranslationBucket.translationList[1].uuid;
                }
            };

            saveTranslationForContacts = (contacts) => {
                if (!contacts){ return }
                let translationCityBucketUuid = '';
                if (contacts.addressCityTextTranslationBucket){
                    translationCityBucketUuid = contacts.addressCityTextTranslationBucket.uuid;
                }
                let isTranslationForContactsCity = $scope.translationBucketUuid === translationCityBucketUuid;
                if (isTranslationForContactsCity){
                    $scope.ukUuid = contacts.addressCityTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = contacts.addressCityTextTranslationBucket.translationList[1].uuid;
                }
                let addressStreetTranslationBucketUuid = '';
                if (contacts.addressStreetTextTranslationBucket){
                    addressStreetTranslationBucketUuid = contacts.addressStreetTextTranslationBucket.uuid;
                }
                let isTranslationForContactsStreet = $scope.translationBucketUuid === addressStreetTranslationBucketUuid;
                if (isTranslationForContactsStreet){
                    $scope.ukUuid = contacts.addressStreetTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = contacts.addressStreetTextTranslationBucket.translationList[1].uuid;
                }
            };

            saveTranslationForShop = (shop) => {
                if (!shop){ return }
                let shopNameTextTranslationBucket = '';
                if (!!shop.shopNameTextTranslationBucket){
                    shopNameTextTranslationBucket = shop.shopNameTextTranslationBucket.uuid;
                }
                let isTranslationForShopName = $scope.translationBucketUuid === shopNameTextTranslationBucket;
                if (isTranslationForShopName){
                    $scope.ukUuid = shop.shopNameTextTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = shop.shopNameTextTranslationBucket.translationList[1].uuid;
                }
            };
	
	          saveTranslationForAddition = (addition) => {
	            if (!addition) {return}
	            let additionNameTranslationBucketUuid = '';
                if (!!addition.additionNameTranslationBucket){
	                additionNameTranslationBucketUuid = addition.additionNameTranslationBucket.uuid;
                }
                let isTranslationForShopName = $scope.translationBucketUuid === additionNameTranslationBucketUuid;
                if (isTranslationForShopName){
                    $scope.ukUuid = addition.additionNameTranslationBucket.translationList[0].uuid;
                    $scope.enUuid = addition.additionNameTranslationBucket.translationList[1].uuid;
                }
	        
	          };

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
            };

            $scope.goBack = () => {
                window.history.back();
            };

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

