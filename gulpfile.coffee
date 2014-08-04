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
fs = require 'fs'

paths =
	lib: ['src/lib/**/*']
	config: ['src/settings.json']
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
			cwd: 'debug'
			sources: [
				'js/**/*.js',
				'css/**/*.css',
				'ext/**/reg.js'
			]
		extensions: 'debug/ext'
	dist:
		fonts: 
			from: 'debug/lib/fonts/**/*'
			to: 'dist/fonts'
		img:
			from: 'debug/lib/img/**/*'
			to: 'dist/img'
		css:
			from: ['debug/lib/css/**/*.css', 'debug/css/**/*.css']
			to: 'dist/css'
		js:
			from: ['debug/lib/js/**/*.js', 'debug/js/**/*.js', 'ext/**/reg.js']
			to: 'dist/js'
	extensions:
		root: 'src/ext'
		watches: []

extensions = fs.readdirSync paths.extensions.root

gulp.task 'build:core:less', ->
	gulp.src paths.core.less
		.pipe sourcemaps.init()
		.pipe plumber()
		.pipe less().on('error', gutil.log)
		.pipe sourcemaps.write()
		.pipe gulp.dest paths.debug.css

gulp.task 'build:core:coffee', ->
	gulp.src paths.core.coffee
		.pipe plumber()
		.pipe sourcemaps.init()
		.pipe coffee().on('error', gutil.log)
		.pipe sourcemaps.write()
		.pipe gulp.dest paths.debug.js

gulp.task 'build:core:jade', ->
	gulp.src paths.core.jade.build
		.pipe plumber()
		.pipe jade(pretty: true).on('error', gutil.log)
		.pipe gulp.dest paths.core.html

for ext in extensions
	do (ext) ->
		taskCoffee = 
			watch: ["src/ext/#{ext}/js/*.coffee", "!src/ext/#{ext}/js/reg.coffee"]
			task: "build:ext:#{ext}:coffee"

		gulp.task taskCoffee.task, ->
			gulp.src taskCoffee.watch
				.pipe plumber()
				.pipe sourcemaps.init()
				.pipe coffee().on('error', gutil.log)
				.pipe concat('main.js')
				.pipe sourcemaps.write()
				.pipe gulp.dest "#{paths.debug.extensions}/#{ext}"

		taskCoffeeReg =
			watch: ["src/ext/#{ext}/js/reg.coffee"]
			task: "build:ext:#{ext}:coffee:reg"

		gulp.task taskCoffeeReg.task, ->
			gulp.src taskCoffeeReg.watch
				.pipe plumber()
				.pipe sourcemaps.init()
				.pipe coffee().on('error', gutil.log)
				.pipe sourcemaps.write()
				.pipe gulp.dest "#{paths.debug.extensions}/#{ext}"

		taskLess =
			watch: ["src/ext/#{ext}/css/main.less"]
			task: "build:ext:#{ext}:less"

		gulp.task taskLess.task, ->
			gulp.src taskLess.watch
				.pipe plumber()
				.pipe sourcemaps.init()
				.pipe less().on('error', gutil.log)
				.pipe sourcemaps.write()
				.pipe gulp.dest "#{paths.debug.extensions}/#{ext}"

		taskJade =
			watch: ["src/ext/#{ext}/tpl/main.jade"]
			task: "build:ext:#{ext}:jade"

		gulp.task taskJade.task, ->
			gulp.src taskJade.watch
				.pipe plumber()
				.pipe jade(pretty: true).on('error', gutil.log)
				.pipe gulp.dest "#{paths.debug.extensions}/#{ext}"

		paths.extensions.watches = paths.extensions.watches.concat [taskCoffee, taskCoffeeReg, taskLess, taskJade]


gulp.task 'build:inject', ->
	sources = gulp.src paths.debug.inject.sources, cwd: paths.debug.inject.cwd
	gulp.src paths.core.index
	 	.pipe inject sources, addRootSlash: false
	 	.pipe gulp.dest paths.debug.html

gulp.task 'server', ->
	connect.server
		livereload: true
		port: 7890

gulp.task 'copy:lib', ->
	gulp.src paths.lib
		.pipe gulp.dest paths.debug.lib

gulp.task 'copy:config', ->
	gulp.src paths.config
		.pipe gulp.dest paths.debug.root

gulp.task 'livereload', ->
	gulp.src paths.debug.files
		.pipe connect.reload()

gulp.task 'watch', ->
	gulp.watch paths.core.coffee, ['build:core:coffee']
	gulp.watch paths.core.less, ['build:core:less']
	gulp.watch paths.core.jade.watch, ['build:core:jade']
	gulp.watch paths.lib, ['copy:lib']
	gulp.watch paths.config, ['copy:config']
	gulp.watch paths.debug.inject.sources, ['build:inject']
	gulp.watch paths.core.index, ['build:inject']
	gulp.watch paths.debug.files, ['livereload']
	for watch in paths.extensions.watches
		do (watch) ->
			gulp.watch watch.watch, [watch.task]

tasks = for watch in paths.extensions.watches then watch.task
gulp.task 'build:ext', tasks
gulp.task 'build:debug', ['build:core:coffee', 'build:core:less', 'build:core:jade', 'build:inject']
gulp.task 'default', ['copy:lib', 'copy:config', 'build:ext', 'build:debug', 'server', 'watch']

gulp.task 'dist', ['copy:lib', 'copy:config', 'build:ext', 'build:debug'], ->
	gulp.src paths.dist.css.from
		.pipe concat 'jos.css'
		.pipe gulp.dest paths.dist.css.to

	gulp.src paths.dist.js.from
		.pipe concat 'jos.js'
		.pipe gulp.dest paths.dist.js.to

