angular.module('WiseShop')
    .service('shared', [ function() {
        var productsToBuy = [];
        var total = 0;
        var categoryUuid = '';
        var paymentButton = '';
        var currentOrderUuid = '';
        var totalQuantity = 0;
        var deliveryType = '';
        var paymentType = '';
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
                return productsToBuy;
            },
            setProductsToBuy: function (value) {
                productsToBuy = value;
            },

            addProductToBuy: function (product) {
                var isFound = false;
                for(var i=0; i<productsToBuy.length; i++) {
                    var currentProduct = productsToBuy[i];
                    var copyOfProductWithoutQuantity = JSON.parse(JSON.stringify(currentProduct));
                    delete copyOfProductWithoutQuantity.quantity;
                    delete product.quantity;
                    if(Object.compare(product, copyOfProductWithoutQuantity)) {
                        isFound = true;
                        currentProduct.quantity += 1;
                        break;
                    }
                }
                if(!isFound) {
                    var copyOfProduct = JSON.parse(JSON.stringify(product));
                    copyOfProduct.quantity = 1;
                    productsToBuy.push(copyOfProduct);
                }

                this.reCalculateQuantity();
                this.reCalculateTotal();


            },

            reCalculateQuantity: function () {
                totalQuantity = 0;

                productsToBuy.forEach(function(product) {
                    totalQuantity += product.quantity;
                });

                return totalQuantity;

            },

            reCalculateTotal: function () {
                total = 0;
                productsToBuy.forEach(function (product) {
                    total += product.quantity * product.price;
                });
                return total;

            },

            setProductQuantity: function (index, quantity) {
                productsToBuy[index].quantity = quantity;
                this.reCalculateQuantity();
            },

            getTotalQuantity: function () {
                return totalQuantity;
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
            },
            setDeliveryType: function (value) {
                deliveryType = value;
            },
            getDeliveryType: function () {
                return deliveryType;
            },
            setPaymentType: function (value) {
                paymentType = value;
            },
            getPaymentType: function () {
                return paymentType;
            }
        }
    }]);
