angular.module('WiseHands')
    .controller('AdditionEditController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window', '$routeParams',
        function ($scope, $http, signout, sideNavInit, shared, $window, $routeParams) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: `/addition/${$routeParams.uuid}`
        }).then(response => {
            console.log(response.data);
            $scope.addition = response.data;

            let additionSelectedImage = document.createElement("img");
            additionSelectedImage.className = "selected-image"
            additionSelectedImage.id = "selectedImage"

            additionSelectedImage.src = response.data.imagePath;
            imageName.appendChild(additionSelectedImage);

            let selectedImage = document.querySelector("#selectedImage");

        }, error => {
            console.error(error);
        });

        let additionName = document.querySelector("#addition_name");
        let additionLabel = document.querySelector("#title_label");

        let additionPrice = document.querySelector("#addition_price");
        let priceLabel = document.querySelector("#price_label");

        let imageText = document.querySelector("#image_text");
        let additionImage = document.querySelector("#additionImage");

        additionName.addEventListener('blur', handleNameInput, false);
        function handleNameInput(e) {
            if (e.target.value){
                setStyleValidation();
            }
        }

        additionPrice.addEventListener('blur', handlePriceInput, false);
        function handlePriceInput(e) {
            if (e.target.value){
                setStyleValidation();
            }
        }

/*        $scope.uploadOptionImage = () => {
            $('#imageLoader').click();
        };*/

        const imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);

        function handleImage(e) {
            $scope.fileName = true;
            let file  = e.target.files[0];
            let fileName = file.name;
            console.log('handleImage', fileName);
            let reader = new FileReader();
            $scope.fileName = fileName;

            reader.onloadend = (event) => {
                const imageName = document.querySelector("#image_text");
                imageName.innerText = fileName;
                setStyleValidation();
                imageName.classList.add("input-image-text");
            };
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(e.target.files[0]);
            }
        }

        $scope.editAddition = () => {

            if(!additionName.value){
                additionName.classList.add("input-error");
                additionLabel.classList.add("input-label-error");

                return;
            }
            if(!additionPrice.value){
                additionPrice.classList.add("input-error");
                priceLabel.classList.add("input-label-error");

                return;
            }
            if(!selectedImage.src) {
                imageText.classList.add("input-label-error");
                additionImage.classList.add("input-label-error");

                return;
            }

            console.log("editAddition", $scope.addition);

/*            if (!document.getElementById("imageLoader").value) {
                document.querySelector(".error-text").style.display = "block";
                return;
            }*/
            if (!$scope.addition) {
                toastr.error(emptyTagWarning);
            } else {
                const photo = document.getElementById("imageLoader").files[0];
                $scope.loading = true;
                let photoFd = new FormData();
                photoFd.append('logo', photo);
                $http.post('/upload-file', photoFd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                    }
                })
                    .success(function(response){
                        $scope.loading = false;
                        if (response.filepath) {
                            $scope.addition.imagePath = response.filepath;
                        }
                        sendAddition();
                    })
                    .error(function(response){
                        $scope.loading = false;
                        console.error(response);
                    });

            }
        };

        sendAddition = () => {
            $http({
                method: 'PUT',
                url: `/addition/${$routeParams.uuid}`,
                data: $scope.addition
            })
                .then(function successCallback(response) {
                    console.log("$scope.addition after save", response.data);
                    $window.location.href = `#/addition`;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.error("$scope.addition", response);
                });
        };

        $scope.deleteButton = true;

        $scope.removeQr = () => {
            $http({
                method: "DELETE",
                url: `/addition/${$routeParams.uuid}`,
            }).then(response => {
                $('#removeAddition').modal('hide');
                if(response.status === 200){
                    $window.location.href = `#/addition`
                    $scope.loading = false;
                }
            }, error => {
                console.error(error);
            });
        };

        setStyleValidation = () => {
            if (additionName.classList.contains("input-error")) {
                additionName.classList.remove("input-error");
            }
            if (additionLabel.classList.contains("input-label-error")) {
                additionLabel.classList.remove("input-label-error");
            }
            if (additionPrice.classList.contains("input-error")) {
                additionPrice.classList.remove("input-error");
            }
            if (priceLabel.classList.contains("input-label-error")) {
                priceLabel.classList.remove("input-label-error");
            }
            if (imageText.classList.contains("input-label-error")) {
                imageText.classList.remove("input-label-error");
            }
            if (additionImage.classList.contains("input-label-error")) {
                additionImage.classList.remove("input-label-error");
            }
        };
	
        $scope.redirectToTranslationPage = function(){
	        $http({
		        method: 'GET',
		        url: '/api/get/translation/addition/name/' + $routeParams.uuid
	        })
		        .then(function successCallback(response) {
			        const translation = response.data;
			        console.log("redirectToTranslationPage => ", translation)
			        $window.location.href = `#/translation/${$routeParams.uuid}/${translation.uuid}`;
		        }, function errorCallback(error) {
			        $scope.loading = false;
			        console.log(error);
		        });
        };

        sideNavInit.sideNav();
    }]);