angular.module('WiseHands')
    .service('shared',function(){
        var filterOptions = [];
        return{
            getFilterOptions: function(){
                return filterOptions;
            },
            setFilterOptions: function(value){
                filterOptions = value;
            }
        };
    });