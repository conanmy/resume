define(function(require) {
    require('home/main');
    require('home/service');
    require('pool/main');
    require('resume/main');
    require('resume/service');

    angular.module('main', [
        'home',
        'pool',
        'resume'
    ]);

    angular.bootstrap(document, ['main']);
});
