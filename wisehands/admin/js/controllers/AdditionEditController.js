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
        }, error => {
            console.log(error);
        });


        let additionName = document.querySelector("#addition_name");
        let title_label = document.querySelector("#nema_label");

        let additionPrice = document.querySelector("#addition_price");
        let price_label = document.querySelector("#price_label");
        let image_text = document.querySelector("#image_text");

        additionName.addEventListener('blur', handleNameInput, false);
        function handleNameInput(e) {
            if (e.target.value){
/*                name_label.style.color = 'black';
                additionName.style.borderBottom = '1px solid black';*/
            }
        }

        additionPrice.addEventListener('blur', handlePriceInput, false);
        function handlePriceInput(e) {
            if (e.target.value){
/*                price_label.style.color = 'black';
                additionPrice.style.borderBottom = '1px solid black';*/
            }
        }

        $scope.uploadOptionImage = () => { $('#imageLoader').click(); };

        let imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        function handleImage(e) {
            let file  = e.target.files[0];
            let fileName = file.name;
            console.log('handleImage', fileName);
            let reader = new FileReader();

            reader.onloadend = (event) => {
                const imageName = document.querySelector("#imageName");
                imageName.innerText = fileName;
            };
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(e.target.files[0]);
            }
        }

        $scope.editAddition = () => {
            if(!additionName.value || !additionPrice.value){
                title_input.style.borderBottom = '1px solid red';
                title_label.style.color = 'red';

                price_input.style.borderBottom = '1px solid red';
                price_label.style.color = 'red';
                return
            }
            sendAddition();
            console.log("createAddition", $scope.addition);

            if (!document.getElementById("imageLoader").value) {
                document.querySelector(".error-text").style.display = "block";
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

                    })
                    .error(function(response){
                        $scope.loading = false;
                        console.log(response);
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
                    console.log("$scope.addition", response.data);
                    $window.location.href = `#/addition`;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log("$scope.addition", response);
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
                console.log(error);
            });
        }

        sideNavInit.sideNav();
    }]);


