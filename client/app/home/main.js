angular.module('home', ['ngResource']);
    }])
    .controller('homeCtrl', ['$scope', 'resumeService', 
        function($scope, resumeService) {
            $scope.resumes = resumeService.query();
        }
    ]);