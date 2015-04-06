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
    .controller('resumeEditCtrl', ['$scope', '$http', '$routeParams', 'getResumeService',
        function($scope, $http, $routeParams, getResumeService) {
            if ($routeParams.id) {
                $scope.resume = getResumeService.get({
                    resumeId: $routeParams.id
                });
            } else {
                $scope.resume = {
                    title: 'your title',
                    name: 'your name',
                    email: 'your email',
                    exp: [{text: 'new experience'}]
                };
            }
            
            $scope.addExp = function() {
                $scope.resume.exp.push({text: 'new experience'});
            };

            $scope.save = function() {
                if ($scope.resume.$save) {
                    $scope.resume.$save();
                } else {
                    $http.post('/resume/all', $scope.resume)
                        .success(function(){
                            window.location.hash = '/';
                        })
                        .error(function() {
                            window.location.hash = '/';
                        });
                    $('.content').append('<span class="tip">Saving...</span>');
                }
            };
        }
    ]);