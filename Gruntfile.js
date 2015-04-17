/* jshint node: true */

/*------------------------------------------------------------------------------

	Gruntfile

------------------------------------------------------------------------------*/

//
module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({

		repo: {
			rootDir:	'.',
			srcDir:		'<%= repo.rootDir %>/src'
		},

		packagejson:	grunt.file.readJSON('./package.json'),

		/*
		 * Grunt tasks
		 */

		watch: {
			framework: {
				files: [
					'<%= repo.srcDir %>/**/*.js'
				],
				tasks: ['jshint:framework', 'jscs:framework']
			}
		},

		jshint: {
			jscsrc: {
				files: {
					src: ['<%= repo.rootDir %>/.jscsrc']
				}
			},
			jshintrc: {
				files: {
					src: ['<%= repo.rootDir %>/.jshintrc']
				}
			},
			gruntfilejs: {
				files: {
					src: ['<%= repo.rootDir %>/Gruntfile.js']
				}
			},
			packagejson: {
				files: {
					src: ['<%= repo.rootDir %>/package.json']
				}
			},
			framework: {
				files: {
					src: ['<%= repo.srcDir %>/**/*.js']
				}
			},
			options: {
				jshintrc: '.jshintrc'
			}
		},

		jscs: {
			gruntfilejs: {
				files: {
					src: ['<%= repo.rootDir %>/Gruntfile.js']
				}
			},
			framework: {
				files: {
					src: ['<%= repo.srcDir %>/**/*.js']
				}
			},
			options: {
				config: '.jscsrc',
				esnext: true
			}
		}

	});

	// Load npm tasks
	require('load-grunt-tasks')(grunt);

	// Register tasks
	grunt.registerTask('check', ['jshint', 'jscs']);

	// Define default Grunt tasks
	grunt.registerTask('default', ['watch:framework']);

};
