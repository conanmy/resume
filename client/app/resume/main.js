angular.module('resume', [])
    .controller('resumeEditCtrl', ['$scope', '$http', '$routeParams', 'resumeService', '$location',
        function($scope, $http, $routeParams, resumeService, $location) {
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
                $location.path('/');
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