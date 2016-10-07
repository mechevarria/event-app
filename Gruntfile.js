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
                    '<%= jshint.client %>'
                ],
                tasks: ['jshint:client']
            },
            server: {
                options: {
                    spawn: false,
                    livereload: false
                },
                files: [
                    '<%= jshint.server %>'
                ],
                tasks: [
                    'jshint:server',
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
        jshint: {
            client: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/**/*.js'
            ],
            server: [
                'GruntFile.js',
                'server/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
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
        'jshint:client',
        'configureProxies',
        'connect:livereload',
        'watch:client'
    ]);

    grunt.registerTask('server', [
        'jshint:server',
        'express:dev',
        'watch:server'
    ]);

};
