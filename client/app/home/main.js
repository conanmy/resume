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
            $scope.delete = function(_id) {
                $http.delete('/resume/all/' + _id)
                    .success(function(){
                        //window.location.reload();
                        console.log('success');
                    })
                    .error(function() {
                        //window.location.reload();
                        console.log('fail');
                    });
            };
        }
    ]);