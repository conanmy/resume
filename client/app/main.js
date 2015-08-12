define(function() {
    angular.module('main', [
        'home',
        'pool',
        'resume',
        'login'
    ]);

    angular.bootstrap(document, ['main']);
});
