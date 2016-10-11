'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var serveStatic = require('serve-static');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        watch: {
            client: {
                options: {
                    livereload: true
                },
                files: [
                    'client/views/*.html',
                    'client/css/**/*',
                    '<%= eslint.target %>'
                ],
                tasks: ['eslint']
            },
            server: {
                options: {
                    spawn: false,
                    livereload: false
                },
                files: [
                    '<%= eslint.target %>'
                ],
                tasks: [
                    'eslint',
                    'express:dev'
                ]
            }
        },
        connect: {
            proxies: [{
                context: '/event-app',
                host: 'localhost',
                port: 3000,
                https: false,
                changeOrigin: false
            }],
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        'client'
                    ],
                    middleware: function() {
                        return [
                            proxySnippet,
                            serveStatic('client')
                        ];
                    }
                }
            },
            /*
            dist: {
              options: {
                base: '<%= yeoman.dist %>'
              }
            }
            */
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            target: [
                'Gruntfile.js',
                'client/js/**/*.js',
                'server/**/*.js'
            ]
        },
        express: {
            dev: {
                options: {
                    script: './server/server.js'
                }
            }
        }
    });

    grunt.registerTask('client', [
        'eslint',
        'configureProxies',
        'connect:livereload',
        'watch:client'
    ]);

    grunt.registerTask('server', [
        'eslint',
        'express:dev',
        'watch:server'
    ]);

};
