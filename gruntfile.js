module.exports = function(grunt) {
    
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8848,
                    hostname: 'localhost',
                    keepalive: true,
                    debug: true,
                    middleware: function(connect, options, middlewares) {
                        var bodyParser = require('body-parser');
                        middlewares.unshift(
                            connect().use(
                                bodyParser.urlencoded({
                                    extended: false
                                })
                            ),
                            function(req, res, next) {
                                if (!/\.ajax/.test(req.url)) {
                                    return next();
                                }
                                
                                var path = /\/(\w+)\.ajax/.exec(req.url)[1];
                                var mock = require('./client/mock/' + path);
                                res.end(JSON.stringify(mock.index(req.body)));
                            },
                            function(req, res, next) {
                                var url = req.url;
                                if (url.indexOf('.css') > 0) {
                                    var less = require('less');
                                    less.render(
                                        grunt.file.read('.' + url),
                                        function (e, css) {
                                            res.end(css);
                                        }
                                    );
                                } else {
                                    return next();
                                }
                            }
                        );
                        return middlewares;
                    }
                }
            }
        }
    });

    grunt.registerTask('server', [
        'connect:server'
    ]);
};
