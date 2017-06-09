angular.module('WiseShop')
    .service('shared', [ function() {
        var productsToBuy = [];
        var total = 0;
        var categoryUuid = '';
        var paymentButton = '';
        var currentOrderUuid = '';
        Object.compare = function (obj1, obj2) {
            //Loop through properties in object 1
            for (var p in obj1) {
                //Check property exists on both objects
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

                switch (typeof (obj1[p])) {
                    //Deep compare objects
                    case 'object':
                        if (!Object.compare(obj1[p], obj2[p])) return false;
                        break;
                    //Compare function code
                    case 'function':
                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                        break;
                    //Compare values
                    default:
                        if (obj1[p] != obj2[p]) return false;
                }
            }

            //Check object 2 for any extra properties
            for (var p in obj2) {
                if (typeof (obj1[p]) == 'undefined') return false;
            }
            return true;
        };
        return {
            getProductsToBuy: function () {
                console.log('getProductsToBuy ', productsToBuy);
                return productsToBuy;
            },
            setProductsToBuy: function (value) {
                console.log('setProductsToBuy ', value);
                productsToBuy = value;
            },

            addProductToBuy: function (product) {
                console.log('addProductToBuy ', product, productsToBuy);
                var quantity = 0;
                var isFound = false;
                for(var i=0; i<productsToBuy.length; i++) {
                    var currentProduct = productsToBuy[i];
                    var copyOfProductWithoutQuantity = JSON.parse(JSON.stringify(currentProduct));
                    quantity = currentProduct.quantity;
                    delete copyOfProductWithoutQuantity.quantity;
                    delete product.quantity;
                    console.log('compare(product, copyOfProductWithoutQuantity)', product, copyOfProductWithoutQuantity, Object.compare(product, copyOfProductWithoutQuantity));
                    if(Object.compare(product, copyOfProductWithoutQuantity)) {
                        isFound = true;
                        currentProduct.quantity = quantity + 1;
                        break;
                    }
                }
                if(!isFound) {
                    product.quantity = 1;
                    productsToBuy.push(product);
                }
            },

            clearProducts: function () {
                productsToBuy.length = 0;
            },

            getCategoryUuid: function () {
                return categoryUuid;
            },
            setCategoryUuid: function (value) {
                categoryUuid = value;
            },
            getTotal: function () {
                return total;
            },
            setTotal: function (value) {
                total = value;
            },
            getPaymentButton: function () {
                return paymentButton;
            },
            setPaymentButton: function (value) {
                paymentButton = value;
            },
            getCurrentOrderUuid: function () {
                return currentOrderUuid;
            },
            setCurrentOrderUuid: function (value) {
                currentOrderUuid = value;
            }
        }
    }]);