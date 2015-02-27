define(function(require) {
    angular.module('home')
        .factory('homeService', ['$resource', function($resource) {
            return $resource('home.ajax');
        }]);
});