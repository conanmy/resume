define(function(require) {
    angular.module('resume')
        .factory('getResumeService', ['$resource', function($resource) {
            return $resource('getResume.ajax');
        }]);
});