angular.module('WiseHands')
    .controller('AdditionNewController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $window) {
        $scope.loading = true;

        let additionName = document.querySelector("#addition_name");
        let additionLabel = document.querySelector("#nema_label");

        let additionPrice = document.querySelector("#addition_price");
        let price_label = document.querySelector("#price_label");
        let image_text = document.querySelector("#image_text");

        additionName.addEventListener('blur', handleNameInput, false);
        function handleNameInput(e) {
            if (e.target.value){
                name_label.style.color = 'black';
                additionName.style.borderBottom = '1px solid black';
            }
        }

        additionPrice.addEventListener('blur', handlePriceInput, false);
        function handlePriceInput(e) {
            if (e.target.value){
                price_label.style.color = 'black';
                additionPrice.style.borderBottom = '1px solid black';
            }
        }

        $scope.uploadOptionImage = () => { $('#imageLoader').click(); };

        let imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        function handleImage(e) {
            $scope.fileName = true;
            let file  = e.target.files[0];
            let fileName = file.name;
            console.log('handleImage', fileName);
            let reader = new FileReader();
            $scope.addition.fileName = fileName;
            reader.onloadend = (event) => {

                const imageName = document.querySelector("#imageName");
                imageName.innerText = fileName;
                image_text.style.color = '#039be5';
                setBlackStyleValidation();

            };
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(e.target.files[0]);
            }
        }

        $scope.createAddition = () => {

            if(!additionName.value || !additionPrice.value || !imageLoader.value){
                setErrorStyleValidation();
                return
            }
            if (!imageLoader.value) {
                image_text.style.color = 'red';
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

        setBlackStyleValidation = () => {
            price_label.style.color = 'black';
            additionPrice.style.borderBottom = '1px solid black';
            name_label.style.color = 'black';
            additionName.style.borderBottom = '1px solid black';
        }

        setErrorStyleValidation = () => {
            additionName.style.borderBottom = '1px solid red';
            name_label.style.color = 'red';
            additionPrice.style.borderBottom = '1px solid red';
            price_label.style.color = 'red';
            image_text.style.color = 'red';
        }

        sideNavInit.sideNav();
    }]);


