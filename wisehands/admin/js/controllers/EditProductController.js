angular.module('WiseHands')
    .controller('EditProductController', [
        '$http', '$scope', '$routeParams', '$location', 'signout', '$uibModal',
        function ($http, $scope, $routeParams, $location, signout, $uibModal) {

            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            // Edit image
            $scope.editImage = function (image) {
                if (image && image.uuid) {
                    var modal = $uibModal.open({
                        size: 'md',
                        templateUrl: '/wisehands/admin/partials/ImageCropper.html',
                        controller: 'ImageCropperController',
                        controllerAs: 'vm',
                        resolve: {
                            currentImage: function () {
                                return image;
                            }
                        }
                    });
                    modal.result.then(
                        function (result) {
                            var formData = new FormData();
                            formData.append("photos[0]", dataURItoBlob(result));
                            $http.put('/product/' + $routeParams.uuid + '/image/' + image.uuid, formData, {
                                transformRequest: angular.identity,
                                headers: {
                                    'Content-Type': undefined
                                }
                            })
                                .then(function (response) {
                                    $scope.activeShop = localStorage.getItem('activeShop');
                                    var data = response.data;
                                    var img = new Image();
                                    img.onload = function () {
                                        var canvas = document.getElementById("editCanvas");
                                        canvas.width = img.width;
                                        canvas.height = img.height;
                                        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
                                        var dataURL = canvas.toDataURL('image/jpeg', 0.9);
                                        $scope.$apply(function () {
                                            var idx = $scope.productImages.indexOf(image);
                                            $scope.productImages[idx] = $.extend({}, image, {
                                                dataURL: dataURL
                                            });
                                        });
                                    };
                                    img.src = '/public/product_images/' + $scope.activeShop + '/' + data.filename;
                                }).catch(function (err) {
                                console.error(err);
                            });
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
                }
            };

            $http({
                method: 'GET',
                url: '/addition/get-all/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.properties = response.data;
                    console.log("/addition/get-all/", response.data);
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $http({
                method: 'GET',
                url: '/api/product/' + $routeParams.uuid
            })
                .then(({data = {}}) => {

                    $scope.product = data;
                    $scope.showSpicinessLevelButton = data?.spicinessLevel > 0;
                    console.log("$scope.product property :", data);

                    $scope.activeShop = localStorage.getItem('activeShop');
                    $scope.product.images.forEach((image, index) => {
                        if (image.uuid === $scope.product.mainImage.uuid) $scope.product.mainPhoto = index;
                    });
                    $scope.loadImgOntoCanvas();
                    $scope.loading = false;
                }, error => {
                    $scope.loading = false;
                    console.log(error);
                });

            $http({
                method: 'GET',
                url: '/api/category'
            })
                .then(function successCallback(response) {
                    $scope.categories = response.data;
                    for (var i = 0; i < $scope.categories.length; i++) {
                        if ($scope.product.categoryUuid === $scope.categories[i].uuid) {
                            $scope.product.category = $scope.categories[i];
                            break;
                        }
                    }
                    $scope.loading = false;
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });


            $scope.loadImgOntoCanvas = function () {
                $scope.productImages = [];
                $scope.product.images.forEach(function (image, index) {
                    var img = new window.Image();

                    img.addEventListener("load", function () {
                        var canvas = document.getElementById("editCanvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
                        var dataURL = canvas.toDataURL('image/jpeg', 0.9);
                        var productImage = {};
                        $scope.$apply(function () {
                            productImage.uuid = $scope.product.images[index].uuid;
                            productImage.dataURL = dataURL;
                            $scope.productImages.push(productImage);
                        });
                    });
                    img.src = '/public/product_images/' + $scope.activeShop + '/' + image.filename;

                });

            };

            var fd = new FormData();
            var imageLoader = document.getElementById('imageLoader');
            imageLoader.addEventListener('change', handleImage, false);
            var canvas = document.getElementById('editCanvas');

            function handleImage(e) {
                $scope.$apply(function () {
                    $scope.loading = true;
                });
                var file = e.target.files[0];
                var reader = new FileReader();

                reader.onload = function (event) {

                    var img = new Image();
                    img.onload = function () {

                        var MAX_WIDTH = 700;
                        var MAX_HEIGHT = 525;
                        height = MAX_HEIGHT;
                        width = MAX_WIDTH;

                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        var dataURL = canvas.toDataURL('image/jpeg', 0.9);
                        var blob = dataURItoBlob(dataURL);
                        $scope.myBlob = [blob];
                        $scope.addNewPhoto();
                    };

                    img.src = event.target.result;

                };
                if (file && file.type.match('image.*')) {
                    reader.readAsDataURL(e.target.files[0]);
                } else {
                    $scope.$apply(function () {
                        $scope.loading = false;
                    });
                }

            }

            $scope.addNewPhoto = function () {
                $scope.loading = true;
                var imageFd = new FormData();
                for (var i = 0; i < $scope.myBlob.length; i++) {
                    var blob = $scope.myBlob[i];
                    imageFd.append("photos[" + i + "]", blob);
                }
                $http.post('/product/' + $routeParams.uuid + '/image', imageFd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                    }
                })
                    .success(function (response) {
                        $scope.product = response;
                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.product.categoryUuid === $scope.categories[i].uuid) {
                                $scope.product.category = $scope.categories[i];
                                break;
                            }
                        }
                        $scope.product.images.forEach(function (image, index) {
                            if (image.uuid === $scope.product.mainImage.uuid) {
                                $scope.product.mainPhoto = index;
                            }
                        });
                        $scope.loadImgOntoCanvas();
                        $scope.loading = false;
                    })
                    .error(function (response) {
                        $scope.loading = false;
                        console.log(response);
                    });
            };

            $scope.setMainPhotoIndex = function (index, uuid) {
                $scope.loading = true;
                if ($scope.product) {
                    $scope.product.mainPhoto = index;
                }
                $http({
                    method: 'PUT',
                    url: '/product/' + $routeParams.uuid + '/main-image/' + uuid
                })
                    .then(function successCallback(response) {
                        $scope.product = response.data;
                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.product.categoryUuid === $scope.categories[i].uuid) {
                                $scope.product.category = $scope.categories[i];
                                break;
                            }
                        }
                        $scope.product.images.forEach(function (image, index) {
                            if (image.uuid === $scope.product.mainImage.uuid) {
                                $scope.product.mainPhoto = index;
                            }
                        });
                        $scope.loadImgOntoCanvas();
                        $scope.loading = false;

                    }, function errorCallback(response) {
                        $scope.loading = false;
                        console.log(response);
                    });
            };

            $scope.removeImage = function (uuid) {
                $scope.loading = true;
                $http({
                    method: 'DELETE',
                    url: '/product/' + $routeParams.uuid + '/image/' + uuid
                })
                    .then(function successCallback(response) {
                        $scope.product = response.data;
                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.product.categoryUuid === $scope.categories[i].uuid) {
                                $scope.product.category = $scope.categories[i];
                                break;
                            }
                        }
                        $scope.product.images.forEach(function (image, index) {
                            if (image.uuid === $scope.product.mainImage.uuid) {
                                $scope.product.mainPhoto = index;
                            }
                        });
                        $scope.loadImgOntoCanvas();
                        $scope.loading = false;

                    }, function errorCallback(response) {
                        $scope.loading = false;
                        console.log(response);
                    });
            };

