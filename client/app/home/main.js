angular.module('home', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/main.html',
            controller: 'homeCtrl'
        });
    }])
    .controller('homeCtrl', ['$scope', '$http', 'homeService', 
        function($scope, $http, homeService) {
            $scope.resumes = homeService.query();
        }
    ]);