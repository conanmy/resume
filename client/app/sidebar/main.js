angular.module('user', ['ngResource'])
    .factory('userService', ['$resource', function($resource) {
        return $resource(
            '/user'
        );
    }])
    .controller('userCtrl', ['$scope', '$location', 'userService', 
        function($scope, $location, userService) {
            $scope.user = userService.get();
            if (!$scope.user.name) {
                $location.path('/login');
            }
        }
    ]);