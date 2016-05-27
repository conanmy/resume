angular.module('user', ['ngResource'])
    .factory('userService', ['$resource', function($resource) {
        return $resource(
            '/user'
        );
    }])
    .controller('userCtrl', ['$scope', '$location', 'userService', 
        function($scope, $location, userService) {
            $scope.user = userService.get().then(function(user) {
                console.log($scope.user);
                if (!user.facebook) {
                    $location.path('/login');
                }
            });
        }
    ]);