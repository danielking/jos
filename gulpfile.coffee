gulp = require 'gulp'
gutil = require 'gulp-util'
concat = require 'gulp-concat'
coffee = require 'gulp-coffee'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
connect = require 'gulp-connect'
less = require 'gulp-less'
sourcemaps = require 'gulp-sourcemaps'
inject = require 'gulp-inject'

paths =
	lib: ['src/lib/**/*']
	core:
		less: ['src/core/css/*.less', 'src/core/css/*.css']
		coffee: ['src/core/js/main.coffee', 'src/core/js/**/*.coffee']
		jade:
			watch: ['src/core/tpl/*.jade']
			build: ['src/core/tpl/index.jade']
		html: 'src/core'
		index: 'src/core/index.html'
	debug:
		root: 'debug'
		css: 'debug/css'
		js: 'debug/js'
		lib: 'debug/lib'
		files: ['debug/**/*']
		html: 'debug'
		inject:
			sources: [
				'debug/js/**/*.js',
				'debug/css/**/*.css'
			]

gulp.task 'build:core:less', ->
	gulp.src paths.core.less
		.pipe sourcemaps.init()
		.pipe plumber()
		.pipe less()
		.pipe sourcemaps.write()
		.pipe gulp.dest paths.debug.css

gulp.task 'build:core:coffee', ->
	gulp.src paths.core.coffee
		.pipe plumber()
		.pipe sourcemaps.init()
		.pipe coffee()
		.pipe sourcemaps.write()
		.pipe gulp.dest paths.debug.js

gulp.task 'build:core:jade', ->
	gulp.src paths.core.jade.build
		.pipe plumber()
		.pipe jade(pretty: true)
		.pipe gulp.dest paths.core.html

gulp.task 'build:inject', ->
	sources = gulp.src paths.debug.inject.sources
	gulp.src paths.core.index
	 	.pipe inject sources
	 	.pipe gulp.dest paths.debug.html

gulp.task 'server', ->
	connect.server
		livereload: true
		port: 7890

gulp.task 'copy:lib', ->
	gulp.src paths.lib
		.pipe gulp.dest paths.debug.lib

gulp.task 'livereload', ->
	gulp.src paths.debug.files
		.pipe connect.reload()

gulp.task 'watch', ->
	gulp.watch paths.core.coffee, ['build:core:coffee']
	gulp.watch paths.core.less, ['build:core:less']
	gulp.watch paths.core.jade.watch, ['build:core:jade']
	gulp.watch paths.lib, ['copy:lib']
	gulp.watch paths.debug.inject.sources, ['build:inject']
	gulp.watch paths.core.index, ['build:inject']
	gulp.watch paths.debug.files, ['livereload']

gulp.task 'build', ['build:core:coffee', 'build:core:less', 'build:core:jade', 'build:inject']
gulp.task 'default', ['copy:lib', 'build', 'server', 'watch']

