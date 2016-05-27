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
            views: {
                'sidebar': {
                    templateUrl: 'app/sidebar/main.html',
                    controller: 'userCtrl'
                }
            }
        })
        .state('root.home', {
            url: "/",
            views: {
                'main': {
                    templateUrl: "app/home/main.html",
                    controller: ''
                }
            }
        })
        .state('root.pool', {
            url: '/pool',
            views: {
                'main': {
                    templateUrl: 'app/pool/main.html',
                    controller: 'poolCtrl'
                }
            }
        })
        .state('root.resume', {
            url: "/resume",
            views: {
                'main': {
                    templateUrl: "app/resume/main.html",
                    controller: 'resumeEditCtrl'
                }
            }
        })
        .state('root.resume.add', {
            url: '/add',
        })
        .state('root.resume.edit', {
            url: '/edit/:id'
        })
        .state('login', {
            url: '/login',
            views: {
                'main': {
                    templateUrl: 'app/auth/login.html',
                    controller: 'loginCtrl'
                }
            }
        });
}]);
