angular.module('WiseShop')
    .factory('isUserAdmin', ['$http', function($http){
        return{
            get: function(callback){
                $http.get('/shop/details',
                    {
                        headers: {
                                    'X-Authorization': 'Bearer ' + localStorage.getItem('JWT_TOKEN')
                                }
                    })
                    .success(function(data) {
                    callback(data);
                });
            }
        };
    }]);