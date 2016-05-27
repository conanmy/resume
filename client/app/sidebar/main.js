angular.module('user', ['ngResource'])
    .factory('userService', ['$resource', function($resource) {
        return $resource(
            '/user'
        );
    }])
    .controller('userCtrl', ['$scope', '$locationProvider', 'userService', 
        function($scope, $locationProvider, userService) {
            $scope.user = userService.get();
            if (!$scope.user.name) {
                $locationProvider.path('/login');
            }
        }
    ]);