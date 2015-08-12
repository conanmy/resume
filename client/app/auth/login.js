angular.module('login', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/auth/login.html',
            controller: 'loginCtrl'
        });
    }])
    .controller('loginCtrl', ['$scope',
        function($scope) {
            
        }
    ]);