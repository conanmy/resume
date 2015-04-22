angular.module('home')
    .factory('resumeService', ['$resource', function($resource) {
        return $resource(
            '/resumes/:resumeId',
            {resumeId: '@_id'}
        );
    }]);