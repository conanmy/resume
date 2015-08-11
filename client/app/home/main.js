angular.module('home', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/main.html',
            controller: 'homeCtrl'
        });
    }])
    .controller('homeCtrl', ['$scope', 'resumeService', 
        function($scope, resumeService) {
            $scope.resumes = resumeService.query();
        }
    ]);