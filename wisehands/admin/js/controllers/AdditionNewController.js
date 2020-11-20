angular.module('WiseHands')
    .controller('AdditionNewController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $window) {
        $scope.loading = true;

        let additionName = document.querySelector("#addition_name");
        let additionLabel = document.querySelector("#name_label");

        let additionPrice = document.querySelector("#addition_price");
        let priceLabel = document.querySelector("#price_label");

        let imageText = document.querySelector("#image_text");

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

        const imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);

        function handleImage(e) {
            $scope.fileName = true;
            let file  = e.target.files[0];
            let fileName = file.name;
            console.log('handleImage', fileName);
            let reader = new FileReader();
/*            $scope.addition.fileName = fileName;*/
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

        $scope.createAddition = () => {

            if(!additionName.value){
                additionName.className = 'input-error';
                name_label.className = 'input-label-error';

                return;
            }
            if(!additionPrice.value) {
                additionPrice.className = 'input-error';
                priceLabel.className = 'input-label-error';

                return;
            }
            if(!imageLoader.value) {
                imageText.classList.add("input-label-error");

                return;
            }
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
                        $scope.addition.filepath = response.filepath;
                        sendAddition();
                    })
                    .error(function(response){
                        $scope.loading = false;
                        console.log(response);
                    });

            }
        };

        sendAddition = () => {
            $http({
                method: 'POST',
                url: '/api/addition/new',
                data: $scope.addition
            })
                .then(function successCallback(response) {
                    console.log("$scope.addition", response.data);
                    $window.location.href = `#/addition`
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log("$scope.addition", response);
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
        }

        sideNavInit.sideNav();
    }]);


