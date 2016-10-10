'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'client',
            dist: 'client'
        },
        sync: {
            dist: {
                files: [{
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: '**'
                }]
            }
        },
        watch: {
            client: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= yeoman.app %>/views/*.html',
                    '<%= yeoman.app %>/css/**/*',
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
                        '<%= yeoman.app %>'
                    ],
                    middleware: function(connect) {
                        return [
                            proxySnippet,
                            connect.static(require('path').resolve('client'))
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
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: '**'
                }]
            },
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'test/config/karma.conf.js',
                singleRun: true
            }
        },
        bowercopy: {
            options: {
                destPrefix: '<%= yeoman.app %>'
            },
            test: {
                files: {
                    'test/lib/angular-mocks': 'angular-mocks',
                    'test/lib/angular-scenario': 'angular-scenario'
                }
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            target: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/**/*.js',
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
