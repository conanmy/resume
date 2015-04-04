define(function(require) {
    angular.module('resume', ['ngRoute', 'ngResource'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/resume/add', {
                templateUrl: 'app/resume/main.html',
                controller: 'resumeAddCtrl'
            });

            $routeProvider.when('/resume/edit/:id', {
                templateUrl: 'app/resume/main.html',
                controller: 'resumeEditCtrl'
            });
        }])
        .controller('resumeEditCtrl', ['$scope', '$routeParams', 'getResumeService',
            function($scope, $routeParams, getResumeService) {
                $scope.resume = getResumeService.get();
                $scope.addExp = function() {
                    $scope.resume.exp.push({text: 'to fill'});
                };
            }
        ])
        .controller('resumeAddCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams) {
                
            }
        ]);
});