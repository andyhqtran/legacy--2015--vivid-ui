module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Connect
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.',
        }
      }
    },

    // Jade
    jade: {
      dev: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: {
          'examples/index.html': 'examples/index.jade'
        }
      }
    },

    // Wiredep
    wiredep: {
      dev: {
        options: {
          dependencies: true,
          devDependencies: true
        },
        src: [
          '**/*.jade'
        ],
      }
    },

    // HTMLmin
    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'examples/index.html': 'examples/index.html'
        }
      }
    },

    // Sass
    sass: {
      options: {
        precision: 6,
        style: 'expanded'
      },

      dist: {
        options: {
          sourcemap: false,
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss', '!_*.scss', '!examples'],
          dest: '../../dist/css',
          ext: '.css'
        }]
      },

      dev: {
        options: {
          sourcemap: 'auto',
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/scss/<%= pkg.name %>.{scss,sass}',
          'examples/style.css': 'examples/style.{scss,sass}'
        }
      }
    },

    // CSSmin
    cssmin: {
      dist: {
        options: {
          sourcemap: false
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
        }
      },

      dev: {
        options: {
          sourcemap: true
        },
        files: {
          'docs/assets/css/<%= pkg.name %>.min.css': 'docs/assets/css/<%= pkg.name %>.css'
        }
      }
    },

    // CSSComb
    csscomb: {
      dist: {
        options: {
          config: 'src/scss/.csscomb.json'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': ['dist/css/<%= pkg.name %>.css'],
        }
      }
    },

    // CoffeeScript
    coffee: {
      dev: {
        expand: true,
        base: true,
        cwd: 'src/coffee',
        src: ['*.coffee'],
        dest: 'src/js/',
        ext: '.js'
      }
    },

    // Concat
    concat: {
      js: {
        src: 'src/**/*.js',
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    // JSHint
    jshint: {
      options: {
        jshintrc: 'src/js/.jshintrc'
      },
      all: ['src/**/*.js']
    },

    // Uglify
    uglify: {
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.js'
        }
      }
    },

    // Notify
    notify: {
      options: {
        title: 'Grunt'
      },

      server: {
        options: {
          message: 'Grunt has been activated.'
        }
      },

      grunt: {
        options: {
          message: 'Grunt has been updated.'
        }
      },

      jade: {
        options: {
          message: 'Jade files has been compiled.'
        }
      },

      sass: {
        options: {
          message: 'Sass files has been compiled.'
        }
      },

      js: {
        options: {
          message: 'JavaScript files have been concatenated and minified.'
        }
      }
    },

    // Wake Up
    wakeup: {
      complete: {
        options: {
          custom: 'grunt/pop.mp3',
          volume: 1
        }
      },
    },

    // Watch
    watch: {
      options: {
        livereload: true,
        dateFormat: function (time) {
          grunt.log.writeln('Grunt has finished in ' + time + 'ms!');
          grunt.log.writeln('Waiting...');
        },
        event: ['all']
      },

      configFiles: {
        files: ['Gruntfile.js'],
        tasks: ['notify:grunt', 'wakeup:complete'],
        options: {
          reload: true
        }
      },

      jade: {
        files: ['**/*.jade'],
        tasks: ['jade:dev', 'wiredep:dev', 'notify:jade', 'wakeup:complete']
      },

      sass: {
        files: '**/*.{scss,sass}',
        tasks: ['sass:dev', 'notify:sass', 'wakeup:complete']
      },

      js: {
        files: ['**/*.js', '**/*.coffee', '!Gruntfile.js'],
        tasks: ['coffee:dev', 'concat:js', 'uglify:dist', 'notify:js', 'wakeup:complete']
      }
    }
  });

  grunt.registerTask('test', ['jshint:all']);
  grunt.registerTask('dev', ['jade:dev', 'htmlmin:dev', 'sass:dev', 'concat:js', 'uglify:dist']);
  grunt.registerTask('default', ['connect:server', 'dev', 'notify:server', 'watch']);
};