// TODO: Filthy hack!!! We should find proper way to handle it on BE side (type conversion etc.)
            const _removePepperEmojis = string => string.replaceAll('\u{1F336}', '');

            const _countSpicinessLevel = string => {
                const spicinessLevel = [...string].reduce((level, char) => {
                    if (char === '\u{1F336}') level++;
                    return level;
                }, 0);
                return spicinessLevel;
            };

            $scope.updateProduct = function () {
                $scope.loading = true;
                fd.append('uuid', $scope.product.uuid);
                fd.append('name', _removePepperEmojis($scope.product.name));
                fd.append('spicinessLevel', _countSpicinessLevel($scope.product.name));
                fd.append('description', $scope.product.description);
                fd.append('price', $scope.product.price);
                fd.append('isActive', $scope.product.isActive);
                fd.append('isPromotionalProduct', $scope.product.isPromotionalProduct);
                fd.append('isDishOfDay', $scope.product.isDishOfDay);

                fd.append('oldPrice', $scope.product.oldPrice);
                fd.append('sortOrder', $scope.product.sortOrder);
                fd.append('properties', JSON.stringify($scope.product.properties));

                // for ( var i = 0; i < $scope.productImages.length; i++ ){
                //     fd.append("photos["+ i +"]", $scope.productImages[i]);
                // }
                //
                $http.put('/api/product', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                    }
                })
                    .success(function (data) {
                        $scope.loading = false;
                        $location.path('/product/details/' + data.uuid);
                        showInfoMsg("SAVED");
                    })
                    .error(function (response) {
                        $scope.loading = false;
                        console.log(response);
                        showWarningMsg("ERROR");
                    });

            };

            $scope.uploadNewProductImage = function () {
                $('#imageLoader').click();
            };

            $scope.setSpiciness = () => {
                $scope.product.name = `🌶️${$scope.product.name}`;
            };

            $scope.createCategory = function () {
                $scope.loading = true;
                $http({
                    method: 'POST',
                    url: '/api/category',
                    data: $scope.newCategory
                })
                    .then(function successCallback(response) {
                        $scope.createdCategory = response.data;
                        $scope.categories.push($scope.createdCategory);
                        $scope.product.category = $scope.createdCategory;
                        $scope.changeCategory($scope.product.category);
                        $scope.loading = false;
                        $scope.hideModal();

                    }, function errorCallback(response) {
                        $scope.loading = false;
                        console.log(response);
                    });
            };
            $scope.hideModal = function () {
                $('#categoryModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            };
            $scope.changeCategory = function (category) {
                $scope.loading = true;
                $scope.product.category = category;
                $http({
                    method: 'PUT',
                    url: '/api/category/' + $scope.product.category.uuid + '/product/' + $routeParams.uuid,
                })
                    .then(function successCallback(response) {
                        $scope.product = response.data;
                        $scope.product.images.forEach(function (image, index) {
                            if (image.uuid === $scope.product.mainImage.uuid) {
                                $scope.product.mainPhoto = index;
                            }
                        });
                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.product.categoryUuid === $scope.categories[i].uuid) {
                                $scope.product.category = $scope.categories[i];
                                break;
                            }
                        }
                        $scope.loading = false;

                    }, function errorCallback(response) {
                        $scope.loading = false;
                        console.log(response);
                    });
            }

        }]);

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

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
