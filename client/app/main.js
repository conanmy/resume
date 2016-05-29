angular.module('app', [
    'ui.router',
    'home',
    'pool',
    'resume',
    'login',
    'user'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'sidebar' : {
                    templateUrl: 'app/sidebar/main.html',
                    controller: 'userCtrl'
                }
            }
        })
        .state('root.home', {
            url: "/",
            views: {
                'content@': {
                    templateUrl: "app/home/main.html",
                    controller: 'homeCtrl'
                }
            }
        })
        .state('root.pool', {
            url: '/pool',
            views: {
                'content@': {
                    templateUrl: 'app/pool/main.html',
                    controller: 'poolCtrl'
                }
            }
        })
        .state('root.resume', {
            abstract: true
        })
        .state('root.resume.add', {
            url: '/resume/add',
            views: {
                'content@': {
                    templateUrl: "app/resume/main.html",
                    controller: 'resumeEditCtrl'
                }
            }
        })
        .state('root.resume.edit', {
            url: '/resume/edit/:id',
            views: {
                'content@': {
                    templateUrl: "app/resume/main.html",
                    controller: 'resumeEditCtrl'
                }
            }
        })
        .state('root.login', {
            url: '/login',
            views: {
                'content@': {
                    templateUrl: 'app/auth/login.html',
                    controller: 'loginCtrl'
                }
            }
        });
}]);
