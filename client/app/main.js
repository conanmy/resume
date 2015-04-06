define(function() {
    angular.module('main', [
        'home',
        'pool',
        'resume'
    ]);

    angular.bootstrap(document, ['main']);
});
