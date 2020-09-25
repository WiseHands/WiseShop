angular.module('WiseHands')
    .controller('AdditionNewController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $window) {
        $scope.loading = true;
        $scope.fileName = false;


            let title_input = document.querySelector("#addition_title");
        let title_label = document.querySelector("#title_label");

        let price_input = document.querySelector("#addition_price");
        let price_label = document.querySelector("#price_label");

        $scope.uploadOptionImage = () => { $('#imageLoader').click(); };

        let imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);

        function handleImage(e) {
            let file  = e.target.files[0];
            let fileName = file.name;
            console.log('handleImage', fileName);
            let reader = new FileReader();
            $scope.fileName = true;

            reader.onloadend = (event) => {

                const imageName = document.querySelector("#imageName");
                imageName.innerText = fileName;
            };
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(e.target.files[0]);
            }
        }

        $scope.createAddition = () => {
            if(!title_input.value || !price_input.value){
                title_input.style.borderBottom = '1px solid red';
                title_label.style.color = 'red';

                price_input.style.borderBottom = '1px solid red';
                price_label.style.color = 'red';
                return
            }

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
                    $window.location.href = `#/additionedit/${response.data.uuid}`
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log("$scope.addition", response);
                });
        };

        sideNavInit.sideNav();
    }]);


