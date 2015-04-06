angular.module('resume')
    .factory('getResumeService', ['$resource', function($resource) {
        return $resource(
            '/resume/all/:resumeId',
            {resumeId: '@id'}
        );
    }]);