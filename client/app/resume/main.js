angular.module('resume', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/resume/add', {
            templateUrl: 'app/resume/main.html',
            controller: 'resumeEditCtrl'
        });

        $routeProvider.when('/resume/edit/:id', {
            templateUrl: 'app/resume/main.html',
            controller: 'resumeEditCtrl'
        });
    }])
    .controller('resumeEditCtrl', ['$scope', '$http', '$routeParams', 'resumeService',
        function($scope, $http, $routeParams, resumeService) {
            if ($routeParams.id) {
                $scope.resume = resumeService.get({
                    resumeId: $routeParams.id
                });
            } else {
                $scope.resume = new resumeService();
                $scope.resume.title = 'your title';
                $scope.resume.name = 'your name';
                $scope.resume.email = 'your email';
                $scope.resume.exp = [{text: 'new experience'}];
                $('.btn-remove').hide();
            }
            
            $scope.addExp = function() {
                $scope.resume.exp.push({text: 'new experience'});
            };

            var goHome = function() {
                window.location.hash = '/';
            };

            $scope.save = function() {
                if ($routeParams.id) {
                    $scope.resume.$update(goHome, goHome);
                } else {
                    $scope.resume.$save(goHome, goHome);
                }
                $('.content').append('<span class="tip">Saving...</span>');
            };

            $scope.delete = function(_id) {
                $scope.resume.$remove(goHome, goHome);
                $('.tip-remove').show();
            };
        }
    ]);