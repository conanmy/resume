define(function(require) {
    require('home/main');
    require('home/service');
    require('pool/main');

    angular.module('main', [
        'home',
        'pool'
    ]);

    angular.bootstrap(document, ['main']);
});
