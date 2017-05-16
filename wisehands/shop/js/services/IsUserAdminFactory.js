angular.module('WiseShop')
    .factory('isUserAdmin', ['$http', function($http){
        return{
            get: function(callback){
                $http.get('/shop/details',
                    {
                        headers: {
                            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                            'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')}
                                    })
                    .success(function(data) {
                    callback(data);
                });
            }
        };
    }]);