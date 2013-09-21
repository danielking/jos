module.exports = (grunt) ->
  config =
    pkg: grunt.file.readJSON('package.json')
    connect:
      core:
        options:
          port: 9000
          livereload: true
          base: 'build'
    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      core:
        src: 'build/core/js/main.js'
        dest: 'build/core/js/main.min.js'
    less:
      core:
        src: 'src/core/css/main.less'
        dest: 'build/core/css/main.css'
    copy:
      static:
        expand: true
        cwd: 'src'
        src: ['index.html', 'settings.json']
        dest: 'build/'
      libs:
        expand: true
        cwd: 'src'
        src: ['core/js/**/*.js', 'core/css/*.css', 'core/fonts/*']
        dest: 'build/'
    coffee:
      options:
        sourceMap: true
      core:
        files:
          'build/core/js/main.js': [
            'src/core/js/main.coffee',
            'src/core/js/directives/*.coffee',
            'src/core/js/services/*.coffee',
            'src/core/js/controllers/*.coffee',
          ]
    ngtemplates:
      core:
        cwd: 'src/core/templates/'
        src: '**.html'
        dest: 'build/core/js/templates.js'
    watch:
      options:
        livereload: true
      core_html:
        files: ['src/index.html', 'src/settings.json']
        tasks: ['copy:static']
      core_template:
        files: 'src/core/templates/**.html'
        tasks: ['ngtemplates:core']        
      core_coffee:
        files: 'src/core/js/**/*.coffee'
        tasks: ['coffee:core', 'uglify:core']
      core_less:
        files: 'src/core/**/*.less'
        tasks: ['less:core']

  settings = require './src/settings.json'
  for app in settings.apps
    config.watch["app_#{app}_template"] =
      files: "src/#{app}/templates/**.html"
      tasks: ["ngtemplates:#{app}"]

    config.watch["app_#{app}_coffee"] =
      files: "src/#{app}/js/**/*.coffee"
      tasks: ["coffee:app_#{app}"]

    config.watch["app_#{app}_less"] =
      files: "src/#{app}/css/*.less"
      tasks: ["less:app_#{app}"]

    config.watch["app_#{app}_copy"] =
      files: ["src/#{app}/index.html", "src/#{app}/settings.json"]
      tasks: ["copy:app_#{app}"]

    config.ngtemplates[app] =
      cwd: "src/#{app}/templates/"
      src: '**.html'
      dest: "build/#{app}/js/templates.js"

    config.coffee["app_#{app}"] =
      src: [
        "src/#{app}/js/main.coffee",
        "src/#{app}/js/directives/*.coffee",
        "src/#{app}/js/services/*.coffee",
        "src/#{app}/js/controllers/*.coffee",
      ],
      dest: "build/#{app}/js/main.js"

    config.less["app_#{app}"] =
      src: "src/#{app}/css/main.less"
      dest: "build/#{app}/css/main.css"

    config.copy["app_#{app}"] =
      expand: true
      cwd: "src/#{app}"
      src: ['index.html', 'settings.json']
      dest: "build/#{app}"
  console.log config
  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-angular-templates'

  grunt.registerTask 'default', ['connect', 'watch']
  grunt.registerTask 'build', ['copy', 'ngtemplates', 'coffee', 'less']

