angular.module('home')
    .factory('homeService', ['$resource', function($resource) {
        return $resource('/resume/all');
    }]);