angular.module('pool', ['ngRoute'])
    .controller('poolCtrl', ['$scope', function($scope) {
        
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/pool', {
            templateUrl: 'app/pool/main.html',
            controller: 'poolCtrl'
        });
    }]);