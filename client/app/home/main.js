angular.module('home', [])
    .controller('homeCtrl', ['$scope', 'resumeService', 
        function($scope, resumeService) {
            $scope.resumes = resumeService.query();
        }
    ]);