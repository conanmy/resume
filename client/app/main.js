define(function() {
    angular.module('main', [
        'home',
        'pool',
        'resume',
        'login',
        'user'
    ]);

    angular.bootstrap(document, ['main']);
});
