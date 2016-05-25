angular.module('user', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'app/auth/login.html',
            controller: 'userCtrl'
        });
    }])
    .factory('userService', ['$resource', function($resource) {
        return $resource(
            '/user'
        );
    }])
    .controller('userCtrl', ['$scope', 'userService', 
        function($scope, userService) {
            $scope.user = userService.get();
        }
    ]);