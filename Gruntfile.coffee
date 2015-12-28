'use strict'

module.exports = (grunt) ->

  require('time-grunt')(grunt)
  require('jit-grunt')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    connect:
      server:
        options:
          port: 3000
          base: '.'

    clean:
      temp: ['.tmp', 'bower_components', '.sass-cache', '*.html', '*.css', '*.map', 'dist', 'node_modules']

    jade:
      dev:
        options:
          data:
            debug: true
            pretty: true
        expand: true
        cwd: 'examples'
        src: ['*.jade']
        dest: '.'
        ext: '.html'

    wiredep:
      dev:
        options:
          dependencies: true
          devDependencies: true
        src: ['**/*.jade']

    htmlmin:
      dev:
        options:
          removeComments: true
          collapseWhitespace: true
        expand: true
        cwd: 'examples'
        src: ['*.html']
        dest: '.'
        ext: '.html'

    sass:
      options:
        precision: 6
        style: 'expanded'

      dist:
        options:
          sourcemap: false
        expand: true
        cwd: 'src/scss'
        src: ['*.scss', '!_*.scss', '!examples']
        dest: 'dist/css'
        ext: '.css'

      dev:
        options:
          sourcemap: 'auto'
        files:
          'dist/css/<%= pkg.name %>.css': 'src/scss/<%= pkg.name %>.{scss,sass}',
          'examples/style.css': 'examples/style.{scss,sass}'

    cssmin:
      dist:
        options:
          sourcemap: false
        expand: true
        cwd: 'dist/css'
        src: ['*.css', '!*.map']
        dest: '.'
        ext: '.css'

      dev:
        options:
          sourcemap: true
        expand: true
        cwd: 'dist/css'
        src: ['*.css', '!*.map']
        dest: '.'
        ext: '.css'

    csscomb:
      dist:
        options:
          config: 'src/scss/.csscomb.json'
        expand: true
        cwd: 'dist/css'
        src: ['*.css', '!*.map']
        dest: '.'
        ext: '.css'

    coffee:
      dev:
        expand: true
        base: true
        cwd: 'src/coffee'
        src: ['*.coffee']
        dest: '.tmp/js'
        ext: '.js'

    concat:
      js:
        src: '.tmp/**/*.js',
        dest: 'dist/js/<%= pkg.name %>.js'


    uglify:
      dist:
        files:
          'dist/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.js'

    copy:
      img:
        expand: true
        cwd: 'src/img'
        src: ['*']
        dest: 'dist/img'
        flatten: true
        filter: 'isFile'

      font:
        expand: true
        cwd: 'src/font'
        src: ['*']
        dest: 'dist/font'
        flatten: true
        filter: 'isFile'

    notify:
      options:
        title: 'Grunt'

      server:
        options:
          message: 'Grunt has been activated.'

      grunt:
        options:
          message: 'Grunt has been updated.'

      jade:
        options:
          message: 'Jade files has been compiled.'

      sass:
        options:
          message: 'Sass files has been compiled.'

      js:
        options:
          message: 'JavaScript files have been concatenated and minified.'

      coffee:
        options:
          message: 'CoffeeScript files have been compiled.'

      img:
        options:
          message: 'Images has been copied to you distribution folder.'

      font:
        options:
          message: 'Fonts has been copied to you distribution folder.'

    wakeup:
      complete:
        options:
          custom: '.grunt/pop.mp3'
          volume: 1

    watch:
      options:
        livereload: true
        dateFormat: (time) ->
          grunt.log.writeln('Grunt has finished in ' + time + 'ms!');
          grunt.log.writeln('Waiting...');
        event: ['all']

      configFiles:
        files: ['Gruntfile.js']
        tasks: ['notify:grunt', 'wakeup:complete']
        options:
          reload: true

      jade:
        files: ['**/*.jade']
        tasks: ['jade:dev', 'wiredep:dev', 'notify:jade', 'wakeup:complete']

      sass:
        files: '**/*.{scss,sass}'
        tasks: ['sass', 'notify:sass', 'wakeup:complete']

      coffee:
        files: ['**/*.js', '**/*.coffee', '!Gruntfile.coffee', '!Gruntfile.js']
        tasks: ['coffee:dev', 'concat:js', 'uglify:dist', 'notify:coffee', 'wakeup:complete']

      img:
        files: ['src/img/**/*']
        tasks: ['copy:img', 'notify:img', 'wakeup:complete']

      font:
        files: ['src/font/**/*']
        tasks: ['copy:font', 'notify:font', 'wakeup:complete']

  grunt.registerTask 'test', ['jshint:all']
  grunt.registerTask 'dev', ['jade:dev', 'htmlmin:dev', 'sass', 'concat:js', 'copy', 'uglify:dist']
  grunt.registerTask 'default', ['connect:server', 'dev', 'notify:server', 'watch']