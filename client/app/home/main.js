angular.module('home', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/main.html',
            controller: 'homeCtrl'
        });
    }])
    .controller('homeCtrl', ['$scope', '$http', 'resumeService', 
        function($scope, $http, resumeService) {
            $scope.resumes = resumeService.query();
        }
    ]);