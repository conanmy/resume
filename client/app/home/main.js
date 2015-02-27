define(function(require) {
    angular.module('home', ['ngRoute', 'ngResource'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/home/main.html',
                controller: 'homeCtrl'
            });
        }])
        .controller('homeCtrl', ['$scope', 'homeService', function($scope, homeService) {
            $scope.resumes = homeService.query();
        }]);
});